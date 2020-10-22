/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import '../../App.css';
// import axios from 'axios';
// import cookie from 'react-cookies';
import Form from 'react-validation/build/form';
import Select from 'react-validation/build/select';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import { isEmail } from 'validator';
import { connect } from 'react-redux';
import { signup } from '../../js/actions/auth';
import { clearMessage } from '../../js/actions/message';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vname = (value) => {
  const pattern = new RegExp('[a-zA-Z]+$');
  if (!pattern.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Name can contain only letters
      </div>
    );
  }
};

const vrestname = (value) => {
  const pattern = new RegExp('[a-zA-Z \']+$');
  if (!pattern.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Name can contain only letters, space and apostrophy
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 16) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 16 characters.
      </div>
    );
  }
};

const vaddress = (value) => {
  const pattern = new RegExp('^[a-zA-Z0-9 ]+$');
  if (!pattern.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Name can contain only alphanumeric, space and apostrophy
      </div>
    );
  }
};

const vzipcode = (value) => {
  const pattern = /^\d+$/;
  if (!pattern.test(value) && (value.length !== 5)) {
    return (
      <div className="alert alert-danger" role="alert">
        Name can contain only letters, space and apostrophy
      </div>
    );
  }
};

// Define a Signup Component
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      email: '',
      password: '',
      restName: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
      custFName: '',
      custLName: '',
      success: false,
      isCust: false,
      isRest: false,
    };
    // Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
    this.restNameChangeHandler = this.restNameChangeHandler.bind(this);
    this.addressChangeHandler = this.addressChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
    this.custFNameChangeHandler = this.custFNameChangeHandler.bind(this);
    this.custLNameChangeHandler = this.custLNameChangeHandler.bind(this);
    this.goBack = this.goBack.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(clearMessage());
  }

  // email change handler to update state variable with the text entered by the user
  emailChangeHandler(e) {
    console.log(e.target.value);
    this.setState({
      email: e.target.value,
    });
  }

  // password change handler to update state variable with the text entered by the user
  passwordChangeHandler(e) {
    this.setState({
      password: e.target.value,
    });
  }

  // category change handler to update state variable based on the option selected by the user
  categoryChangeHandler(e) {
    if (e.target.value === 'Customer') {
      this.setState({
        isCust: true,
        isRest: false,
        category: e.target.value,
      });
    } else if (e.target.value === 'Restaurant') {
      this.setState({
        isRest: true,
        isCust: false,
        category: e.target.value,
      });
    } else {
      this.setState({
        isCust: false,
        isRest: false,
      });
    }
  }

  restNameChangeHandler(e) {
    console.log(e.target.value);
    this.setState({
      restName: e.target.value,
    });
    console.log(this.state.restName);
  }

  addressChangeHandler(e) {
    this.setState({
      address: e.target.value,
    });
  }

  cityChangeHandler(e) {
    this.setState({
      city: e.target.value,
    });
  }

  stateChangeHandler(e) {
    // console.log(e);
    this.setState({
      state: e,
    });
  }

  countryChangeHandler(e) {
    this.setState({
      country: e,
    });
  }

  zipcodeChangeHandler(e) {
    this.setState({
      zipcode: e.target.value,
    });
  }

  custFNameChangeHandler(e) {
    // console.log(e.target.value);
    this.setState({
      custFName: e.target.value,
    });
  }

  custLNameChangeHandler(e) {
    // console.log(e.target.value);
    this.setState({
      custLName: e.target.value,
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  // submit Login handler to send a request to the node backend
  submitSignUp(e) {
    // prevent page from refresh
    e.preventDefault();

    const data = {
      category: this.state.category,
      email: this.state.email,
      password: this.state.password,
      restName: this.state.restName.replace(/'/g, "\\'"),
      address: this.state.address.replace(/'/g, "\\'"),
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zipcode: this.state.zipcode,
      custFName: this.state.custFName,
      custLName: this.state.custLName,
      isCust: this.state.isCust,
    };

    console.log('Data: ', data);

    this.setState({
      success: false,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      console.log(this.state);
      dispatch(
        signup(data),
      )
        .then(() => {
          this.setState({
            success: true,
          });
          // console.log('success');
          history.push('/login');
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            success: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;
    return (
      <div>
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <Form
                onSubmit={this.submitSignUp}
                ref={(c) => {
                  this.form = c;
                }}
              >
                {!this.state.success && (
                <div>
                  <div className="panel">
                    <h2>User Signup</h2>
                    <p>Who do you want to signup as?</p>
                    <Select className="form-control" name="category" onChange={this.categoryChangeHandler} validations={[required]}>
                      <option value="Default" name="category">Select a role</option>
                      <option value="Customer" name="category">Customer</option>
                      <option value="Restaurant" name="category">Restaurant</option>
                    </Select>
                  </div>
                  <div>
                    {this.state.isCust && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="custFName">First Name</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="custFName"
                          value={this.state.custFName}
                          onChange={this.custFNameChangeHandler}
                          validations={[required, vname]}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="custLName">Last Name</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="custLName"
                          value={this.state.custLName}
                          onChange={this.custLNameChangeHandler}
                          validations={[required, vname]}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="email"
                          value={this.state.email}
                          onChange={this.emailChangeHandler}
                          validations={[required, email]}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          onChange={this.passwordChangeHandler}
                          validations={[required, vpassword]}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          disabled={this.state.loading}
                        >
                          {this.state.loading && (
                          <span className="spinner-border spinner-border-sm" />
                          )}
                          <span>Sign Up</span>
                        </button>
                      </div>
                    </div>
                    )}
                    {this.state.isRest && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="restName">Restaurant Name</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="restName"
                          value={this.state.restName}
                          onChange={this.restNameChangeHandler}
                          validations={[required, vrestname]}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address">Street Address</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="address"
                          value={this.state.address}
                          onChange={this.addressChangeHandler}
                          validations={[required, vaddress]}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="city"
                          value={this.state.city}
                          onChange={this.cityChangeHandler}
                          validations={[required, vrestname]}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <CountryDropdown
                          name="country"
                          value={this.state.country}
                          className="form-control"
                          onChange={this.countryChangeHandler}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="state">State</label>
                        <RegionDropdown
                          name="state"
                          country={this.state.country}
                          value={this.state.state}
                          className="form-control"
                          onChange={this.stateChangeHandler}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="zipcode">Zipcode</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="zipcode"
                          value={this.state.zipcode}
                          onChange={this.zipcodeChangeHandler}
                          validations={[required, vzipcode]}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="email"
                          value={this.state.email}
                          onChange={this.emailChangeHandler}
                          validations={[required, email]}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          onChange={this.passwordChangeHandler}
                          validations={[required, vpassword]}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="submit"
                          className="btn btn-primary btn-block"
                          disabled={this.state.loading}
                          onClick={this.submitSignUp}
                        >
                          {this.state.loading && (
                          <span className="spinner-border spinner-border-sm" />
                          )}
                          <span>Sign Up</span>
                        </input>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
                )}
                {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
                )}
                <CheckButton
                  style={{ display: 'none' }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('In mapstate to props');
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps, null)(Signup);
