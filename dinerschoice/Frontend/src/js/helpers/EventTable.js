import React, { Component } from 'react';
import EventRow from './EventRow';

class EventTable extends Component {
  render() {
    const { onEventTableUpdate } = this.props;
    const list = this.props.onGetList;
    const rowDel = this.props.onRowDel;
    const { filterText } = this.props;
    const result = [];
    // console.log(this.props.events);
    const eventItems = this.props.events.map((eventItem) => {
      // console.log('item:', eventItem);
      if (eventItem.name.indexOf(filterText) === -1) {
        return;
      }
      return (<EventRow onEventTableUpdate={onEventTableUpdate} events={eventItem} onDelEvent={rowDel.bind(this)} getList={list.bind(this)} key={eventItem.eventID} />);
    });
    return (
      <div>
        <div><button type="button" onClick={this.props.onRowAdd} className="btn btn-success btn-lg pull-right">Add</button></div>
        <table className="table table-striped table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>Event Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Hashtags</th>
              <th>Registered List</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {eventItems}

          </tbody>

        </table>
      </div>
    );
  }
}

export default EventTable;
