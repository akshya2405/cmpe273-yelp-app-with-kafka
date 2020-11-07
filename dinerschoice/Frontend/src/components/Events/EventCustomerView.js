/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import UserServices from '../../js/services/user.service';
import EventTable from '../../js/helpers/EventTable';
import SearchBar from '../../js/helpers/SearchBar';
import { registerfor } from '../../js/actions/add'; // add this to actions/add
import '../../App.css';

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
  }

  componentDidMount() {
    // console.log('In upcoming event did mount');
    UserServices.getUpcomingEvents().then( // add this to userservices
      (response) => {
        // console.log('response: ', response.data);
        if (!response.data) {
          this.setState({
            events: [],
            hasMenu: false,
          });
        } else {
          this.setState({
            events: response.data,
          });
        }
      },
      (error) => {
        this.setState({
          events:
                        (error.response
                            && error.response.data
                            && error.response.data.message)
                        || error.message
                        || error.toString(),
        });
      },
    );

    UserServices.getRegisteredEvents().then(
      (response) => {
        // console.log('response: ', response.data);
        if (!response.data) {
          this.setState({
            registeredEvents: [],
          });
        } else {
          this.setState({
            registeredEvents: response.data,
          });
        }
      },
      (error) => {
        this.setState({
          registeredEvents:
                        (error.response
                            && error.response.data
                            && error.response.data.message)
                        || error.message
                        || error.toString(),
        });
      },
    );
  }

  register(e) {
    // console.log(e);
    // const { dispatch } = this.props;
    if (this.state.registeredEvents.some((event) => event.eventID === e)) alert('You have already registered for this event');
    else {
      this.props.dispatch(
        registerfor(e),
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
                              {event.date}
                              {' '}
                              @
                              {event.time}
                            </p>
                          </div>
                        </td>
                        <td align="right"><input type="button" value="Register" onClick={() => this.register(event.eventID)} /></td>
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
                              {event.date}
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
                        <td align="right"><input type="button" value="Register" onClick={() => this.register(result.eventID)} /></td>
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
  return {
    user,
  };
}

export default connect(mapStateToProps, null)(Events);
