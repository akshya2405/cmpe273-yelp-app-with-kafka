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
import Pagination from '../../js/helpers/Pagination';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      events: null,
      updateEntriesMap: new Map(),
      deleteIds: [],
      currentEvents: null,
    };
    this.updateEvents = this.updateEvents.bind(this);
  }

  componentDidMount() {
    console.log('In restaurant event did mount');
    const { dispatch } = this.props;
    dispatch(getRestaurantEvents()).then(() => {
      if (this.props.events) {
        // alert('events available');
        this.setState({
          events: this.props.events,
          currentEvents: this.props.events,
        });
      } else {
        this.setState({
          events: [],
          currentEvents: [],
        });
      }
    });
  }

  onPageChanged = data => {
    const { events } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentEvents = events.slice(offset, offset + pageLimit);
    // alert(JSON.stringify(events));
    // alert(JSON.stringify(data));
    this.setState({ currentPage, currentEvents, totalPages });
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

    // alert(JSON.stringify(eventItem));
    // if (eventItem.fromDB) {
    // alert(this.state.deleteIds)
    this.state.deleteIds.push(eventItem._id);
    // }
    // console.log('check: ', this.state.updateEntriesMap.has(eventItem.eventID.toString()), typeof eventItem.eventID);
    if (this.state.updateEntriesMap.has(eventItem._id)) {
      // console.log('Check in update map: ', eventItem.eventID);
      this.state.updateEntriesMap.delete(eventItem._id);
    }
    // alert(JSON.stringify(this.state.deleteIds));
    const index = this.state.events.indexOf(eventItem);
    this.state.events.splice(index, 1);
    this.setState(this.state.events);
    this.setState(this.state.deleteIds);
  }

  handleAddEvent(evt) {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    // alert('in add event');
    const eventItem = {
      _id: id,
      eventID: id,
      name: '',
      date: '',
      description: '',
      location: '',
      time: '',
      hashtags: '',
      restId: this.props.auth.user._id,
    };
    this.state.events.push(eventItem);
    // alert(JSON.stringify(this.state.events));
    this.setState(this.state.events);
	  this.setState(this.state.currentEvents);
  }

  handleEventTable(evt) {
    // TODO : check if id exists in updateEntries map if so replace it else create new one.
    const field = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    // alert(JSON.stringify(field));
    const events = this.state.events.slice();
    console.log(JSON.stringify(events));
    const newevent = events.map((eventItem) => {
      for (const key in eventItem) {
        console.log('before if' + JSON.stringify(eventItem));

        console.log('zzzz:', key, field.name, key === field.name);
        console.log('zzzz:', eventItem._id, field.id, eventItem._id === field.id);
        if (key === field.name && eventItem._id === field.id) {
          eventItem[key] = field.value;
          // console.log(`XX: ${eventItem}`);
          // console.log(`YY: ${key}`);
          this.state.updateEntriesMap.set(field.id, eventItem);
          // alert(JSON.stringify(this.state.updateEntriesMap));
          // if (eventItem.fromDB) {
          // this.state.deleteEntriesMap[field.id] = eventItem;
          // }
        }
      }
      return eventItem;
    });
    // alert('new event: ', newevent);
    // console.log('state event: ', this.state.events);
    this.setState({ newEvents: newevent });
    // console.log('update map: ', this.state.updateEntriesMap);
    // console.log('delete map: ', this.state.deleteEntriesMap);
  }

  updateEvents(e) {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const updateList = [];
    // const deleteIds = Array.from(this.state.deleteEntriesMap.keys());
    Array.from(this.state.updateEntriesMap.keys()).forEach(
      (k) => updateList.push(this.state.updateEntriesMap.get(k)),
    );
    // alert('delete ids' + this.state.deleteIds);
    dispatch(eventsUpdate(this.props.auth.user.id, updateList, this.state.deleteIds)).then(() => {
    });
  }

  render() {
    const { user: currentUser } = this.props.auth;
    // this.state.events = this.props.edit.events;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    if (this.props.events && this.state.events && this.state.currentEvents) {
      console.log('In restaurant events');
      return (
        <div>
          <h2>
            Add/Update your events here
          </h2>
          <div>
            <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={this.state.events.length} pageLimit={1} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
            <EventTable
              onEventTableUpdate={this.handleEventTable.bind(this)}
              onRowAdd={this.handleAddEvent.bind(this)}
              onRowDel={this.handleRowDel.bind(this)}
              onGetList={this.handleGetList.bind(this)}
              events={this.state.currentEvents}
              filterText={this.state.filterText}
            />
          </div>
          {/* change to updateEvent */}
          <button onClick={this.updateEvents}>Update Event</button>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (state) => ({
  // console.log('in state to props - state : ', state);
  auth: state.auth,
  events: state.edit.events,
});

export default connect(mapStateToProps)(Events);
