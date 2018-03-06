const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const allowCors = require('./config/cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCors)

app.listen(port, () => {
  console.log(`BACKEND IS RUNNING ON PORT ${port}`)
})