const express = require('express')
const { Event } = require('./models')
const app = express()
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const port = process.env.PORT || 11111
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.json({ message: 'Welcome to my events API' })
})

app.get('/events', (request, response) => {
  const events = Event
  .findAll({
    attributes: ['title', 'startDate', 'endDate'],
    where: {
      startDate: {
        [Op.gt]: new Date()
      }
    }
  })
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
  .findAll({
    attributes: ['title', 'startDate', 'endDate'],
    where: {
      startDate: {
        [Op.gt]: new Date()
      },
      id: request.params.id,
    }
  })
  .then((events) => {
    if (events.length !== 0) {
      response.json(events)
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

app.post('/events', (request, response) => {
  const event = request.body
  console.log(event)
  if (new Date(event.startDate) > new Date(event.endDate)) {
    response.status(406)
    response.json({message: 'Oooops! Are you sure the start date is before the end date?'})
  } else if (new Date(event.startDate) < new Date()) {
      response.status(406)
      response.json({message: 'Sorry, but I only accepts events that take place in the future!'})
  } else {
      Event
        .create(event)
        .then(entity => {
          response.status(201).send(entity)
        })
        .catch(err => {
            response.status(422)
            response.json({ message: err.message })
        })
    }
})

app.patch('/events/:id', (request, response) => {
  const updates = request.body

  Event.findById(request.params.id)
    .then(entity => {
      return entity.update(updates)
    })
    .then(final => {
      response.send(final)
    })
    .catch(error => {
      response.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
})

app.delete('/events/:id', (request, response) => {
  Event.findById(request.params.id)
  .then(entity => {
    return entity.destroy()
  })
  .then(() => {
    response.send({
      message: 'You succesfully deleted the event.'
    })
  })
  .catch(error => {
    response.status(500).send({
      message: `Something went wrong`,
      error
    })
  })
})

app.listen(port, () => {
  console.log(`
    Server is listening on ${port}.
    Open http://localhost:${port}
    to see the app in your browser.
  `)
})
