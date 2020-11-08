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

import { getOrders } from '../../js/actions/getCalls';
import Pagination from '../../js/helpers/Pagination';

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.pageLimit = 1;
    this.state = {
      orders: [],
      orderItems: [],
      ordersAndItemsArray: [],
      appliedFilters: [],
      filteredResults: [],
      currentResults: [],
      resultCount: 0
    };
    // this.mapOrderItems = this.mapOrderItems.bind(this);
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
  }

  componentDidMount() {
    this.props.getOrders();
    if (this.props.orders) {
      this.setState({
        ordersAndItemsArray: this.props.orders,
        filteredResults: this.props.orders,
        resultCount: this.props.orders.length
      });
    }
    console.log('filtered results: ', this.state.filteredResults);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user && this.props.orders !== prevProps.orders) {
      // alert('change in props');
      this.setState({
        ordersAndItemsArray: this.props.orders,
        filteredResults: this.props.orders,
        resultCount: this.props.orders.length
      });
    }
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
    this.setState({ filteredResults: filteredResults, resultCount: filteredResults.length }, () => {
      let totalPages = Math.ceil(filteredResults.length/ this.pageLimit);
      this.onPageChanged({
        currentPage: 1,
        totalPages: totalPages,
        pageLimit: this.pageLimit
      })
    });
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

  onPageChanged = data => {
    const { filteredResults } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentResults = filteredResults.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentResults, totalPages });
  }

  render() {
    const currentUser = this.props.user;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    // console.log('user: ', currentUser);

    // console.log('In customer orders');
    // alert(JSON.stringify(this.state.filteredResults));

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
              (this.state.resultCount > 0) ? (
                  <div className="d-flex flex-row py-4 align-items-center">
                    <Pagination totalRecords={this.state.resultCount} pageLimit={this.pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                  </div>
              ) : (<div></div>)
            }
            {
      (this.state.currentResults.length === 0) ? (
        <div><h2>No orders...</h2></div>
      ) : (
        // console.log(this.state.filteredResults.length),
        this.state.currentResults.map((order) => (
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
  user: state.auth.user,
  orders: state.edit.orders,
});

export default connect(mapStateToProps, { getOrders })(CustomerOrders);
