require('dotenv').config()

const fetch = require('node-fetch');
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const port = 3000

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID
const MAILCHIMP_DC = 'us5'

// ====== SPOTIFY CONFIG ======
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_USER_ID = process.env.SPOTIFY_USER_ID

const Prismic = require('@prismicio/client');
const PrismicH = require('@prismicio/helpers');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

const routes = [
  {
    type: 'home',
    path: '/',
  },
  {
    type: 'about',
    path: '/our-story',
  },
  {
    type: 'contact_us',
    path: '/contact',
  },
  {
    type: 'gallery',
    path: '/gallery',
  },
  {
    type: 'documents',
    path: '/:uid'
  },
  {
    type: 'team_members',
    path: '/team/:uid'
  }
]

const client = Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  fetch,
  routes,
});

//middleware
app.use((req, res, next) => {
  res.locals.ctx = {
    PrismicH,
  }
  next()
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const handleRequest = async api => {
  const meta = await client.getSingle('meta_details')
  const navigation = await client.getSingle('navigation')
  const siteDetails = await client.getSingle('site_det')
  const members = await client.getAllByType('team_members')
  const testimonials = await client.getAllByType('testimonials')
  const preloader = await client.getSingle('preloader')
  const infoDocs = await client.getAllByType('documents')
  
  return {
    meta,
    navigation,
    siteDetails,
    members,
    testimonials,
    preloader,
    infoDocs,
    prismicH: PrismicH,
    prismic: Prismic
  }
}

// ===== Spotify helper =====

let spotifyCache = {
  token: null,
  tokenExpires: 0,
  playlists: [],
  playlistsFetchedAt: 0
};

let playlistTracksCache = {}

const PLAYLIST_CACHE_FILE = path.join(__dirname, 'spotify_playlists.json'); // NEW: JSON cache file
const PLAYLIST_CACHE_TTL = 60 * 60 * 1000; // 1 hour
const TRACKS_CACHE_TTL = 30 * 60 * 1000;  // NEW: 30 min cache for tracks

// NEW: Load playlists from JSON cache at startup
function loadPlaylistsFromJSON() {
  try {
    if (fs.existsSync(PLAYLIST_CACHE_FILE)) {
      const raw = fs.readFileSync(PLAYLIST_CACHE_FILE);
      const data = JSON.parse(raw);
      spotifyCache.playlists = data.playlists || [];
      spotifyCache.playlistsFetchedAt = data.fetchedAt || 0;
      console.log(`[Spotify] Loaded ${spotifyCache.playlists.length} playlists from JSON cache`);

      // NEW: start background refresh if cache exists
      refreshPlaylistsInBackground(); 
      return true; // indicate cache exists
    }
  } catch (err) {
    console.warn('[Spotify] Failed to load JSON cache:', err.message);
  }
  return false; // cache not available
}

// NEW: Save playlists to JSON cache
function savePlaylistsToJSON() {
  try {
    fs.writeFileSync(PLAYLIST_CACHE_FILE, JSON.stringify({
      playlists: spotifyCache.playlists,
      fetchedAt: spotifyCache.playlistsFetchedAt
    }, null, 2));
    console.log(`[Spotify] Saved ${spotifyCache.playlists.length} playlists to JSON cache`);
  } catch (err) {
    console.error('[Spotify] Failed to save JSON cache:', err.message);
  }
}

// NEW: Get Spotify token (unchanged from your version, but safe)
async function getSpotifyToken() {
  const now = Date.now();
  if (spotifyCache.token && now < spotifyCache.tokenExpires) return spotifyCache.token;

  const creds = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  spotifyCache.token = data.access_token;
  spotifyCache.tokenExpires = now + (data.expires_in - 60) * 1000;
  return data.access_token;
}

// NEW: Exponential backoff and rate-limit safe fetch
async function fetchWithRetry(url, token, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });

    if (response.status === 429) {
      const retryAfter = parseFloat(response.headers.get('Retry-After') || '1');
      console.warn(`[Spotify] Rate limited, retrying after ${retryAfter}s (attempt ${attempt})`);
      await new Promise(r => setTimeout(r, retryAfter * 1000));
      continue;
    }

    if (!response.ok) throw new Error(`Spotify fetch failed: ${response.status}`);
    return await response.json();
  }

  throw new Error(`Spotify fetch failed after ${retries} attempts`);
}

