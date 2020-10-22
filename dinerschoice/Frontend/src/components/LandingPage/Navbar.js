/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unescaped-entities */

import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';

import { logout } from '../../js/actions/auth';
import { history } from '../../js/helpers/history';
import { clearMessage } from '../../js/actions/message';
import '../../App.css';

const navbarCustomer = (
  <ul className="nav navbar-nav mr-auto">
    <li><NavLink to="/dashboard" activeStyle={{ background: 'white', color: 'red' }}>Dashboard</NavLink></li>
    <li><NavLink to="/profile" activeStyle={{ background: 'white', color: 'red' }}>Profile</NavLink></li>
    <li><NavLink to="/customerorders" activeStyle={{ background: 'white', color: 'red' }}>Orders</NavLink></li>
    <li><NavLink to="/upcomingEvents" activeStyle={{ background: 'white', color: 'red' }}>Events</NavLink></li>
    <li><NavLink to="/myReviews" activeStyle={{ background: 'white', color: 'red' }}>My Reviews</NavLink></li>
  </ul>
);

const navbarRestaurant = (
  <ul className="nav navbar-nav mr-auto">
    <li><NavLink to="/restaurantDashboard" activeStyle={{ background: 'white', color: 'red' }}>Dashboard</NavLink></li>
    <li><NavLink to="/menu" activeStyle={{ background: 'white', color: 'red' }}>Menu</NavLink></li>
    <li><NavLink to="/orders" activeStyle={{ background: 'white', color: 'red' }}>Orders</NavLink></li>
    <li><NavLink to="/events" activeStyle={{ background: 'white', color: 'red' }}>Events</NavLink></li>
  </ul>
);

const display = (currentUser) => {
  if (currentUser) { console.log(currentUser.category); }
  if (currentUser && currentUser.category === 'Restaurant') {
    return navbarRestaurant;
  }
  if (currentUser && currentUser.category === 'Customer') {
    return navbarCustomer;
  }
  return (
    <ul className="nav navbar-nav mr-auto">
      <li>
        <NavLink to="/dashboard" activeStyle={{ background: 'white', color: 'red' }}>Dashboard</NavLink>
      </li>
    </ul>
  );
};

// create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      currentUser: undefined,
      lookupString: ''
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setState({
          currentUser: user,
      });
    } else {
        this.setState ( {
            currentUser: undefined,
        });
    }
  }

    handleUserInput(evt) {
        this.state.lookupString = evt.target.value;
    }
  // handle logout to destroy the cookie
  handleLogout() {
    const { dispatch, history } = this.props;
    dispatch(logout()).then(() => {
      this.setState({ currentUser: undefined });
      history.push('/');
      window.location.reload();
    });
  }

    lookupSearchResults(e) {
        // prevent page from refresh
        e.preventDefault();
        const lookupParams = {
            searchToken: this.state.lookupString
        };
        this.state.lookupString = '';
        const { dispatch, history } = this.props;
            // console.log("XXX:", lookupParams);
                    history.push({
                        pathname: '/dashboard',
                        state: {lookupParams: lookupParams}
                    });
                    window.location.reload();
    }

    render() {
    const { currentUser } = this.state;
    let navLogin = null;
    { currentUser ? (
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span className="glyphicon glyphicon-user" />
              Logout
            </Link>
          </li>
        </ul>
      )
    ) : (
      // Else display login button
      // console.log('Not Able to read cookie');
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/signup">Sign Up</Link></li>
          <li>
            <Link to="/login">
              <span className="glyphicon glyphicon-log-in" />
              {' '}
              Login
            </Link>
          </li>
        </ul>
      )
    );
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid"><table className="table table-borderless table-condensed table-hover">
            <tr><td><div className="navbar-header">
              <a className="navbar-brand" href="/dashboard">Diner's Choice</a>
            </div>
            {display(currentUser)}
            {navLogin}
          </td></tr>
              <tr> <td align="center">
                  <Form onSubmit={this.lookupSearchResults.bind(this)}>
                      <input type="text" style={{width:"700px", height:"40px"}} onChange={this.handleUserInput.bind(this)}/><button className="btn btn-outline-secondary" type="submit"  style={{width:"100px", height:"40px"}}>Search</button>
                  </Form></td></tr>
            </table>
            </div>
        </nav>{/*
          <Redirect to="/dashboard" />*/}
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

export default connect(mapStateToProps)(Navbar);
