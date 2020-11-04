/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import moment from 'moment';
import EditableEventCell from './EditableEventCell';
import EditableEventDate from './EditableEventDate';
import EditableEventTime from './EditableEventTime';

class EventRow extends Component {
  constructor(props) {
    super(props);
    this.getList = this.getList.bind(this);
    this.onDelEvent = this.onDelEvent.bind(this);
  }

  onDelEvent() {
    this.props.onDelEvent(this.props.events);
  }

  getList() {
    this.props.getList(this.props.events);
  }

  render() {
    return (
      <tr className="eachRow">
        <EditableEventCell
          onEventTableUpdate={this.props.onEventTableUpdate}
          cellData={{
            type: 'name',
            value: this.props.events.name,
            id: this.props.events._id,
          }}
        />
        <EditableEventCell
          onEventTableUpdate={this.props.onEventTableUpdate}
          cellData={{
            type: 'description',
            value: this.props.events.description,
            id: this.props.events._id,
          }}
        />
        <EditableEventDate
          onEventTableUpdate={this.props.onEventTableUpdate}
          cellData={{
            type: 'date',
            value: moment(this.props.events.date).format('YYYY-MM-DD'),
            id: this.props.events._id,
          }}
        />
        <EditableEventTime
          onEventTableUpdate={this.props.onEventTableUpdate}
          cellData={{
            type: 'time',
            value: this.props.events.time,
            id: this.props.events._id,
          }}
        />
        <EditableEventCell
          onEventTableUpdate={this.props.onEventTableUpdate}
          cellData={{
            type: 'location',
            value: this.props.events.location,
            id: this.props.events._id,
          }}
        />
        <EditableEventCell
          onEventTableUpdate={this.props.onEventTableUpdate}
          cellData={{
            type: 'hashtags',
            value: this.props.events.hashtags,
            id: this.props.events._id,
          }}
        />
        <td>
          <button type="button" onClick={this.getList} className="btn btn-default btn-sm">
            <span className="glyphicon glyphicon-info-sign" />
          </button>
        </td>
        <td className="del-cell">
          <button type="button" onClick={this.onDelEvent} className="btn btn-default btn-sm">
            <span className="glyphicon glyphicon-remove" />
          </button>
        </td>
      </tr>
    );
  }
}

export default EventRow;
