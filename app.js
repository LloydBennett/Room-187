require('dotenv').config()

const fetch = require('node-fetch');
const express = require('express')
const app = express()
const path = require('path')
const port = 3000

const Prismic = require('@prismicio/client');
const PrismicH = require('@prismicio/helpers');

app.use(express.static(path.join(__dirname, 'public')));

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

// Query for the root path.
app.get('/', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})