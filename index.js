const express = require('express')
const { Event } = require('./models')
const app = express()

const port = process.env.PORT || 11111
const bodyParser = require('body-parser')

// const { Event } = db

app.use(bodyParser.json())

app.get('/', (request, response) => {
  res.json({ message: 'Welcome to my events API' })
})

app.get('/events', (request, response) => {
  const events = Event
  .findAll()
  .then((events) => {
    response.json(events)
  })
  .catch((err) => {
    console.error(err)
    response.status(500)
    response.json({ message : 'Oops! Something went wrong. Please try again.'})
  })
})

app.get('/events(:id)', (request, response) => {
  const events = Event
  .findById(request.params.id)
  .then((event) => {
    if (event) {
      response.json(event)
    } else {
      response.status(404)
      response.json({message:'Event not found.'})
    }
  })
  .catch((err) => {
    console.error(err)
    response.status(500)
    response.json({message: 'Oops! Something went wrong. Please try again.'})
  })
})

app.listen(port, () => {
  console.log(`
    Server is listening on ${port}.
    Open http://localhost:${port}
    to see the app in your browser.
  `)
})
