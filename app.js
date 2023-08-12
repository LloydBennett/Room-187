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
  
  return {
    meta,
    navigation,
    siteDetails,
    members,
    testimonials,
    preloader
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

app.get('/contact', async (req, res) => {
  const pageType = 'contact'
  const document = await client.getSingle('contact_us')
  const defaults = await handleRequest(req)

  res.render('base', { ...defaults, document, pageType })
})

app.get('*', async (req, res) => {
  let pageType = "error"
  
  let document = {
    data: { title: '404 Error' }
  }
  const defaults = await handleRequest(req)
  res.render('base', { ...defaults, document, pageType })
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})