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

import { getUsersList } from '../../js/actions/getCalls';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.displayProfile = this.displayProfile.bind(this);
  }

  componentDidMount() {
    this.props.getUsersList(); // TODO: Add all required js for this function call both frontend and backend
    if (this.props.edit && this.props.edit.userList) {
      this.setState({
        users: this.props.edit.userList,
      });
    }
  }

  displayProfile() {
      alert('Do something');
  }

  render() {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div className="container">
          <h2>Users List</h2>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  {
                    (!(this.props.edit && this.props.edit.userList) || this.props.edit.userList.length === 0) ? (
                      <p>No one has registered yet</p>
                    ) : this.props.edit.userList.map((cust) => (
                      (cust.id !== localStorage.getItem('id')) ? (
                        <a onClick={this.displayProfile}>
                          {cust.fname}
                          {' '}
                          {cust.lname}
                        </a>
                      ) : (<p />)
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
  const { edit } = state;
  return {
    user,
    edit,
  };
}

export default connect(mapStateToProps, { getUsersList })(Users);
