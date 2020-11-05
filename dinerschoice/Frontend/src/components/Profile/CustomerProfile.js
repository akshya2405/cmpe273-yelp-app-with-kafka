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

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // profile: '',
      isRestView: false,
    };
    this.handleFollow = this.handleFollow.bind(this);
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

  handleFollow() {
    console.log(this.props.location.state);
  }

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

    return (
      <div>
        <table className="table table-striped">
          {' '}
          <tr>
            <td>
              <tr>
                <td><h2>Customer Profile</h2></td>
                {editLink}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // console.log('in state to props - state : ', state);
  auth: state.auth,
  edit: state.edit,
});

export default connect(mapStateToProps, { getCustomerProfile })(CustomerProfile);
