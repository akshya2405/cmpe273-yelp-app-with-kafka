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

import UserServices from '../../js/services/user.service';

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
    };
  }

  componentDidMount() {
    // console.log(this.props.location.state);
    let custID = null;
    if (this.props.location.state) {
      custID = this.props.location.state;
    }
    // console.log('In customer profile did mount', custID);
    UserServices.getCustomerProfile(custID).then(
      (response) => {
        // console.log('response: ', response);
        this.setState({
          profile: response.data[0],
        });
      },
      (error) => {
        this.setState({
          profile:
          (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString(),
        });
      },
    );
  }

  render() {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    // console.log('user: ', currentUser);
    const editLink = (currentUser.userid === this.state.profile.email) ? (
      <td>
        <h4>
          <Link to={{ pathname: '/editProfile', state: this.state.profile }} className="glyphicon glyphicon-pencil">
            {' '}
          </Link>
        </h4>
      </td>
    ) : (<td />);

    // console.log('In customer profile');
    return (
        <div>
          <table className="table table-striped"> <tr><td>
            <tr>
              <td><h2>Customer Profile</h2></td>
              {editLink}
            </tr>
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
          </td><td align="right"><img src={this.state.profile.profileimgurl} width="300px" height="300px"/></td> </tr></table>
          <hr size="30px" />
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

export default connect(mapStateToProps)(CustomerProfile);
