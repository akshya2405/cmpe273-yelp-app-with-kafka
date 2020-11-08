/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

class ChatWidget extends Component {
  constructor(props) {
    super(props);
    this.messageContent = '';
    this.saveMessage = this.saveMessage.bind(this);
    this.submitReply = this.submitReply.bind(this);
    this.closeChat = this.closeChat.bind(this);
  }

  saveMessage(e) {
    console.log(e.target.value);
    this.messageContent = e.target.value;
  }

  submitReply() {
    this.props.handleReply(this.messageContent, this.props.chat);
  }

  closeChat() {
    this.props.handleClose(this.props.chat);
  }

  render() {
    // alert(JSON.stringify(this.props.chat));
    return (
      <div id={this.props.chat._id}>
        <h3> Chat ID : {this.props.chat._id} </h3>
        <table className="table">
          {
            this.props.chat.messages.map((message) => (
              <tr><td><b>{message.name}</b>:&nbsp;{message.content}</td><td>{message.timestamp}</td></tr>
            ))
          }
        </table>
        <table className="table">
          <tr>
            <td align="left">
              {
                (!this.props.chat.closed) ? (
                  <textarea placeholder="Type message/reply here" onChange={this.saveMessage} cols="100" rows="5" />
                ) : (<div />)
              }
            </td>
          </tr>
          <tr>
            <td align="left">
              {
                (!this.props.chat.closed) ? (
                  <input type="button" onClick={this.submitReply} value="Send" />
                ) : (<div />)
              }
              {' '}
              &nbsp;
              {
                (this.props.isRestaurant && !this.props.chat.closed) ? (
                  <input type="button" onClick={this.closeChat} value="Close chat" />
                ) : (<div />)
              }
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default ChatWidget;