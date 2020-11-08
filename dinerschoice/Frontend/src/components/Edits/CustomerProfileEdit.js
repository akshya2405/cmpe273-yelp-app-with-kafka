/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import React, { Component } from 'react';
import '../../App.css';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Textarea from 'react-validation/build/textarea';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { editCustomerProfile } from '../../js/actions/edit';
import { clearMessage } from '../../js/actions/message';
import ReactUploadImageSingle from '../../js/helpers/SingleImageUpload';
import {Redirect} from "react-router";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vname = (value) => {
  if (value) {
    const pattern = new RegExp('[a-zA-Z]+$');
    if (!pattern.test(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Can contain only letters
        </div>
      );
    }
  }
};

const vtext = (value) => {
  if (value) {
    const pattern = new RegExp('[a-zA-Z !\']+$');
    if (!pattern.test(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Can contain only letters and space and apostrophy
        </div>
      );
    }
  }
};

const vphone = (value) => {
  if (value.length > 0) { // eslint-disable-next-line prefer-template
    // console.log('in phone validation');
    const pattern = /^\d+$/;
    if (!pattern.test(value) || (value.length !== 10)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid phone number.
        </div>
      );
    }
  }
};

class EditCustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      headline: '',
      nickname: '',
      city: '',
      state: '',
      country: '',
      phoneNumber: '',
      dob: '',
      favorites: '',
      profileimgurl: '',
      profile: {},
      success: false,
    };
    this.updateProfile = this.updateProfile.bind(this);
    this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
    this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
    this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
    this.dobChangeHandler = this.dobChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.phoneNumberChangehandler = this.phoneNumberChangehandler.bind(this);
    this.nicknameChangehandler = this.nicknameChangehandler.bind(this);
    this.favoritesChangehandler = this.favoritesChangehandler.bind(this);
    this.imageurlChangeHandler = this.imageurlChangeHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      profile: this.props.location.state,
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearMessage());
  }

  fnameChangeHandler(e) {
    this.setState({
      fname: e.target.value,
    });
  }

  lnameChangeHandler(e) {
    this.setState({
      lname: e.target.value,
    });
  }

  headlineChangeHandler(e) {
    // console.log(e.target.value);
    this.setState({
      headline: e.target.value,
    });
  }

  dobChangeHandler(e) {
    // console.log('dob handler: ', e.target.value);
    this.setState({
      dob: e.target.value,
    });
  }

  cityChangeHandler(e) {
    this.setState({
      city: e.target.value,
    });
  }

  stateChangeHandler(e) {
    this.setState({
      state: e,
    });
  }

  countryChangeHandler(e) {
    this.setState({
      country: e,
    });
  }

  phoneNumberChangehandler(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  nicknameChangehandler(e) {
    this.setState({
      nickname: e.target.value,
    });
  }

  favoritesChangehandler(e) {
    this.state.favorites = e.target.value;
  }

  imageurlChangeHandler(e) {
    this.setState({
      imageurl: e.target.value,
    });
  }

  imageUploadChangeHandler(e) {
    this.state.uploadedImage = e.target.files[0];
    // console.log(`file:${this.state.uploadedImage}`);
  }

  updateProfile(e) {
    // prevent page from refresh
    e.preventDefault();
    const data = {
      category: this.props.auth.user.category,
      id: this.state.profile.id,
      fname: this.state.fname,
      lname: this.state.lname,
      headline: this.state.headline,
      nickname: this.state.nickname,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      phoneNumber: this.state.phoneNumber,
      dob: this.state.dob,
      favorites: this.state.favorites,
      profileimgurl: this.state.profileimgurl,
      uploadedImage: this.state.uploadedImage,
    };
    // console.log(data.dob);
    if (data.fname === '') data.fname = this.state.profile.fname;
    if (data.lname === '') data.lname = this.state.profile.lname;
    if (data.headline === '' && this.state.profile.headline) data.headline = this.state.profile.headline.replace(/'/g, "\\'");
    if (data.nickname === '' && this.state.profile.nickname) data.nickname = this.state.profile.nickname;
    if (data.city === '' && this.state.profile.city) data.city = this.state.profile.city.replace(/'/g, "\\'");
    if (data.state === '' && this.state.profile.state) data.state = this.state.profile.state;
    if (data.country === '' && this.state.profile.country) data.country = this.state.profile.country;
    if (data.dob === '' && this.state.profile.dob) data.dob = this.state.profile.dob;
    if (data.phoneNumber === '' && this.state.profile.phoneNumber) data.phoneNumber = this.state.profile.phoneNumber;
    if (data.favorites === '' && this.state.profile.favorites) data.favorites = this.state.profile.favorites.replace(/'/g, "\\'");
    // console.log('Data to node:', data.headline, data.dob, data);

    this.setState({
      success: false,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      // console.log(this.state);
      dispatch(
        editCustomerProfile(data),
      )
        .then(() => {
          this.setState({
            success: true,
          });
          // console.log('success');
          history.push('/profile');
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
    const { auth, edit, message } = this.props;
    if (!auth.user) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div className="container">
          <h2>Edit Customer Profile</h2>
          <Form
            onSubmit={this.updateProfile}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.success && (
            <div>
              <table className="table">
                <tbody>
                  {/* Display the Table row based on data received */}
                  <tr>
                    <td><label htmlFor="fname">Name</label></td>
                    <td>
                      <Input
                        type="text"
                        className="text-edit"
                        name="fname"
                        value={this.state.profile.fname}
                        onChange={this.fnameChangeHandler}
                        placeholder={this.state.profile.fname}
                        validations={[required, vname]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="lname">Name</label></td>
                    <td>
                      <Input
                        type="text"
                        className="text-edit"
                        name="lname"
                        value={this.state.profile.lname}
                        onChange={this.lnameChangeHandler}
                        placeholder={this.state.profile.lname}
                        validations={[required, vname]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="headline">Headline</label></td>
                    <td>
                      <Textarea
                        name="headline"
                        className="text-edit"
                        onChange={this.headlineChangeHandler}
                        placeholder={this.state.profile.headline ? this.state.profile.headline : ('Add you headline')}
                        validations={[vtext]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="nickname">Nickname</label></td>
                    <td>
                      <Input
                        type="text"
                        className="text-edit"
                        name="address"
                        value={this.state.profile.nickname}
                        onChange={this.nicknameChangehandler}
                        placeholder={this.state.profile.nickname}
                        validations={[vname]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="city">City</label></td>
                    <td>
                      <Input
                        type="text"
                        className="text-edit"
                        name="city"
                        value={this.state.profile.city}
                        onChange={this.cityChangeHandler}
                        placeholder={this.state.profile.city}
                        validations={[vtext]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="country">Country</label></td>
                    <td>
                      <CountryDropdown
                        name="country"
                        className="text-edit"
                        value={this.state.country}
                        defaultOptionLabel={this.state.profile.country}
                        onChange={this.countryChangeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="state">State</label></td>
                    <td>
                      <RegionDropdown
                        name="state"
                        className="text-edit"
                        country={this.state.country}
                        value={this.state.state}
                        defaultOptionLabel={this.state.profile.state}
                        onChange={this.stateChangeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="phoneNumber">Phone Number</label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="text-edit"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.phoneNumberChangehandler}
                        placeholder={this.state.profile.phoneNumber ? this.state.profile.phoneNumber : ('Add contact number')}
                        validations={[vphone]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="dob">Date of Birth</label></td>
                    <td>
                      <Input
                        type="date"
                        name="dob"
                        value={this.state.profile.dob}
                        onChange={this.dobChangeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="favorites">Favorites</label></td>
                    <td>
                      <Textarea
                        name="favorites"
                        className="text-edit"
                        onChange={this.favoritesChangehandler}
                        placeholder={this.state.profile.favorites ? this.state.profile.favorites : ('Add you favorites')}
                        validations={[vtext]}
                      />
                    </td>
                  </tr>
                  <tr><td><ReactUploadImageSingle onImageUpload={this.imageUploadChangeHandler.bind(this)} /></td></tr>
                </tbody>
              </table>
              {withRouter}
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                  <span className="spinner-border spinner-border-sm" />
                  )}
                  <span>Update Profile</span>
                </button>
              </div>
            </div>
            )}
            {/*{message && (*/}
            {/*<div className="form-group">*/}
            {/*  <div className="alert alert-danger" role="alert">*/}
            {/*    {message}*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*)}*/}
            <CheckButton
              style={{ display: 'none' }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
// export Home Component
const mapStateToProps = (state) => ({
  // console.log('In mapstate to props');
  auth: state.auth,
  edit: state.edit,
  message: state.message,
});

export default connect(mapStateToProps, null)(EditCustomerProfile);
