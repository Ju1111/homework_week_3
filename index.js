const express = require('express')
const db = require('./database')

const app = express()
const port = process.env.PORT || 11111

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my events API' })
})

app.listen(port, () => {
  console.log(`
    Server is listening on ${port}.
    Open http://localhost:${port}
    to see the app in your browser.
  `)
})
