/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';

class CustProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      custID: this.props.location.state,
    };
  }

  componentDidMount() {
    // console.log('In customer profile did mount');
    axios.get('http://localhost:3001/custProfileView', { custID: this.state.custID })
      .then((response) => {
        // update the state with the response data
        // console.log(response.data);
        this.setState({
          profile: response.data,
        });
        // console.log(this.state.profile);
      });
  }

  render() {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    // console.log('In customer profile');
    return (
      <div>
        <div className="container">
          <h2>Customer Profile</h2>
          <table className="table">
            <tbody>
              {/* Display the Table row based on data received */}
              <tr>
                <td>First Name : </td>
                <td>{this.state.profile.fname}</td>
              </tr>
              <tr>
                <td>Last Name : </td>
                <td>{this.state.profile.lname}</td>
              </tr>
              <tr>
                <td>Nickname : </td>
                <td>{this.state.profile.nickname}</td>
              </tr>
              <tr>
                <td>Headline : </td>
                <td>{this.state.profile.headline}</td>
              </tr>
              <tr>
                <td>E-mail id : </td>
                <td>{this.state.profile.email}</td>
              </tr>
              <tr>
                <td>Date of Birth : </td>
                <td>{this.state.profile.dob}</td>
              </tr>
              <tr>
                <td>Choosing since : </td>
                <td>{this.state.profile.choosingSince}</td>
              </tr>
              <tr>
                <td>City : </td>
                <td>{this.state.profile.city}</td>
              </tr>
              <tr>
                <td>State : </td>
                <td>{this.state.profile.state}</td>
              </tr>
              <tr>
                <td>Country : </td>
                <td>{this.state.profile.country}</td>
              </tr>
              <tr>
                <td>Contact Number : </td>
                <td>{this.state.profile.phoneNumber}</td>
              </tr>
              <tr>
                <td>Favorites : </td>
                <td>{this.state.profile.favorites}</td>
              </tr>
            </tbody>
          </table>
          <hr size="30px" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  // console.log('user: ', user);
  return {
    user,
  };
}

export default connect(mapStateToProps)(CustProfileView);
