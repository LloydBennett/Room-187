require('dotenv').config()

const fetch = require('node-fetch');
const express = require('express')
const app = express()
const path = require('path')
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
async function getSpotifyToken() {
  const creds = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) throw new Error('Failed to get Spotify token');
  const data = await response.json();
  return data.access_token;
}

// ===== Spotify AJAX ENDPOINTS =====
app.get('/api/playlists', async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const response = await fetch(`https://api.spotify.com/v1/users/${SPOTIFY_USER_ID}/playlists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch playlists');
    const data = await response.json();
    res.json(data.items);
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

// ===== RENDER /playlists PAGE =====
// ===== RENDER /playlists PAGE =====
app.get('/playlists/:playlistId?', async (req, res) => {
  try {
    const defaults = await handleRequest(req);
    const token = await getSpotifyToken();

    // Fetch all playlists
    const playlistsResponse = await fetch(`https://api.spotify.com/v1/users/${SPOTIFY_USER_ID}/playlists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!playlistsResponse.ok) throw new Error('Failed to fetch playlists');
    const playlistsData = await playlistsResponse.json();

    // Add total_duration_ms to each playlist
    const playlistsWithDuration = await Promise.all(
      playlistsData.items.map(async (pl) => {
        const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${pl.id}/tracks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tracksJson = await tracksResponse.json();
        const totalMs = tracksJson.items.reduce((sum, item) => sum + (item.track?.duration_ms || 0), 0);

        return { ...pl, total_duration_ms: totalMs };
      })
    );

    const playlistId = req.params.playlistId || null;
    let selectedPlaylist = null;
    let tracksData = [];

    let pageViewType = 'grid'; // default

    if (playlistId) {
      selectedPlaylist = playlistsData.items.find(p => p.id === playlistId);

      if (selectedPlaylist) {
        const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!tracksResponse.ok) throw new Error('Failed to fetch playlist tracks');

        const tracksJson = await tracksResponse.json();
        tracksData = tracksJson.items || [];

        // Calculate total duration for this playlist
        const totalMs = tracksData.reduce((sum, item) => sum + (item.track?.duration_ms || 0), 0);
        selectedPlaylist.total_duration_ms = totalMs;

        pageViewType = 'detail';
      }
    }

    // Always set pageType to "playlists"
    const pageType = 'playlists';

    res.render('base', {
      ...defaults,
      pageType,
      pageViewType,
      spotifyPlaylists: playlistsWithDuration,
      spotifyTracks: tracksData,
      playlist: selectedPlaylist,
      defaultPlaylistId: selectedPlaylist?.id || null,
      document: { data: { title: 'Playlists' } },
    });
  } catch (err) {
    console.error('Error rendering playlists page:', err);
    const defaults = await handleRequest(req);
    res.status(500).render('base', {
      ...defaults,
      pageType: 'error',
      pageViewType: null,
      playlist: null,
      spotifyPlaylists: [],
      spotifyTracks: [],
      document: { data: { title: '500 Error: Failed to load playlists' } },
    });
  }
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