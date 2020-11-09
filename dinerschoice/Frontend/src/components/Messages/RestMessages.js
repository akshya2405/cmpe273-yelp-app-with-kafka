/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { clearMessage } from '../../js/actions/message';
import ChatWidget from '../../js/helpers/ChatWidget';
import { getMessagesList } from '../../js/actions/getCalls';
import { addMessage } from '../../js/actions/add';

// Define a Signup Component
class RestMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // profile: '',
      isRestView: false,
      chats: [],
    };
    this.handleReply = this.handleReply.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('category') === 'Restaurant') {
      this.setState({
        isRestView: true,
      });
    }
    this.props.getMessagesList();
    this.setState({
      chats: this.props.messages,
    }, () => {
      if (this.props.location.state  && this.state.chats) {
        // alert(JSON.stringify(this.props.location.state));
        this.state.chats.unshift(this.props.location.state);
        this.setState(this.state.chats);
        this.props.history.replace();
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.messages && this.props.messages !== prevProps.messages) {
      this.setState({
        chats: this.props.messages,
      }, () => {
        if (this.props.location.state) {
          // alert(JSON.stringify(this.props.location.state));
          this.state.chats.unshift(this.props.location.state);
          this.setState(this.state.chats);
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.clearMessage();
  }

  handleReply(message, chat) {
    // TODO : post reply to backend with name, and timestamp
    // alert('Reply posted : ' + message + ' to chat : ' + chat._id);
    let name = '';
    if (localStorage.getItem('category') === 'Customer') {
      name = `${this.props.cust_profile.fname} ${this.props.cust_profile.lname}`;
    } else {
      name = this.props.profile.name;
    }
    const messageDetails = {
      action: 'add',
      _id: chat._id,
      restId: chat.restId,
      custId: chat.custId,
      name: name,
      content: message,
      closed: false,
    };
    this.props.addMessage(messageDetails);
    window.location.reload();
  }

  handleClose(chat) {
    // alert('Chat closed : ' + chat._id);
    // TODO : close the chat.
    const messageDetails = {
      action: 'close',
      _id: chat._id,
      closed: true,
    };
    this.props.addMessage(messageDetails);
    window.location.reload();
  }

  render() {
    const chatSection = (this.state.chats && this.state.chats.length > 0) ? (
      this.state.chats.map((chat) => (
        <ChatWidget chat={chat} isRestaurant={this.state.isRestView} handleClose={this.handleClose} handleReply={this.handleReply} />
      ))
    ) : (<div />);

    return (
      <div>
        {chatSection}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('In mapstate to props');
  const { messages } = state.edit;
  const { cust_profile } = state.edit;
  const { profile } = state.edit;
  return {
    messages,
    cust_profile,
    profile,
  };
}

export default connect(mapStateToProps, { getMessagesList, clearMessage, addMessage })(RestMessages);
