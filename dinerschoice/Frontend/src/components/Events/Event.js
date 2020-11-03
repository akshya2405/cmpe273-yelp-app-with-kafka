/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { getRestaurantEvents } from '../../js/actions/getCalls';
import EventTable from '../../js/helpers/EventTable';
import SearchBar from '../../js/helpers/SearchBar';
import { eventsUpdate } from '../../js/actions/add';
import edit from "../../js/reducers/edit"; // change to eventUpdate

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      events: [],
      updateEntriesMap: new Map(),
      deleteEntriesMap: new Map(),
    };
    this.updateEvents = this.updateEvents.bind(this);
  }

  componentDidMount() {
    console.log('In restaurant event did mount');
    this.props.getRestaurantEvents();
    if (edit.events) {
      alert('events available');
      this.setState({
        events: edit.events,
      });
    }
    // UserServices.getEvents().then(// change to getEvents
    //   (response) => {
    //     // console.log('response: ', response.data);
    //     if (!response.data) {
    //       this.setState({
    //         events: [],
    //         hasMenu: false,
    //       });
    //     } else {
    //       this.setState({
    //         events: response.data,
    //       });
    //     }
    //   },
    //   (error) => {
    //     this.setState({
    //       events:
    //       (error.response
    //         && error.response.data
    //         && error.response.data.message)
    //         || error.message
    //         || error.toString(),
    //     });
    //   },
    // );
  }

  handleUserInput(filterText) {
    this.setState({ filterText });
  }

  // eslint-disable-next-line class-methods-use-this
  handleGetList(eventItem) {
    this.props.history.push('/registrationList', eventItem);
  }

  handleRowDel(eventItem) {
    // TODO : check if the initial list has this id, if so add to deleteEntriesList.
    // TODO : check if the id is in the updateEntriesMap if so remove it from the map.

    // if (eventItem.fromDB) {
      this.state.deleteEntriesMap.set(eventItem.eventID, eventItem);
    // }
    // console.log('check: ', this.state.updateEntriesMap.has(eventItem.eventID.toString()), typeof eventItem.eventID);
    if (this.state.updateEntriesMap.has(eventItem.eventID.toString())) {
      // console.log('Check in update map: ', eventItem.eventID);
      this.state.updateEntriesMap.delete(eventItem.eventID.toString());
    }
    const index = this.state.events.indexOf(eventItem);
    this.state.events.splice(index, 1);
    this.setState(this.state.events);
  }

  handleAddEvent(evt) {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const eventItem = {
      eventID: id,
      name: '',
      date: '',
      description: '',
      location: '',
      time: '',
      hashtags: '',
      fromDB: false,
    };
    this.state.events.push(eventItem);
    this.setState(this.state.events);
  }

  handleEventTable(evt) {
    // TODO : check if id exists in updateEntries map if so replace it else create new one.
    const field = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    // console.log('Item: ', field);
    const events = this.state.events.slice();
    const newevent = events.map((eventItem) => {
      for (const key in eventItem) {
        // console.log('zzzz:', key, field.name, key === field.name);
        // console.log('zzzz:', eventItem.eventID, field.id, eventItem.eventID.toString() === field.id);
        if (key === field.name && eventItem.eventID.toString() === field.id) {
          eventItem[key] = field.value;
          // console.log(`XX: ${eventItem}`);
          // console.log(`YY: ${key}`);
          this.state.updateEntriesMap.set(field.id, eventItem);
          if (eventItem.fromDB) {
            this.state.deleteEntriesMap.set(field.id, eventItem);
          }
        }
      }
      return eventItem;
    });
    // console.log('new event: ', newevent);
    // console.log('state event: ', this.state.events);
    this.setState({ newEvents: newevent });
    // console.log('update map: ', this.state.updateEntriesMap);
    // console.log('delete map: ', this.state.deleteEntriesMap);
  }

  updateEvents(e) {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const updateList = [];
    const deleteIds = Array.from(this.state.deleteEntriesMap.keys());
    Array.from(this.state.updateEntriesMap.keys()).forEach(
      (k) => updateList.push(this.state.updateEntriesMap.get(k)),
    );
    // console.log(`Update list: ${updateList}`);
    // console.log(`Delete keys:${deleteIds}`);
    dispatch(
      eventsUpdate(updateList, deleteIds),
    )
      .then(() => {
        this.setState({
          success: true,
        });
        // console.log('success');
        // history.push('/events');
        // window.location.reload();
      })
      .catch(() => {
        this.setState({
          success: false,
        });
      });
  }

  render() {
    const { user: currentUser } = this.props.auth;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    if (this.state.events) {
      console.log('In restaurant events');
      return (
        <div>
          <h2>
            Add/Update your events here
          </h2>
          <div>
            <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
            <EventTable onEventTableUpdate={this.handleEventTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} onGetList={this.handleGetList.bind(this)} events={this.state.events} filterText={this.state.filterText} />
          </div>
          {/* change to updateEvent */}
          <button onClick={this.updateEvents}>Update Event</button>
        </div>
      );
    }
    // return <div />;
  }
}

const mapStateToProps = (state) => ({
  // console.log('in state to props - state : ', state);
  auth: state.auth,
  edit: state.edit,
});

export default connect(mapStateToProps, { getRestaurantEvents })(Events);
