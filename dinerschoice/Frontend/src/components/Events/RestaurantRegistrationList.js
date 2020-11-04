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

class RestaurantRegistrationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDetail: '',
    };
  }

  componentDidMount() {
    // console.log('event: ', this.props.location.state);
    this.setState({
      eventDetail: this.props.location.state,
    });
    // UserServices.getRegistrationList(this.props.location.state.eventID).then(
    //   (response) => {
    //     this.setState({
    //       registrationList: response.data,
    //     });
    //     // console.log(this.state.registrationList);
    //   },
    //   (error) => {
    //     this.setState({
    //       eventDetail:
    //       (error.response
    //         && error.response.data
    //         && error.response.data.message)
    //         || error.message
    //         || error.toString(),
    //       registrationList:
    //         (error.response
    //             && error.response.data
    //             && error.response.data.message)
    //             || error.message
    //             || error.toString(),
    //     });
    //   },
    // );
  }

  render() {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    // console.log('In event registration list');
    return (
      <div>
        {/* {redirectVar} */}
        <div className="container">
          <h2>Event Registration List</h2>
          <table className="table">
            <tbody>
              {/* Display the Table row based on data received */}
              <tr>
                <td>Name : </td>
                <td>{this.state.eventDetail.name}</td>
              </tr>
              <tr>
                <td>Description : </td>
                <td>{this.state.eventDetail.description}</td>
              </tr>
              <tr>
                <td>Date : </td>
                <td>{this.state.eventDetail.date}</td>
              </tr>
              <tr>
                <td>Time : </td>
                <td>{this.state.eventDetail.time}</td>
              </tr>
              <tr>
                <td>Location : </td>
                <td>{this.state.eventDetail.location}</td>
              </tr>
              <tr>
                <td>Hashtags : </td>
                <td>{this.state.eventDetail.hashtags}</td>
              </tr>
              <tr>
                <td>Registered Customers : </td>
                <td>
                  {
                    (!this.state.eventDetail.registrationList || this.state.eventDetail.registrationList.length === 0) ? (
                      <p>No one has registered yet</p>
                    ) : this.state.eventDetail.registrationList.map((cust) => (
                        <Link to={{ pathname: '/profile', state: cust.customerID }}>
                          {cust.fname}
                          {' '}
                          {cust.lname}
                        </Link>
                    ))
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(RestaurantRegistrationList);
