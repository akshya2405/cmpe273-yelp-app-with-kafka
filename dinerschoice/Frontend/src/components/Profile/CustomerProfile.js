/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { getCustomerProfile } from '../../js/actions/getCalls';
import ChatWidget from '../../js/helpers/ChatWidget';
import { addMessage } from '../../js/actions/add';

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // profile: '',
      isRestView: false,
      chats: [
        {
          _id: 'abc',
          messages: [
            {
              name: 'Sud',
              content: 'Hello there',
              timestamp: '21:33 pm',
            },
          ],
          closed: true,
        },
      ],
    };
    this.handleFollow = this.handleFollow.bind(this);
    // this.handleReply = this.handleReply.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    this.handleNewChat = this.handleNewChat.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.location.state);
    let custID;
    if (this.props.location.state) {
      custID = this.props.location.state;
      this.setState({
        isRestView: true,
      });
    } else {
      custID = localStorage.getItem('id');
    }
    console.log('In customer profile did mount', custID);
    this.props.getCustomerProfile(custID);
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.auth !== prevProps.auth) {
  //     // alert('change in props');
  //     this.setState({
  //       ordersAndItemsArray: this.props.orders,
  //       filteredResults: this.props.orders,
  //     });
  //   }
  // }

  handleFollow() {
    console.log(this.props.location.state);
  }

  handleNewChat() {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newChat = {
      _id: id,
      restId: this.props.edit.profile.id,
      custId: this.props.edit.cust_profile.id,
      messages: [],
      closed: false,
    };
    this.props.history.push('/messages', newChat);
  }

  // handleClose(chat) {
  //   alert('Chat closed : ' + chat._id);
  //   // TODO : close the chat.
  // }

  // handleReply(message, chat) {
  //   // TODO : post reply to backend with name, and timestamp
  //   alert('Reply posted : ' + message + ' to chat : ' + chat._id);
  //   const messageDetails = {
  //     _id: chat._id,
  //     restId: this.props.edit.profile.id,
  //     custId: this.props.edit.cust_profile.id,
  //     name: this.props.edit.profile.name,
  //     content: message,
  //   };
  //   alert(JSON.stringify(messageDetails));
  //   this.props.addMessage(messageDetails);
  //   // this.props.history.push('/messages');
  // }

  render() {
    const { auth, edit } = this.props;
    console.log('auth', auth);
    console.log('edit', edit);
    console.log('edit.cust_profile :', edit.cust_profile && edit.cust_profile.email);

    if (!auth.user) {
      return <Redirect to="/login" />;
    }

    const editLink = (!this.state.isRestView) ? (
      <td>
        <h4>
          <Link to={{ pathname: '/editProfile', state: edit.cust_profile }} className="glyphicon glyphicon-pencil">
            {' '}
          </Link>
        </h4>
      </td>
    ) : (
      <td>
        <Button variant="outline-danger" onClick={this.handleFollow}>Follow</Button>
        {' '}
      </td>
    );

    const startChat = (this.state.isRestView) ? (
      <Button variant="outline-danger" onClick={this.handleNewChat}>Start Chat</Button>
    ) : (<div />);

    // const chatSection = (this.state.isRestView && this.state.chats && this.state.chats.length > 0) ? (
    //   this.state.chats.map((chat) => (
    //     <ChatWidget chat={chat} isRestaurant={this.state.isRestView} handleClose={this.handleClose} handleReply={this.handleReply}/>
    //   ))
    // ) : (<div />);

    return (
      <div>
        <table className="table table-striped">
          {' '}
          <tr>
            <td>
              <tr>
                <td><h2>Customer Profile</h2></td>
                {editLink}
                {startChat}
              </tr>
              <tbody>
                {/* Display the Table row based on data received */}
                <tr>
                  <td>First Name : </td>
                  <td>{edit.cust_profile && edit.cust_profile.fname ? edit.cust_profile.fname : ''}</td>
                </tr>
                <tr>
                  <td>Last Name : </td>
                  <td>{edit.cust_profile && edit.cust_profile.lname ? edit.cust_profile.lname : ''}</td>
                </tr>
                <tr>
                  <td>Nickname : </td>
                  <td>{edit.cust_profile && edit.cust_profile.nickname}</td>
                </tr>
                <tr>
                  <td>Headline : </td>
                  <td>{edit.cust_profile && edit.cust_profile.headline}</td>
                </tr>
                <tr>
                  <td>E-mail id : </td>
                  <td>{edit.cust_profile && edit.cust_profile.email}</td>
                </tr>
                <tr>
                  <td>Date of Birth : </td>
                  <td>{edit.cust_profile && edit.cust_profile.dob}</td>
                </tr>
                <tr>
                  <td>Choosing since : </td>
                  <td>{edit.cust_profile && edit.cust_profile.choosingSince}</td>
                </tr>
                <tr>
                  <td>City : </td>
                  <td>{edit.cust_profile && edit.cust_profile.city}</td>
                </tr>
                <tr>
                  <td>State : </td>
                  <td>{edit.cust_profile && edit.cust_profile.state}</td>
                </tr>
                <tr>
                  <td>Country : </td>
                  <td>{edit.cust_profile && edit.cust_profile.country}</td>
                </tr>
                <tr>
                  <td>Contact Number : </td>
                  <td>{edit.cust_profile && edit.cust_profile.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Favorites : </td>
                  <td>{edit.cust_profile && edit.cust_profile.favorites}</td>
                </tr>
              </tbody>
            </td>
            <td align="right">
              <img src={edit.cust_profile && edit.cust_profile.uploadedImageUrl} width="300px" height="300px" alt="Profile" />
            </td>
          </tr>
        </table>
        <hr size="30px" />
        {/* {chatSection} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // console.log('in state to props - state : ', state);
  auth: state.auth,
  edit: state.edit,
});

export default connect(mapStateToProps, { getCustomerProfile, addMessage })(CustomerProfile);
