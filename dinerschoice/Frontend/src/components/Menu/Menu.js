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
    this.updateMenu = this.updateMenu.bind(this);
  }

  componentDidMount() {
    const { auth, edit } = this.props;
    console.log(JSON.stringify(auth));
    console.log(JSON.stringify(edit));
    if (edit.dishes) {
      console.log(edit.dishes);
      this.setState({
        menu: edit.dishes,
      });
    } else {
      this.setState({
        menu: [],
      });
    }
  }

  handleUserInput(filterText) {
    this.setState({ filterText });
  }

  handleRowDel(menuItem) {
    // TODO : check if the initial list has this id, if so add to deleteEntriesList.
    // TODO : check if the id is in the updateEntriesMap if so remove it from the map.
    // if (menuItem.fromDB) {
    //   alert(menuItem._id);
    this.state.deleteEntriesMap.set(menuItem._id, menuItem);
    // }
    // console.log('check: ', this.state.updateEntriesMap.has(menuItem._id.toString()), typeof menuItem._id);
    if (this.state.updateEntriesMap.has(menuItem._id.toString())) {
      // console.log('Check in update map: ', menuItem._id);
      this.state.updateEntriesMap.delete(menuItem._id.toString());
    }
    const index = this.state.menu.indexOf(menuItem);
    this.state.menu.splice(index, 1);
    this.setState(this.state.menu);
  }

  handleAddEvent(evt) {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const menuItem = {
      _id: id,
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
    // alert(JSON.stringify(menu) + "\n fieldid: " + field.id + field.name);
    const newmenu = menu.map((menuItem) => {
      for (const key in menuItem) {
        if (field.name === 'myImages' && menuItem._id == field.id) {
          // alert('here');
          menuItem.uploadedImage = evt.target.files[0];
        } else if (key == field.name && menuItem._id == field.id) {
          menuItem[key] = field.value;
        }
        this.state.updateEntriesMap.set(field.id, menuItem);
        if (menuItem.fromDB) {
          this.state.deleteEntriesMap.set(field.id, menuItem);
        }
      }
      // alert(JSON.stringify(this.state.deleteEntriesMap));
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
    console.log(`Update list: ${updateList}`);
    console.log(`Delete keys:${deleteIds}`);
    // alert('in update menu: ' + JSON.stringify(updateList) + JSON.stringify(deleteIds));
    dispatch(
      menuUpdate(this.props.auth.user.id, updateList, deleteIds),
    )
      .then(() => {
        this.setState({
          success: true,
          updateEntriesMap: new Map(),
          deleteEntriesMap: new Map(),
        });
      }).catch(() => {
        this.setState({
          success: false,
        });
      });
  }

  render() {
    const { user: currentUser } = this.props.auth;
    // const { edit } = this.props.edit;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    // alert(this.state.menu);
    if (this.state.menu) {
      console.log('In restaurant menu profile');
      return (
        <div>
          <h2>
            Add/Update your dishes here
          </h2>
          <div>
            <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
            <MenuTable
              onMenuTableUpdate={this.handleMenuTable.bind(this)}
              onRowAdd={this.handleAddEvent.bind(this)}
              onRowDel={this.handleRowDel.bind(this)}
              menu={this.state.menu}
              filterText={this.state.filterText}
            />
          </div>
          <button type="button" onClick={this.updateMenu}>Update Menu</button>
        </div>
      );
    }
    return (<div />);
  }
}

const mapStateToProps = (state) => ({
  // console.log('in state to props - state : ', state);
  auth: state.auth,
  edit: state.edit,
});

export default connect(mapStateToProps, null)(Menu);