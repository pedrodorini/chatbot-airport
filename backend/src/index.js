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
    workspace: user.workspace_id,
    input: req.message
  }
  conversation.message(payload, (err, data) => {
    if (err) {
      return res.status(err.code || 500).json(err);
    }
    return data;
  });
})

function getMessages(res) {
  let responseText = '';
  if (!res.output) {
    res.output = {};
  } else {
    return res;
  }
  if (res.intents && res.intents[0]) {
    var intent = res.intents[0];
    if (res.confidence >= 0.75) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if (intent.confidence >= 0.5) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }
  res.output.text = responseText;
  return res;
}

app.listen(port, () => {
  console.log(`BACKEND IS RUNNING ON PORT ${port}`)
})