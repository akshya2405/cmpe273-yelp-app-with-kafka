/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import { connect } from 'react-redux';
import { login } from '../../js/actions/auth';
import { clearMessage } from '../../js/actions/message';

import 'bootstrap/dist/css/bootstrap.css';

import '../../App.css';

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

// Define a Login Component
class Login extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constructor of Super class i.e The Component
    super(props);
    // maintain the state required for this component
    this.state = {
      category: 'Customer',
      email: '',
      password: '',
      loading: false,
    };
    // Bind the handlers to this class
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentWillUnmount() {
    this.props.clearMessage();
  }

  categoryChangeHandler(e) {
    this.setState({
      category: e.target.value,
    });
  }

  // username change handler to update state variable with the text entered by the user
  emailChangeHandler(e) {
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

  // submit Login handler to send a request to the node backend
  submitLogin(e) {
    // prevent page from refresh
    e.preventDefault();
    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      this.props.login(this.state.category, this.state.email, this.state.password);
      // dispatch(login(this.state.category, this.state.email, this.state.password))
      //   .then(() => {
      //     console.log('Redirection category: ', this.state.category);
      //     if (this.state.category === 'Restaurant') {
      //       // console.log('Redirecting to : ', this.state.category);
      //       history.push('/restaurantDashboard');
      //       window.location.reload();
      //     } else {
      //       // console.log('Else Redirecting to : ', this.state.category);
      //       history.push('/profile');
      //       window.location.reload();
      //     }
      //     // history.push(`/dashboard/${this.state.category}`);
      //     // window.location.reload();
      //   })
      //   .catch(() => {
      //     this.setState({
      //       loading: false,
      //     });
      //   });
    } else {
      this.setState({
        loading: false,
      });
    }
    // const data = {
    //     category: this.state.category,
    //     email: this.state.email,
    //     password: this.state.password
    // }
    // console.log(data);
    // if (data.username === '' || data.password === '') {
    //     this.setState({
    //         errormsg: "Enter both username and password"
    //     })
    // } else {
    //     //set the with credentials to true
    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     axios.post('http://localhost:3001/login', data)
    //         .then(response => {
    //             console.log("Status Code : ", response.status);
    //             if (response.status === 200) {
    //                 console.log(response);
    //                 this.setState({
    //                     authFlag: true
    //                 })
    //             } else {
    //                 this.setState({
    //                     authFlag: false
    //                 })
    //             }
    //         }, (error) => {
    //             console.log(error.response.statusText);
    //             this.setState({
    //                 errormsg: error.response.statusText
    //             })
    //         });
    // }
  }

  render() {
    // console.log(this.props);
    const { auth, message } = this.props;
    // redirect based on successful login
    let redirectVar = null;
    if (auth.isLoggedIn && auth.user.category === 'Restaurant') {
      redirectVar = <Redirect to="/restaurantDashboard" />;
    } else if (auth.isLoggedIn && auth.user.category === 'Customer') {
      redirectVar = <Redirect to="/profile" />;
    }
    return (
      <div>
        {redirectVar}
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <Form
                onSubmit={this.submitLogin}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="panel">
                  <h2>User Login</h2>
                  <Select className="form-control" name="category" onChange={this.categoryChangeHandler}>
                    <option value="Customer" name="category">Customer</option>
                    <option value="Restaurant" name="category">Restaurant</option>
                  </Select>
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
                    validations={[required]}
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
                    <span>Login</span>
                  </button>
                </div>
                {message.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message.message}
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

const mapStateToProps = (state) => ({
  // console.log('In mapstate to props');
  auth: state.auth,
  edit: state.edit,
  message: state.message,
});

// export Login Component
export default connect(mapStateToProps, { login, clearMessage })(Login);
