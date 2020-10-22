import React, { Component } from 'react';
import MenuRow from './MenuRow';

class MenuTable extends Component {
  render() {
    const { onMenuTableUpdate } = this.props;
    const rowDel = this.props.onRowDel;
    const { filterText } = this.props;
    let result = [];
    // console.log(this.props.menu);
    const menuItems = this.props.menu.map(function (menuItem) {
        // console.log('item:', menuItem);
      if (menuItem.dishName.indexOf(filterText) === -1) {
        return;
      }
      return (<MenuRow onMenuTableUpdate={onMenuTableUpdate} menu={menuItem} onDelEvent={rowDel.bind(this)} key={menuItem.dishID} />);
    });
    return (
      <div>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success btn-lg pull-right">Add</button>
        <table class="table table-striped  table-responsive">
          <thead class="thead-dark">
            <tr>
              <th>Category</th>
              <th>Dish Name</th>
              <th>Description</th>
              <th>Ingredients</th>
              <th>Price</th>
              <th>Dish Image</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {menuItems}

          </tbody>

        </table>
      </div>
    );
  }
}

export default MenuTable;