// NEW: Fetch Spotify playlists with JSON cache fallback
async function fetchSpotifyPlaylists() {
  const now = Date.now();

  // 1️⃣ Try using cached playlists first
  if (spotifyCache.playlists.length && now - spotifyCache.playlistsFetchedAt < PLAYLIST_CACHE_TTL) {
    return spotifyCache.playlists;
  }

  // 2️⃣ If JSON cache exists, use it immediately, refresh in background
  if (loadPlaylistsFromJSON()) {
    return spotifyCache.playlists;
  }

  // 3️⃣ If no cache exists, fetch blocking from Spotify
  try {
    const token = await getSpotifyToken();
    const data = await fetchWithRetry(`https://api.spotify.com/v1/users/${SPOTIFY_USER_ID}/playlists`, token);
    spotifyCache.playlists = data.items || [];
    spotifyCache.playlistsFetchedAt = now;
    savePlaylistsToJSON(); // save for future
    return spotifyCache.playlists;
  } catch (err) {
    console.error("[Spotify] Fetch playlists failed:", err.message);
    return spotifyCache.playlists; // will be empty if nothing cached
  }
}

// Background refresh (non-blocking)
async function refreshPlaylistsInBackground() {
  console.log("[Playlists] Background refresh started");
  try {
    const token = await getSpotifyToken();
    const response = await fetch(`https://api.spotify.com/v1/users/${SPOTIFY_USER_ID}/playlists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Spotify fetch failed (background)");
    const playlists = (await response.json()).items || [];
    spotifyCache.playlists = playlists;
    spotifyCache.playlistsFetchedAt = Date.now();
    savePlaylistsToJSON(); // NEW: save updated playlists
    console.log("[Playlists] Background refresh complete");
  } catch (err) {
    console.error("[Playlists] Background refresh failed:", err.message);
  }
}


// ===== NEW: preload playlists at startup so cache is never empty
(async () => {
  console.log("Preloading Spotify playlists...");
  await fetchSpotifyPlaylists();
})();

async function getPlaylistTracks(playlistId) {
  const now = Date.now();
  const cache = playlistTracksCache[playlistId];

  if (cache && now - cache.fetchedAt < TRACKS_CACHE_TTL) {
    return cache;
  }

  try {
    const token = await getSpotifyToken();
    const tracksJson = await fetchWithRetry(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`,
      token
    );

    const items = tracksJson.items || [];
    const totalDuration = items.reduce((sum, item) => sum + (item.track?.duration_ms || 0), 0);

    playlistTracksCache[playlistId] = {
      tracks: items,
      total_duration_ms: totalDuration,
      fetchedAt: now,
    };

    return playlistTracksCache[playlistId];
  } catch (err) {
    console.error(`[Spotify] Fetch tracks failed for ${playlistId}:`, err.message);
    return cache || { tracks: [], total_duration_ms: 0, fetchedAt: now }; // NEW: fallback to cache or empty
  }
}

