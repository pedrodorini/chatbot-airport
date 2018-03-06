import React, { Component } from 'react'
import '../css/chat.css'
import axios from 'axios'

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      botMessages: [],
      userMessages: []
    }
  }

  sendMessage(userMessage) {
    let userMessages = this.state.userMessages
    userMessages.push(userMessage)
    this.setState({...this.state, userMessages})
    let message = this.state.message
    axios.post(`http://localhost:8000/api/message`, { message }).then(res => {
      let message = ''
      let messages = this.state.botMessages
      res.data.length === 2 ? message = res.data[1] : message = res.data[0]
      messages.push(message)
      this.setState({...this.state, botMessages: messages})
    })
  }

  render() {
    return (
      <div className="container-center center grey darken-4">
        {
          this.state.userMessages.map((message, index) => {
            return (
              <div>
                <div className="row" key={index}>
                  <div className="message-user col s5 right right-align teal accent-3">{message}</div>
                </div>
                <div className="row" key={index}>
                  <div className="message-bot col s5 left left-align blue lighten-4">{this.state.botMessages[index]}</div>
                </div>
              </div>
            )
          })
        }
        <div className="row">
          <input className="input-inline left" type="text" placeholder="Type a message here"
            onChange={(e) => this.setState({ message: e.target.value })}/>
          <button onClick={() => this.sendMessage(this.state.message)} className="btn waves-effect waves-light left" type="submit">
            <i className="material-icons valign-wrapper">send</i>
          </button>
        </div>
      </div>
    )
  }
}
