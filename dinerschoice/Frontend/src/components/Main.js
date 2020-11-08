/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Navbar from './LandingPage/Navbar';
import RestaurantProfile from './Profile/RestaurantProfile';
import RestaurantProfileEdit from './Edits/RestaurantProfileEdit';
import Dashboard from './Dashboard/Dashboard';
import CustomerProfile from './Profile/CustomerProfile';
import CustomerProfileEdit from './Edits/CustomerProfileEdit';
import Menu from './Menu/Menu';
import Events from './Events/Event';
import RegistrationList from './Events/RestaurantRegistrationList';
import UpcomingEvents from './Events/EventCustomerView';
import ReviewCustomerView from './Reviews/ReviewsCustomerView';
import CustViewMenu from './Menu/CustViewMenu';
import CustomerOrders from './Orders/CustomerOrders';
import RestaurantOrders from './Orders/RestaurantOrders';
import Messages from './Messages/RestMessages';

// Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/* Render Different Component based on Route */}
        <Route path="/" component={Navbar} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/restaurantDashboard" component={RestaurantProfile} />
        <Route path="/editRestaurantProfile" component={RestaurantProfileEdit} />
        <Route path="/profile" component={CustomerProfile} />
        <Route path="/editprofile" component={CustomerProfileEdit} />
        <Route path="/menu" component={Menu} />
        <Route path="/events" component={Events} />
        <Route path="/registrationList" component={RegistrationList} />
        <Route path="/upcomingEvents" component={UpcomingEvents} />
        <Route path="/myReviews" component={ReviewCustomerView} />
        <Route path="/custView" component={CustViewMenu} />
        <Route path="/customerorders" component={CustomerOrders} />
        <Route path="/orders" component={RestaurantOrders} />
        <Route path="/messages" component={Messages} />
      </div>
    );
  }
}
// Export The Main Component
export default Main;
