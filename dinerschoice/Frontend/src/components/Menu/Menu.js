/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserServices from '../../js/services/user.service';
import MenuTable from '../../js/helpers/MenuTable';
import SearchBar from '../../js/helpers/SearchBar';
import { menuUpdate } from '../../js/actions/add';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      menuFromDB: [],
      menu: [],
      updateEntriesMap: new Map(),
      deleteEntriesMap: new Map(),
    };

    this.addDish = this.addDish.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
  }

  componentDidMount() {
    // console.log('In restaurant menu did mount');
    UserServices.getMenu().then(
      (response) => {
        // console.log('response: ', response.data);
        if (!response.data || !response.data.length) {
          this.setState({
            menu: [],
            hasMenu: false,
          });
        } else {
          this.setState({
            menu: response.data,
            menuFromDB: response.data,
            restaurantID: response.data[0].restaurantID,
          });
        }
      },
      (error) => {
        this.setState({
          menu:
          (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString(),
        });
      },
    );
  }

  handleUserInput(filterText) {
    this.setState({ filterText });
  }

  handleRowDel(menuItem) {
    // TODO : check if the initial list has this id, if so add to deleteEntriesList.
    // TODO : check if the id is in the updateEntriesMap if so remove it from the map.

    if (menuItem.fromDB) {
      this.state.deleteEntriesMap.set(parseInt(menuItem.dishID), menuItem);
    }
    // console.log('check: ', this.state.updateEntriesMap.has(menuItem.dishID.toString()), typeof menuItem.dishID);
    if (this.state.updateEntriesMap.has(menuItem.dishID.toString())) {
      // console.log('Check in update map: ', menuItem.dishID);
      this.state.updateEntriesMap.delete(menuItem.dishID.toString());
    }
    const index = this.state.menu.indexOf(menuItem);
    this.state.menu.splice(index, 1);
    this.setState(this.state.menu);
  }

  handleAddEvent(evt) {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const menuItem = {
      dishID: id,
      dishName: '',
      category: '',
      description: '',
      price: 0.00,
      ingredients: '',
      imageurl: '',
      uploadedImage: {},
      restaurantID: this.state.restaurantID,
      fromDB: false,
    };
    this.state.menu.push(menuItem);
    this.setState(this.state.menu);
  }

  handleMenuTable(evt) {
    // TODO : check if id exists in updateEntries map if so replace it else create new one.
    const field = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    // console.log('Item: ', field);
    const menu = this.state.menu.slice();
    // alert(JSON.stringify(field));
    const newmenu = menu.map((menuItem) => {
      for (const key in menuItem) {
        if (field.name === 'myImages' && menuItem.dishID == field.id) {
          // alert('here');
          menuItem.uploadedImage = evt.target.files[0];
        } else if (key == field.name && menuItem.dishID == field.id) {
          menuItem[key] = field.value;
        }
        this.state.updateEntriesMap.set(field.id, menuItem);
        if (menuItem.fromDB) {
          this.state.deleteEntriesMap.set(parseInt(field.id), menuItem);
        }
      }
      // console.log('in handler' + JSON.stringify(menuItem));
      return menuItem;
    });
    // console.log('new menu: ', newmenu);
    // console.log('state menu: ', this.state.menu);
    this.setState({ newMenu: newmenu });
    // console.log('update map: ', this.state.updateEntriesMap);
    // console.log('delete map: ', this.state.deleteEntriesMap);
  }

  updateMenu(e) {
    const { dispatch, history } = this.props;
    const updateList = [];
    const deleteIds = Array.from(this.state.deleteEntriesMap.keys());
    Array.from(this.state.updateEntriesMap.keys()).forEach(
      (k) => updateList.push(this.state.updateEntriesMap.get(k)),
    );
    // console.log(`Update list: ${updateList}`);
    // console.log(`Delete keys:${deleteIds}`);
    // alert('in update menu: ' + JSON.stringify(updateList) + JSON.stringify(deleteIds));
    dispatch(
      menuUpdate(updateList, deleteIds),
    )
      .then(() => {
        this.setState({
          success: true,
        });
        // console.log('success');
        history.push('/menu');
        window.location.reload();
      })
      .catch(() => {
        this.setState({
          success: false,
        });
      });
  }

  addDish(e) {
    e.preventDefault();
    this.props.history.push('/addDish');
  }

  render() {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    if (this.state.menu) {
      // console.log('In restaurant menu profile');
      return (
        <div>
          <h2>
            Add/Update your dishes here
          </h2>
          <div>
            <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
            <MenuTable onMenuTableUpdate={this.handleMenuTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} menu={this.state.menu} filterText={this.state.filterText} />
          </div>
          <button onClick={this.updateMenu}>Update Menu</button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps, null)(Menu);
