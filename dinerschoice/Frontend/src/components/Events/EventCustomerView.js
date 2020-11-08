/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import moment from "moment";

import { registerfor } from '../../js/actions/add'; // add this to actions/add
import '../../App.css';
import { getCustomerEvents } from '../../js/actions/getCalls';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      registeredEvents: [],
      inputValue: '',
      searchedEvents: [],
    };
    this.register = this.register.bind(this);
    this.findEvent = this.findEvent.bind(this);
    this.sortedEvents = this.sortedEvents.bind(this);
  }

  componentDidMount() {
    console.log('In upcoming event did mount');
    const { dispatch } = this.props;
    let list = [];
    if (this.props.registeredEvents) {
      list = this.props.registeredEvents;
    }
    dispatch(getCustomerEvents(list)).then(() => {
      if (this.props.events) {
        // alert('events available');
        this.setState({
          events: this.props.events.allEvents,
          registeredEvents: this.props.events.registeredEvents,
        // currentEvents: this.props.events,
        });
      } else {
        this.setState({
          events: [],
          // currentEvents: [],
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.events && this.props.events !== prevProps.events) {
      // alert('change in props');
      this.setState({
        events: this.props.events.allEvents,
        registeredEvents: this.props.events.registeredEvents,
      });
    }
  }

  sortedEvents(e) {
    const events = this.state.events;
    let sorted;
    // alert(e.currentTarget.id);
    if (e.currentTarget.id === 'desc') {
      sorted = events.sort((a, b) => {
        console.log('b ', b.date);
        console.log('a ', a.date);
        return moment(b.date).diff(moment(a.date));
      });
      console.log(sorted);
      this.setState({
        events: sorted,
      });
    } else {
      sorted = events.sort((a, b) => {
        console.log('b ', b.date);
        console.log('a ', a.date);
        return moment(a.date).diff(moment(b.date));
      });
      console.log(sorted);
      this.setState({
        events: sorted,
      });
    }
  }

  register(e) {
    console.log(e._id);
    // const { dispatch } = this.props;
    if (this.state.registeredEvents.some((event) => event._id === e._id)) alert('You have already registered for this event');
    else {
      let regList;
      const { id } = this.props.user;
      const { fname, lname } = this.props.cust_profile;
      regList = { id, fname, lname };
      this.props.dispatch(
        registerfor(e, regList),
      )
        .then(() => {
          // console.log('success');
          window.location.reload();
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }

  findEvent(e) {
    this.setState({
      inputValue: e.target.value,
    });
    const result = this.state.events.filter((event) => event.name.toLowerCase().includes(e.target.value.toLowerCase()));
    this.setState({
      searchedEvents: result,
      searchdone: true,
    });
  }

  render() {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <div>
          <div className="column1">
            <h2>Upcoming Events</h2>
            <button type="button" id="desc" className="btn btn-default btn-sm" onClick={this.sortedEvents}>
              <span className="glyphicon glyphicon-sort" />
              Descending
            </button>
            <button type="button" id="asc" className="btn btn-default btn-sm" onClick={this.sortedEvents}>
              <span className="glyphicon glyphicon-sort" />
              Ascending
            </button>
            <hr />
            {(this.state.events.length !== 0)
              ? this.state.events.map((event) => (
                <div>
                  <div className="upcoming">
                    <h3>{event.name}</h3>
                    <table width="100%">
                      <tr>
                        <td>
                          <div>
                            <p>{event.description}</p>
                            <p>
                              At :
                              {event.location}
                            </p>
                            <p>
                              On:
                              {' '}
                              {moment(event.date).format('YYYY-MM-DD')}
                              {' '}
                              @
                              {event.time}
                            </p>
                          </div>
                        </td>
                        <td align="right"><input type="button" value="Register" onClick={() => this.register(event)} /></td>
                      </tr>
                    </table>
                  </div>
                </div>
              )) : (
                <div>
                  {' '}
                  <h2>There are no upcoming events</h2>
                  {' '}
                </div>
              )}
          </div>
          <div className="column2">
            <h2> Registered events </h2>
            <hr />
            {console.log(this.state.registeredEvents.length)}
            {(this.state.registeredEvents.length !== 0)
              ? this.state.registeredEvents.map((event) => (
                <div>
                  <div className="upcoming">
                    <h3>{event.name}</h3>
                    <table width="100%">
                      <tr>
                        <td>
                          <div>
                            <p>{event.description}</p>
                            <p>
                              At :
                              {event.location}
                            </p>
                            <p>
                              On:
                              {' '}
                              {moment(event.date).format('YYYY-MM-DD')}
                              {' '}
                              @
                              {event.time}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              )) : (
                <div>
                  {' '}
                  <h2>You have not registered for any event</h2>
                  {' '}
                </div>
              )}
          </div>
        </div>
        <div>
          <h4>Search for events here</h4>
          <div className="search">
            <input type="text" value={this.state.inputValue} name="search" onChange={this.findEvent} placeholder="Search by event name" />
          </div>
        </div>
        {
            ((this.state.searchedEvents.length !== 0)) ? (
              this.state.searchedEvents.map((result) => (
                <div>
                  <div className="upcoming">
                    <h3>{result.name}</h3>
                    <table width="100%">
                      <tr>
                        <td>
                          <div>
                            <p>{result.description}</p>
                            <p>
                              At :
                              {result.location}
                            </p>
                            <p>
                              On:
                              {result.date}
                              {' '}
                              @
                              {result.time}
                            </p>
                          </div>
                        </td>
                        <td align="right"><input type="button" value="Register" onClick={() => this.register(result._id)} /></td>
                      </tr>
                    </table>
                  </div>
                </div>
              ))) : (
                <div>
                  <h4 style={{ fontStyle: 'italic' }}>No events found</h4>
                </div>
            )
              }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { registeredEvents } = state.edit.cust_profile;
  const { events } = state.edit;
  const { cust_profile } = state.edit;
  return {
    user,
    registeredEvents,
    events,
    cust_profile,
  };
}

export default connect(mapStateToProps, null)(Events);
