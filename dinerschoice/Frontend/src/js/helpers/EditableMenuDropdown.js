/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class EditableMenuDropdown extends Component {
  render() {
    return (
      <td>
        <select name={this.props.cellData.type} id={this.props.cellData.id} 
          value={this.props.cellData.value} onChange={this.props.onMenuTableUpdate} defaultValue="Appetizers"
        >
          <option value="Appetizers">Appetizers</option>
          <option value="Salads">Salads</option>
          <option value="Main Course">Main Course</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverages">Beverages</option>
        </select>
      </td>
    );
  }
}

export default EditableMenuDropdown;
