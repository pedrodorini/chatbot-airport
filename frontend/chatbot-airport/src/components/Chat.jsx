import React, { Component } from 'react'
import '../css/chat.css'

export default class Chat extends Component {
  render() {
    return (
      <div className="container-center center grey darken-4">
        <div className="row">
          <div className="message-bot col s5 left left-align blue lighten-4">Hi</div>
        </div>
        <div className="row">
          <div className="message-user col s5 right right-align teal accent-3">Hi</div>
        </div>
        <div className="row">
          <input className="input-inline left" type="text" placeholder="Type a message here"/>
          <button className="btn waves-effect waves-light left" type="submit">
            <i className="material-icons valign-wrapper">send</i>
          </button>
        </div>
      </div>
    )
  }
}