// ===== Spotify AJAX ENDPOINTS =====
app.get('/api/playlists', async (req, res) => {
  try {
    const playlists = await fetchSpotifyPlaylists();
    res.json(playlists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Spotify playlists fetch failed' });
  }
});

app.get('/api/playlists/:playlistId/tracks', async (req, res) => {
  try {
    const { playlistId } = req.params;
    const token = await getSpotifyToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch playlist tracks');
    const data = await response.json();
    res.json(data.items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Spotify playlist tracks fetch failed' });
  }
});

// Query for the root path.
app.get('/', async (req, res) => {
  console.log('Home page route hit');
  const pageType = 'home'
  const document = await client.getSingle('home')
  const defaults = await handleRequest(req)
  res.render('base', { ...defaults, document, pageType })
})

app.get('/our-story', async (req, res) => {
  const pageType = 'about'
  const document = await client.getSingle('about')
  const defaults = await handleRequest(req)

  res.render('base', { ...defaults, document, pageType })
})

app.get('/team/:uid', async (req, res) => {
  const uid = req.params.uid
  const pageType = 'team_members'
  const document = await client.getByUID('team_members', uid)
  const defaults = await handleRequest(req)

  res.render('base', { ...defaults, document, pageType })
})

app.get('/gallery', async (req, res) => {
  const pageType = 'gallery'
  const document = await client.getSingle('gallery')
  const defaults = await handleRequest(req)

  res.render('base', { ...defaults, document, pageType })
})

app.get('/contact', async (req, res) => {
  const pageType = 'contact'
  const document = await client.getSingle('contact_us')
  const defaults = await handleRequest(req)

  res.render('base', { ...defaults, document, pageType })
})

// ===== Playlist route with caching improvements =====
app.get(['/playlists', '/playlists/:playlistId?'], async (req, res) => {
  const defaults = await handleRequest(req);
  const playlistId = req.params.playlistId || null;

  let playlistsData = await fetchSpotifyPlaylists();
  let selectedPlaylist = null;
  let tracksData = [];
  let pageViewType = 'grid';

  if (playlistId) {
    selectedPlaylist = playlistsData.find(p => p.id === playlistId);
    if (selectedPlaylist) {
      pageViewType = 'detail';
      const { tracks, total_duration_ms } = await getPlaylistTracks(playlistId); // NEW
      tracksData = tracks;
      selectedPlaylist.total_duration_ms = total_duration_ms; // NEW
    }
  }

  // Overview: do NOT fetch track durations
  if (!playlistId) {
    playlistsData = playlistsData.map(p => ({ ...p, total_duration_ms: null })); // NEW
  }

  res.render('base', {
    ...defaults,
    pageType: 'playlists',
    pageViewType,
    spotifyPlaylists: playlistsData,
    spotifyTracks: tracksData,
    playlist: selectedPlaylist,
    defaultPlaylistId: playlistId,
    document: { data: { title: 'Playlists' } }
  });
});

app.get('/:uid', async (req, res) => {
  const uid = req.params.uid
  const pageType = 'documents'

  try {
    const document = await client.getByUID('documents', uid) // Try fetching the document

    if (!document) { // If no document found, show 404
      return res.status(404).render('base', { 
        ...await handleRequest(req), 
        document: { data: { title: '404 Error' } }, 
        pageType: "error" 
      })
    }

    // If document exists, render the page
    const defaults = await handleRequest(req)
    res.render('base', { ...defaults, document, pageType })
    
  } catch (error) {
    // Handle Prismic errors (e.g., document not found)
    return res.status(404).render('base', { 
      ...await handleRequest(req), 
      document: { data: { title: '404 Error' } }, 
      pageType: "error" 
    })
  }
})

// FINAL CATCH-ALL ROUTE: If nothing matched before, show 404
app.get('*', async (req, res) => {
  res.status(404).render('base', { 
    ...await handleRequest(req), 
    document: { data: { title: '404 Error' } }, 
    pageType: "error" 
  })
});

app.post('/subscribe', async (req, res) => {
  const { email, 'bot-field': botField } = req.body;

  // Bot protection: if honeypot field is filled, assume it's a bot and silently ignore
  if (botField) {
    return res.status(200).json({ message: 'Thanks!' });
  }

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      CITY: 'N/A'
    },
  }

  try {
    const response = await fetch(`https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from('anystring:' + MAILCHIMP_API_KEY).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Handle "Member Exists" error
    if (result.title === 'Member Exists') {
      return res.status(400).json({
        error: `${email} is already subscribed to our mailing list.`,
      });
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: result.detail || 'Failed to subscribe' });
    }

    res.status(200).json({ message: `Great! You’re In! Keep an eye on your inbox for the latest updates, tips, and exclusive offers.` });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})