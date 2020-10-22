/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import EditableMenuCell from './EditableMenuCell';
import EditableMenuDropdown from './EditableMenuDropdown';
import ReactUploadImageSingle from './SingleImageUpload';

class MenuRow extends Component {
  constructor(props) {
    super(props);
    this.onDelEvent = this.onDelEvent.bind(this);
  }

  onDelEvent() {
    this.props.onDelEvent(this.props.menu);
  }

  render() {
    return (
      <tr className="eachRow">
        <EditableMenuDropdown
          onMenuTableUpdate={this.props.onMenuTableUpdate}
          cellData={{
            type: 'category',
            value: this.props.menu.category,
            id: this.props.menu.dishID,
          }}
        />
        <EditableMenuCell
          onMenuTableUpdate={this.props.onMenuTableUpdate}
          cellData={{
            type: 'dishName',
            value: this.props.menu.dishName,
            id: this.props.menu.dishID,
          }}
        />
        <EditableMenuCell
          onMenuTableUpdate={this.props.onMenuTableUpdate}
          cellData={{
            type: 'description',
            value: this.props.menu.description,
            id: this.props.menu.dishID,
          }}
        />
        <EditableMenuCell
          onMenuTableUpdate={this.props.onMenuTableUpdate}
          cellData={{
            type: 'ingredients',
            value: this.props.menu.ingredients,
            id: this.props.menu.dishID,
          }}
        />
        <EditableMenuCell
          onMenuTableUpdate={this.props.onMenuTableUpdate}
          cellData={{
            type: 'price',
            value: this.props.menu.price,
            id: this.props.menu.dishID,
          }}
        />
        <td>
          {
                  this.props.menu.imageurl
                    ? (<img width="100" height="100" src={this.props.menu.imageurl} />) : (<div />)
              }
          <ReactUploadImageSingle onImageUpload={this.props.onMenuTableUpdate} id={this.props.menu.dishID} />
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

export default MenuRow;
