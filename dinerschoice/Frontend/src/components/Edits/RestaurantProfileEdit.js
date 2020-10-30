/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../../App.css';
import Form from 'react-validation/build/form';
// import Select from 'react-validation/build/select';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import Textarea from 'react-validation/build/textarea';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { connect } from 'react-redux';
import { Select, CaretIcon, ModalCloseButton } from 'react-responsive-select';

import { editRestaurantProfile } from '../../js/actions/edit';
import { clearMessage } from '../../js/actions/message';
import ReactUploadImageMultiple from '../../js/helpers/MultiImageUpload';
import 'react-dropdown/style.css';
import 'react-responsive-select/dist/react-responsive-select.css';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vtext = (value) => {
  if (value.length !== 0) {
    const pattern = new RegExp('[a-zA-Z ]+$');
    if (!pattern.test(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Can contain only letters and space
        </div>
      );
    }
  }
};

const vaddress = (value) => {
  const pattern = new RegExp('^[a-zA-Z0-9 ]+$');
  if (!pattern.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Name can contain only alphanumeric characters, space and apostrophy
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

class EditRestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.restaurantStatus = [{ value: 'Open', text: 'Open' }, { value: 'Closed', text: 'Closed' }, { value: 'Temporarily closed', text: 'Temporarily closed' }, { value: 'Permanently closed', text: 'Permanently closed' }];
    this.state = {
      name: '',
      description: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
      contactinfo: '',
      cuisine: '',
      status: '',
      modes: [],
      hours: {},
      uploadedImage: '',
      profile: {},
      success: false,
      dineInOffered: false,
      pickupOffered: false,
      curbsideOffered: false,
      patioOffered: false,
      deliveryOffered: false,
    };

    this.updateProfile = this.updateProfile.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.addressChangeHandler = this.addressChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
    this.contactinfoChangehandler = this.contactinfoChangehandler.bind(this);
    this.cuisineChangehandler = this.cuisineChangehandler.bind(this);
    this.statusChangehandler = this.statusChangehandler.bind(this);
    this.modeChangehandler = this.modeChangehandler.bind(this);
    this.hoursChangeHandler = this.hoursChangeHandler.bind(this);
  }

  componentDidMount() {
    console.log(this.props.location.state.profile);
    this.setState({
      profile: this.props.location.state.profile,
    });
  }

  componentWillUnmount() {
    this.props.clearMessage();
  }

  populateServicesOffered() {
    if (this.state.profile && this.state.profile.mode) {
      this.state.modes = this.state.profile.mode.split(',');
      const modeList = this.state.profile.mode.split(',');

      if (modeList.includes('Dine-in')) this.setState({ dineInOffered: true });
      if (modeList.includes('Curbside pickup')) this.setState({ curbsideOffered: true });
      if (modeList.includes('Patio dine-in')) this.setState({ patioOffered: true });
      if (modeList.includes('Delivery')) this.setState({ deliveryOffered: true });
      if (modeList.includes('Pick up')) this.setState({ pickupOffered: true });
    }
  }

  populateOpenHours() {
    if (this.state.profile && this.state.profile.hours) {
      this.state.hours = this.state.profile.hours;
    }
  }

  nameChangeHandler(e) {
    this.setState({
      name: e.target.value,
    });
  }

  descriptionChangeHandler(e) {
    this.setState({
      description: e.target.value,
    });
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
    this.setState({
      state: e,
    });
  }

  countryChangeHandler(e) {
    this.setState({
      country: e,
      state: '',
    });
  }

  zipcodeChangeHandler(e) {
    this.setState({
      zipcode: e.target.value,
    });
  }

  contactinfoChangehandler(e) {
    this.setState({
      contactinfo: e.target.value,
    });
  }

  cuisineChangehandler(e) {
    this.setState({
      cuisine: e.target.value,
    });
  }

  statusChangehandler(e) {
    this.state.status = e.value;
    this.state.profile.status = e.value;
    // console.log(`Status:${this.state.status}`);
  }

  imageUploadChangeHandler(e) {
    this.state.uploadedImage = e.target.files[0];
    // console.log(`file:${this.state.uploadedImage}`);
  }

  updateServicesState(service, status) {
    if (service === 'Dine-in') this.setState({ dineInOffered: status });
    if (service === 'Curbside pickup') this.setState({ curbsideOffered: status });
    if (service === 'Patio dine-in') this.setState({ patioOffered: status });
    if (service === 'Delivery') this.setState({ deliveryOffered: status });
    if (service === 'Pick up') this.setState({ pickupOffered: status });
  }

  modeChangehandler(e) {
    this.updateServicesState(e.target.value, e.target.checked);
    // console.log(e.target.value);
    if (!this.state.profile.mode) {
      this.state.profile.mode = '';
    }
    const { modes } = this.state;

    let index;
    if (e.target.checked) {
      modes.push(e.target.value);
    } else {
      index = modes.indexOf(e.target.value);
      modes.splice(index, 1);
    }
    this.setState({
      modes,
    });
    // console.log(`Modes : ${this.state.modes.toString()}`);
  }

  hoursChangeHandler(e) {
    const id = e.target ? e.target.id : e.name;
    const value = e.target ? e.target.value : e.value;
    const splitVals = (id).split('-');
    const [key, day] = splitVals;
    // console.log('splitvals:', splitVals);
    // console.log('keys:', key, day);
    if (!this.state.hours[day]) this.state.hours[day] = {};
    this.state.hours[day][key] = value;
    // console.log('Hours:', this.state.hours);
  }

  updateProfile(e) {
    e.preventDefault();
    console.log('check category: ', this.props.auth.user.category);
    const data = {
      category: this.props.auth.user.category,
      id: this.state.profile.id,
      name: this.state.name,
      description: this.state.description,
      streetAddress: this.state.address,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zipcode: this.state.zipcode,
      contactInfo: this.state.contactinfo,
      cuisine: this.state.cuisine,
      status: this.state.status,
      mode: this.state.modes.toString(),
      hours: this.state.hours,
      profileImage: this.state.uploadedImage,
    };
    if (data.name === '') data.name = this.state.profile.name.replace(/'/g, "\\'");
    if (data.description === '' && this.state.profile.description) data.description = this.state.profile.description.replace(/'/g, "\\'");
    if (data.streetAddress === '' && this.state.profile.streetAddress !== '') data.streetAddress = this.state.profile.streetAddress.replace(/'/g, "\\'");
    if (data.city === '' && this.state.profile.city !== '') data.city = this.state.profile.city.replace(/'/g, "\\'");
    if (data.state === '' && this.state.profile.state !== '') data.state = this.state.profile.state;
    if (data.country === '' && this.state.profile.country !== '') data.country = this.state.profile.country;
    if (data.zipcode === '' && this.state.profile.zipcode !== '') data.zipcode = this.state.profile.zipcode;
    if (data.contactInfo === '' && this.state.profile.contactInfo) data.contactInfo = this.state.profile.contactInfo;
    if (data.cuisine === '' && this.state.profile.cuisine) data.cuisine = this.state.profile.cuisine.replace(/'/g, "\\'");
    if (data.status === '' && this.state.profile.status) data.status = this.state.profile.status;
    if (data.modes === '' && this.state.profile.modes) data.modes = this.state.profile.mode;
    // console.log('Data to node:', data);

    this.setState({
      success: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props.editRestaurantProfile(data);
      // console.log(this.state);
      // dispatch(
      //   editRestaurantProfile(data),
      // )
      //   .then(() => {
      //     this.setState({
      //       success: true,
      //     });
      //     // console.log('success');
      //     history.push('/restaurantDashboard');
      //     window.location.reload();
      //   })
      //   .catch(() => {
      //     this.setState({
      //       success: false,
      //     });
      //   });
    }
  }

  render() {
    // Display profile
    // if not logged in go to login page
    if (!this.props.auth.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    if (this.props.edit.isEdited) {
      return <Redirect to="/restaurantDashboard" />;
    }
    const { message } = this.props.message;
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const details = daysOfWeek.map((day) => {
      const selectid = `openclose-${day}`;
      const openid = `opentime-${day}`;
      const closeid = `closetime-${day}`;
      let previousOpenTime = '';
      let previousCloseTime = '';
      let previousStatus = '';
      this.populateOpenHours();
      // console.log(day, this.state.hours, this.state.hours[day]);
      previousOpenTime = this.state.hours[day] ? this.state.hours[day].opentime : '';
      previousCloseTime = this.state.hours[day] ? this.state.hours[day].closetime : '';
      previousStatus = this.state.hours[day] ? this.state.hours[day].openclose : '';
      // console.log(day, previousStatus);
      return (
        <tr>
          <td>{day}</td>
          <td>
            <Select
              name={selectid}
              id={selectid}
              modalCloseButton={<ModalCloseButton />}
              options={[{ value: '', text: 'Select' }, { value: 'Open', text: 'Open' }, { value: 'Closed', text: 'Closed' }]}
              selectedValue={previousStatus}
              caretIcon={<CaretIcon />}
              onChange={this.hoursChangeHandler}
            />
          </td>
          <div id="timeid">
            <td><input id={openid} type="time" name={openid} onChange={this.hoursChangeHandler} defaultValue={previousOpenTime} /></td>
            <td><input id={closeid} type="time" name={closeid} onChange={this.hoursChangeHandler} defaultValue={previousCloseTime} /></td>
          </div>
        </tr>
      );
    });
    return (
      <div>
        <div className="container">
          <h2>Edit Restaurant Profile</h2>
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
                    <td><label htmlFor="name">Name</label></td>
                    <td>
                      <Input
                        type="text"
                        className="text-edit"
                        name="name"
                        value={this.state.profile.name}
                        onChange={this.nameChangeHandler}
                        placeholder={this.state.profile.name}
                        validations={[required, vtext]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="description">Description</label></td>
                    <td>
                      <Textarea
                        name="description"
                        className="text-edit"
                        onChange={this.descriptionChangeHandler}
                        placeholder={this.state.profile.description ? this.state.profile.description : ('Add description of the restaurant')}
                        validations={[vtext]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="address">Street address</label></td>
                    <td>
                      <Input
                        type="text"
                        className="text-edit"
                        name="address"
                        value={this.state.profile.streetAddress}
                        onChange={this.addressChangeHandler}
                        placeholder={this.state.profile.streetAddress}
                        validations={[required, vaddress]}
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
                        validations={[required, vtext]}
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
                        validations={[required]}
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
                        validations={[required]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="zipcode">Zipcode</label></td>
                    <td>
                      <Input
                        type="text"
                        className="text-edit"
                        name="zipcode"
                        value={this.state.profile.zipcode}
                        onChange={this.zipcodeChangeHandler}
                        validations={[required, vzipcode]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="contactinfo">Phone Number</label>
                    </td>
                    <td>
                      <Input
                        type="text"
                        className="text-edit"
                        name="contactinfo"
                        value={this.state.contactinfo}
                        onChange={this.contactinfoChangehandler}
                        placeholder={this.state.profile.contactInfo ? this.state.profile.contactInfo : ('Add contact number of the restaurant')}
                        validations={[vphone]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="cuisine">Cuisine</label></td>
                    <td>
                      <Input
                        type="text"
                        className="text-edit"
                        name="cuisine"
                        value={this.state.cuisine}
                        onChange={this.cuisineChangehandler}
                        placeholder={this.state.profile.cuisine ? this.state.profile.cuisine : ('Eg. Mexican,American')}
                        validations={[vtext]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Restaurant Status: </td>
                    {' '}
                    <td>
                      <Select
                        name="restaurantStatus"
                        id="restaurantStatus"
                        modalCloseButton={<ModalCloseButton />}
                        options={this.restaurantStatus}
                        selectedValue={this.state.profile.status}
                        caretIcon={<CaretIcon />}
                        onChange={this.statusChangehandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="services">Services offered</label></td>
                    <td>
                      <label>
                        <input type="checkbox" value="Dine-in" name="services" onChange={this.modeChangehandler} checked={this.state.dineInOffered} />
                        {' '}
                        Dine-in
                      </label>
                      <tr>
                        <label>
                          <input type="checkbox" value="Curbside pickup" name="services" onChange={this.modeChangehandler} checked={this.state.curbsideOffered} />
                          {' '}
                          Curbside pickup
                        </label>
                      </tr>
                      <tr>
                        <label>
                          <input type="checkbox" value="Patio dine-in" name="services" onChange={this.modeChangehandler} checked={this.state.patioOffered} />
                          {' '}
                          Patio dine-in
                        </label>
                      </tr>
                      <tr>
                        <label>
                          <input type="checkbox" value="Delivery" name="services" onChange={this.modeChangehandler} checked={this.state.deliveryOffered} />
                          {' '}
                          Delivery
                        </label>
                      </tr>
                      <tr>
                        <label>
                          <input type="checkbox" value="Pick up" name="services" onChange={this.modeChangehandler} checked={this.state.pickupOffered} />
                          {' '}
                          Pick up
                        </label>
                      </tr>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="hours">Hours</label></td>
                    <td>
                      {details}
                    </td>
                  </tr>
                  <tr><td><ReactUploadImageMultiple onImageUpload={this.imageUploadChangeHandler.bind(this)} /></td></tr>
                </tbody>
              </table>
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
    );
  }
}

const mapStateToProps = (state) => ({
  // console.log('In mapstate to props');
  auth: state.auth,
  edit: state.edit,
  message: state.message,
});

export default connect(mapStateToProps, { editRestaurantProfile, clearMessage })(EditRestaurantProfile);
