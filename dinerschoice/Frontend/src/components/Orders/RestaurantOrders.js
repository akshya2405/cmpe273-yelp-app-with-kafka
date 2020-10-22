/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Select, CaretIcon, ModalCloseButton } from 'react-responsive-select';

import UserServices from '../../js/services/user.service';
import 'react-responsive-select/dist/react-responsive-select.css';
import { updateOrderStatus } from '../../js/actions/add';

const setDeliveryStatus = (value) => {
  if (value === 'Delivery') {
    return [{ value: 'Order Received', text: 'Order Received' },
      { value: 'Preparing', text: 'Preparing' },
      { value: 'On the way', text: 'On the way' },
      { value: 'Delivered', text: 'Delivered' },
      { value: 'Cancelled', text: 'Cancelled' },
    ];
  }
  return [{ value: 'Order Received', text: 'Order Received' },
    { value: 'Preparing', text: 'Preparing' },
    { value: 'Pick up Ready', text: 'Pick up Ready' },
    { value: 'Picked up', text: 'Picked up' },
    { value: 'Cancelled', text: 'Cancelled' },
  ];
};

class RestaurantOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      orderItems: [],
      ordersAndItemsArray: [],
      message: '',
      appliedFilters: [],
      filteredResults: [],
    };
    this.orderStatus = [{ value: 'New Order', text: 'New Order' }, { value: 'Delivered Order', text: 'Delivered' }, { value: 'Cancelled Order', text: 'Cancel' }];
    this.mapOrderItems = this.mapOrderItems.bind(this);
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
    this.updateOrderStatus = this.updateOrderStatus.bind(this);
  }

  componentDidMount() {
    UserServices.getRestaurantOrders().then(
      (response) => {
        // console.log('response: ', response.data);
        // console.log('orders: ', response.data.orders);
        // console.log('orderitems: ', response.data.orderItems);
        this.setState({
          orders: response.data.orders,
          orderItems: response.data.orderItems,
        });
        const result = this.mapOrderItems();
        this.setState({
          ordersAndItemsArray: result,
          filteredResults: result,
        });
      },
      (error) => {
        this.setState({
          filteredResults: [],
        });
      },
    );
  }

  mapOrderItems() {
    // console.log('in map items');
    const ordersAndItemsArray = [];
    if (this.state.orderItems && this.state.orders) {
      this.state.orders.map((order) => {
        const thisOrderItems = this.state.orderItems.filter((orderItem) => orderItem.orderID === order.orderID);
        const orderAndItems = { ...order, orderItems: thisOrderItems };
        ordersAndItemsArray.push(orderAndItems);
      });
      // console.log(ordersAndItemsArray);
    }
    return ordersAndItemsArray;
  }

  orderStatusChangeHandler(order, e) {
    // console.log('in change handler', e);
    // console.log('order: ', order);
    const index = (this.state.orders.findIndex((row) => row.orderID === order.orderID));
    order.orderStatus = e.value;
    this.state.orders[index].orderStatus = e.value;
    // console.log(this.state.orders[index].orderStatus);
    this.setState({
      message: 'Please update delivery Status also...',
    });
  }

  deliveryStatusChangeHandler(order, e) {
    // console.log('in change handler', e);
    // console.log('order: ', order);
    const index = (this.state.orders.findIndex((row) => row.orderID === order.orderID));
    order.deliveryStatus = e.value;
    this.state.orders[index].deliveryStatus = e.value;
    // console.log(this.state.orders[index].deliveryStatus);
    this.setState({
      message: '',
    });
  }

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
        // console.log('mode filters: ', modeFilters, result, modeFilters.includes(result.orderStatus));
        if (result.orderStatus && modeFilters.length !== 0 && modeFilters.includes(result.orderStatus)) filteredResults.push(result);
      });
      return filteredResults;
    }
    return results;
  }

  updateOrderStatus(order) {
    const index = (this.state.orders.findIndex((row) => row.orderID === order.orderID));
    const data = {
      orderID: order.orderID,
      orderStatus: this.state.orders[index].orderStatus,
      deliveryStatus: this.state.orders[index].deliveryStatus,
    };
    if (data.orderStatus === 'Cancelled Order') {
      data.deliveryStatus === 'Cancelled';
    } else if (data.deliveryStatus === 'Picked up' || data.deliveryStatus === 'Delivered') {
      data.orderStatus = 'Delivered Order';
    }
    // console.log('data: ', data);

    const { dispatch } = this.props;

    dispatch(
      updateOrderStatus(data),
    )
      .then(() => {
        this.setState({
          success: true,
        });
        // console.log('success');
        window.location.reload();
      })
      .catch(() => {
        this.setState({
          success: false,
        });
      });
  }

  render() {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    // console.log('user: ', currentUser);

    // console.log('In restaurant orders');

    return (
      <div>
        <div className="container">
          <table className="table">
            <tr>
              <td><b>Filter by order status: </b></td>
              <td>
                <label>
                  <input type="checkbox" value="New Order" name="filterStatus" onChange={this.filterChangeHandler} />
                  {' '}
                  New Order
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="Delivered Order" name="filterStatus" onChange={this.filterChangeHandler} />
                  {' '}
                  Delivered Order
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="Cancelled Order" name="filterStatus" onChange={this.filterChangeHandler} />
                  {' '}
                  Cancelled Order
                </label>
              </td>
            </tr>
          </table>
          <div>
            {
      (this.state.filteredResults.length === 0) ? (
        <div><h2>There are no orders yet...</h2></div>
      ) : (
        // console.log(this.state.filteredResults.length),
        this.state.filteredResults.map((order) => (
          <div style={{ height: '200px' }}>
            <hr />
            <div className="ordercolumn1">
              <b>Order ID: </b>
              {order.orderID}
              <br />
              <b>Ordered By: </b>
              <Link to={{ pathname: '/profile', state: order.customerID }}>
                {order.fname}
                {' '}
                {order.lname}
              </Link>
              <br />
              <b>Order Time: </b>
              {order.dateTime}
              <br />
              <b>Delivery Type: </b>
              {order.deliveryType}
              <br />
            </div>
            <div className="ordercolumn2">
              <p style={{ color: 'red' }}>{this.state.message}</p>
              <table>
                <tr>
                  <td>Order Status:</td>
                  <td>
                    <Select
                      name="orderStatus"
                      id="orderStatus"
                      modalCloseButton={<ModalCloseButton />}
                      options={this.orderStatus}
                      selectedValue={order.orderStatus}
                      caretIcon={<CaretIcon />}
                      onChange={this.orderStatusChangeHandler.bind(this, order)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Delivery Status:
                  </td>
                  <td>
                    <Select
                      name="deliveryStatus"
                      id="deliveryStatus"
                      modalCloseButton={<ModalCloseButton />}
                      options={setDeliveryStatus(order.deliveryType)}
                      selectedValue={order.deliveryStatus}
                      caretIcon={<CaretIcon />}
                      onChange={this.deliveryStatusChangeHandler.bind(this, order)}
                    />
                  </td>
                </tr>
              </table>
              <input type="button" className="btn btn-primary btn-lg" id="UpdateOrder" name="UpdateOrder" value="Update Order Status" onClick={() => this.updateOrderStatus(order)} disabled={this.state.message} />
            </div>
            <div className="ordercolumn3">
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
                order.orderItems.map((item) => (
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
                    <td>{order.orderTotalPrice}</td>
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

function mapStateToProps(state) {
  const { user } = state.auth;
  // console.log('user: ', user);
  return {
    user,
  };
}

export default connect(mapStateToProps)(RestaurantOrders);
