import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header'

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      botMessages: [],
      userMessages: []
    }
    this.keyHandler = this.keyHandler.bind(this)
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

  keyHandler(e) {
    if (e.key === 'Enter') {
      this.sendMessage(this.state.message)
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container-center center grey darken-3 message-box">
          {
            this.state.userMessages.map((message, index) => {
              return (
                <div key={index}>
                  <div className="row">
                    <div className="message-user col s5 right right-align teal accent-3">{message}</div>
                  </div>
                  <div className="row">
                    <div className="message-bot col s5 left left-align blue lighten-4">{this.state.botMessages[index]}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="container-center center grey darken-4">
          <div className="row" id="input-row">
            <input className="input-inline left" type="text" placeholder="Type a message here"
              onChange={(e) => this.setState({ message: e.target.value })}
              onKeyUp={this.keyHandler}/>
            <button onClick={() => this.sendMessage(this.state.message)} className="btn waves-effect waves-light left" type="submit">
              <i className="material-icons valign-wrapper center-align">send</i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
