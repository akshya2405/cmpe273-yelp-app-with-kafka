import React, { Component } from 'react';

class EditableDateCell extends Component {
  render() {
    return (
      <td>
        <input type="date" name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onEventTableUpdate} />
      </td>
    );
  }
}

export default EditableDateCell;
