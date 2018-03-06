const bodyParser = require('body-parser')
const express = require('express')
const allowCors = require('./config/cors')
const Conversation = require('watson-developer-cloud/conversation/v1')
const user = require('./config/userConfig')
const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCors)

const conversation = new Conversation({
  username: user.username,
  password: user.password,
  version_date: '2018-03-06'
})

app.post('/api/message', (req, res) => {
  let payload = {
    workspace_id: user.workspace_id,
    input: { text: req.body.message || {} }
  }
  conversation.message(payload, (err, data) => {
    if (err) {
     console.log(err)
    }
    payload.context = data.context
    conversation.message(payload, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.send(data.output.text)
      }
    })
  })
})

app.listen(port, () => {
  console.log(`BACKEND IS RUNNING ON PORT ${port}`)
})