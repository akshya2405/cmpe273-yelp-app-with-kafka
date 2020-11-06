/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import UserServices from '../../js/services/user.service';
import { getOrders } from '../../js/actions/getCalls';

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      orderItems: [],
      ordersAndItemsArray: [],
      appliedFilters: [],
      filteredResults: [],
    };
    // this.mapOrderItems = this.mapOrderItems.bind(this);
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
  }

  componentDidMount() {
    this.props.getOrders();
    if (this.props.edit.orders) {
      this.setState({
        ordersAndItemsArray: this.props.edit.orders,
        filteredResults: this.props.edit.orders,
      });
    }
    console.log('filtered results: ', this.state.filteredResults);
    // UserServices.getCustomerOrders().then(
    //   (response) => {
    //     // console.log('response: ', response.data);
    //     // console.log('orders: ', response.data.orders);
    //     // console.log('orderitems: ', response.data.orderItems);
    //     this.setState({
    //       orders: response.data.orders,
    //       orderItems: response.data.orderItems,
    //     });
    //     const result = this.mapOrderItems();
    //     this.setState({
    //       ordersAndItemsArray: result,
    //       filteredResults: result,
    //     });
    //   },
    //   (error) => {
    //     this.setState({
    //       filteredResults: [],
    //     });
    //   },
    // );
  }

  // mapOrderItems() {
  //   // console.log('in map items');
  //   const ordersAndItemsArray = [];
  //   if (this.state.orderItems && this.state.orders) {
  //     this.state.orders.map((order) => {
  //       const thisOrderItems = this.state.orderItems.filter((orderItem) => orderItem.orderID === order.orderID);
  //       const orderAndItems = { ...order, orderItems: thisOrderItems };
  //       ordersAndItemsArray.push(orderAndItems);
  //     });
  //     // console.log(ordersAndItemsArray);
  //   }
  //   return ordersAndItemsArray;
  // }

  filterChangeHandler(e) {
    if (e.target.checked) {
      // console.log('mode change: ', e.target.value, e.target.checked);
      this.state.appliedFilters.push(e.target.value);
    } else {
      const index = this.state.appliedFilters.indexOf(e.target.value);
      this.state.appliedFilters.splice(index, 1);
    }
    this.applyFilters();
  }

  applyFilters() {
    // console.log(JSON.stringify(this.state.appliedFilters));
    // const { modeFilters } = this.state.appliedFilters;
    let filteredResults = this.state.ordersAndItemsArray;

    filteredResults = this.filterByMode(this.state.appliedFilters, filteredResults);
    this.setState({ filteredResults });
    // console.log('Filter Results: ', filteredResults);
  }

  // eslint-disable-next-line class-methods-use-this
  filterByMode(modeFilters, results) {
    // console.log('ins: ', modeFilters, results);
    if (modeFilters && modeFilters.length && results.length) {
      const filteredResults = [];
      results.map((result) => {
        // console.log('mode filters: ', modeFilters, result, modeFilters.includes(result.deliveryStatus));
        if (result.deliveryStatus && modeFilters.length !== 0 && modeFilters.includes(result.deliveryStatus)) filteredResults.push(result);
      });
      return filteredResults;
    }
    return results;
  }

  render() {
    const { user: currentUser } = this.props.auth;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    // console.log('user: ', currentUser);

    // console.log('In customer orders');
    alert(JSON.stringify(this.state.filteredResults));

    return (
      <div>
        <div className="container">
          <table className="table">
            <tr>
              <td><b>Filter by order status: </b></td>
              <td>
                <label>
                  <input type="checkbox" value="Order Received" name="filterStatus" onChange={this.filterChangeHandler} />
                  {' '}
                  Order Received
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="Preparing" name="filterStatus" onChange={this.filterChangeHandler} />
                  {' '}
                  Preparing
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="On the way" name="filterStatus" onChange={this.filterChangeHandler} />
                  {' '}
                  On the way
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="Delivered" name="filterStatus" onChange={this.filterChangeHandler} />
                  {' '}
                  Delivered
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="Pick up Ready" name="filterStatus" onChange={this.filterChangeHandler} />
                  {' '}
                  Pick up Ready
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="Picked up" name="filterStatus" onChange={this.filterChangeHandler} />
                  {' '}
                  Picked up
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="Cancelled" name="filterStatus" onChange={this.filterChangeHandler} />
                  {' '}
                  Cancelled
                </label>
              </td>
            </tr>
          </table>
          <div>
            {
      (this.state.filteredResults.length === 0) ? (
        <div><h2>You have not ordered yet...</h2></div>
      ) : (
        // console.log(this.state.filteredResults.length),
        this.state.filteredResults.map((order) => (
          <div style={{ height: '200px' }}>
            <hr />
            <div className="custordercolumn1">
              <b>Ordered from: </b>
              {order.restName}
              <br />
              <b>Order Time: </b>
              {order.dateTime}
              <br />
              <b>Order Status: </b>
              {order.deliveryStatus}
              <br />
              <b>Delivery Type: </b>
              {order.deliveryType}
              <br />
            </div>
            <div className="custordercolumn2">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                JSON.parse(order.items).map((item) => (
                  <tr>
                    <td>{item.dishName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))
                }
                  <tr>
                    <td />
                    <td>Order Total:</td>
                    <td>{order.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      )
    }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  edit: state.edit,
});

export default connect(mapStateToProps, { getOrders })(CustomerOrders);
