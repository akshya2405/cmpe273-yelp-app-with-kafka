/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import 'react-multi-carousel/lib/styles.css';
import { Select, CaretIcon, ModalCloseButton } from 'react-responsive-select';

import { placeOrder } from '../../js/actions/add';
import 'react-responsive-select/dist/react-responsive-select.css';
import Pagination from '../../js/helpers/Pagination';

let appetizers = [];
let salads = [];
let mains = [];
let desserts = [];
let beverages = [];
const cart = [];

const splitMenu = (menu) => {
  if (menu.length !== 0) {
    // console.log('splitting menu: ', menu);
    appetizers = menu.filter((dish) => dish.category.toLowerCase().includes('appetizers'));
    salads = menu.filter((dish) => dish.category.toLowerCase().includes('salads'));
    mains = menu.filter((dish) => dish.category.toLowerCase().includes('main course'));
    desserts = menu.filter((dish) => dish.category.toLowerCase().includes('desserts'));
    beverages = menu.filter((dish) => dish.category.toLowerCase().includes('beverages'));
  }
};

class CustViewMenu extends Component {
  constructor(props) {
    super(props);
    this.pageLimit = 1;
    this.state = {
      menu: [],
      quantity: {},
      hasMenu: false,
      mycart: [],
      totalPrice: 0.00,
      deliveryType: '',
      message: 'Select a delivery mode',
      currentAppetizers: [],
      currentSalads: [],
      currentMains: [],
      currentDesserts: [],
      currentBeverages: [],
    };
    this.services = [];
    this.quantityChangeHandler = this.quantityChangeHandler.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deliveryTypeChangeHandler = this.deliveryTypeChangeHandler.bind(this);
  }

  // componentDidMount() {
  //   // console.log('In restaurant menu did mount', this.props.state.restaurantID);
  //   // console.log('restID: ', this.props.state.restaurantID);
  //   UserServices.getMenu(this.props.state.id).then(
  //     (response) => {
  //       // console.log('response: ', response.data);
  //       if (!response.data) {
  //         this.setState({
  //           menu: [],
  //           hasMenu: false,
  //         });
  //       } else {
  //         this.setState({
  //           menu: response.data,
  //           hasMenu: true,
  //         });
  //       }
  //     },
  //     (error) => {
  //       this.setState({
  //         menu:
  //                       (error.response
  //                           && error.response.data
  //                           && error.response.data.message)
  //                       || error.message
  //                       || error.toString(),
  //       });
  //     },
  //   );
  //   splitMenu(this.state.menu);
  // }

  componentDidMount() {
    const { auth, dishes, profile } = this.props;
    console.log(JSON.stringify(auth));
    console.log(JSON.stringify(dishes));
    console.log(JSON.stringify(profile));
    if (dishes) {
      console.log(dishes);
      this.setState({
        menu: dishes,
      });
      // , function () { this.paginateMenu(this.state.menu); }
      // this.paginateMenu(this.state.menu);
    } else {
      this.setState({
        menu: [],
      });
    }
    splitMenu(this.state.menu);
    // alert(JSON.stringify(this.state.menu));
  }

  quantityChangeHandler(e) {
    // alert('qty value'+ e.target.value);
    this.state.quantity[e.target.id] = e.target.value;
    // alert(JSON.stringify(this.state.quantity));
  }

  addToCart(dish) {
    // console.log(dish._id);
    // console.log(this.state.quantity.get(dish._id));
    let quantity;
    // alert('quant: ' + dish._id in this.state.quantity);
    if (dish._id in this.state.quantity) {
      // alert('xxx: ' + parseInt(this.state.quantity[dish._id]));
      quantity = parseInt(this.state.quantity[dish._id]);
      // this.state.quantity[dish._id] = 1;
    } else quantity = 1;
    const price = parseFloat(dish.price) * quantity;
    //dish.price = price;
    const item = {
      dishName: dish.dishName, _id: dish._id, quantity, price: price,
    };
    const verify = (cart.filter((row) => row._id === item._id));
    if (verify.length > 0) {
      cart.splice((cart.findIndex((row) => row._id === verify[0]._id)), 1);
    }
    // console.log('item: ', item);
    cart.push(item);
    this.setState({
      mycart: cart,
    });
  }

  calculatetotal() {
    let total = 0.00;
    cart.forEach((item) => {
      total += item.price;
    });
    this.state.totalPrice = total;
    return total;
  }

  deliveryTypeChangeHandler(e) {
    // console.log('delivery type: ', e.value);
    if (e.value === '') {
      this.setState({
        deliveryType: e.value,
        message: 'Select a delivery mode',
      });
    } else {
      this.setState({
        deliveryType: e.value,
        message: '',
      });
    }
  }

  placeOrder() {
    const data = {
      items: JSON.stringify(this.state.mycart),
      restID: this.props.profile.id,
      restName: this.props.profile.name,
      fname: this.props.cust_profile.fname,
      lname: this.props.cust_profile.lname,
      custID: this.props.user.id,
      total: this.state.totalPrice,
      orderStatus: 'New Order',
      deliveryType: this.state.deliveryType,
      deliveryStatus: 'Order Received',
    };

    const { dispatch, history } = this.props;

    dispatch(
      placeOrder(data),
    )
      .then(() => {
        this.setState({
          success: true,
        });
        // console.log('success');
        history.push('/dashboard');
        window.location.reload();
      })
      .catch(() => {
        this.setState({
          success: false,
        });
      });
  }

  onPageChangedAppetizers = data => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentAppetizers = appetizers.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentAppetizers, totalPages });
  }

  onPageChangedSalads = data => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentSalads = salads.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentSalads, totalPages });
  }

  onPageChangedMains = data => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentMains = mains.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentMains, totalPages });
  }

  onPageChangedDesserts = data => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentDesserts = desserts.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentDesserts, totalPages });
  }

  onPageChangedBeverages = data => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentBeverages = beverages.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentBeverages, totalPages });
  }

  render() {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    // console.log('In menu view');
    const allowedServices = this.props.profile ? this.props.profile.mode.split(',').filter((x) => ['Delivery', 'Curbside pickup', 'Pick up'].includes(x)) : ['No modes to display'];
    const services = [{ value: '', text: 'Select' }];
    allowedServices.forEach((service) => {
      services.push({ value: service, text: service });
    });
    this.services = services;

    splitMenu(this.state.menu);

    return (
      <div>
        <div className="menucolumn1">
          <h1>
            Menu
            <span hidden={this.services.length !== 0}> (This restaurant does not support delivery or pickup)</span>
          </h1>
          <i>To add to cart, click the + icon near the dish name. To change quantity, modify the quantity and click the + icon</i>
          <h2>Appetizers</h2> {this.state.menu.length !== 0 ? (
                <Pagination totalRecords={appetizers.length} pageLimit={this.pageLimit} pageNeighbours={1}
                            onPageChanged={this.onPageChangedAppetizers}/>
          ):(<div></div>)
          }
          {
                        this.state.currentAppetizers.length !== 0 ? (
                            this.state.currentAppetizers.map((dish) => (
                            <div>
                              <table className="table">
                                <tr>
                                  {' '}
                                  {
                                  dish.imageurl
                                    ? (<td width="160px"><img src={dish.imageurl} width="150px" height="150px" /></td>) : (<td width="160px"><img width="150px" height="150px" /></td>)
                                }
                                  <td>
                                    <div>
                                      <h3>
                                        {dish.dishName}
                                        {' '}
                                        <span hidden={this.services.length === 0}>
                                          [Quantity:
                                          <input type="number" id={dish._id} name="quantity" style={{ width: '50px' }} value={this.state.quantity[dish._id]} min="1" onChange={this.quantityChangeHandler} />
                                          ]
                                          <button type="button" className="btn btn-default btn-sm" onClick={() => this.addToCart(dish)}>
                                            <span className="glyphicon glyphicon-plus-sign" />
                                          </button>
                                        </span>
                                      </h3>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <div>
                                                <p>{dish.description}</p>
                                                <p>
                                                  Ingredients :
                                                  {' '}
                                                  {dish.ingredients}
                                                </p>
                                                <p>
                                                  Price : $
                                                  {dish.price}
                                                </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          ))
                        ) : (
                          <div />
                        )
                    }
          <h2>Salads</h2>
          {this.state.menu.length !== 0 ? (
              <Pagination totalRecords={salads.length} pageLimit={this.pageLimit} pageNeighbours={1}
                          onPageChanged={this.onPageChangedSalads}/>
          ):(<div></div>)
          }
          {
                        this.state.currentSalads.length !== 0 ? (
                            this.state.currentSalads.map((dish) => (
                            <div>
                              <table className="table">
                                <tr>
                                  <td width="160px"><img src={dish.imageurl} width="150px" height="150px" /></td>
                                  <td>
                                    <div>
                                      <h3>
                                        {dish.dishName}
                                        {' '}
                                        <span hidden={this.services.length === 0}>
                                          [Quantity:
                                          <input type="number" id={dish._id} name="quantity" style={{ width: '50px' }} value={this.state.quantity[dish._id]} min="1" onChange={this.quantityChangeHandler} />
                                          ]
                                          <button type="button" className="btn btn-default btn-sm" onClick={() => this.addToCart(dish)}>
                                            <span className="glyphicon glyphicon-plus-sign" />
                                          </button>
                                        </span>
                                      </h3>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <div>
                                                <p>{dish.description}</p>
                                                <p>
                Ingredients :
                                            {' '}
                {dish.ingredients}
              </p>
                                                <p>
                Price : $
                                            {dish.price}
              </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          ))
                        ) : (
                          <div />
                        )
                    }
          <h2>Main Course</h2>
          {this.state.menu.length !== 0 ? (
              <Pagination totalRecords={mains.length} pageLimit={this.pageLimit} pageNeighbours={1}
                          onPageChanged={this.onPageChangedMains}/>
          ):(<div></div>)
          }
          {
                        this.state.currentMains.length !== 0 ? (
                            this.state.currentMains.map((dish) => (
                            <div>
                              <table className="table">
                                <tr>
                                  <td width="160px"><img src={dish.imageurl} width="150px" height="150px" /></td>
                                  <td>
                                    <div>
                                      <h3>
                                        {dish.dishName}
                                        {' '}
                                        <span hidden={this.services.length === 0}>
                                          [Quantity:
                                          <input type="number" id={dish._id} name="quantity" style={{ width: '50px' }} value={this.state.quantity[dish._id]} min="1" onChange={this.quantityChangeHandler} />
                                          ]
                                          <button type="button" className="btn btn-default btn-sm" onClick={() => this.addToCart(dish)}>
                                            <span className="glyphicon glyphicon-plus-sign" />
                                          </button>
                                        </span>
                                      </h3>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <div>
                                                <p>{dish.description}</p>
                                                <p>
                Ingredients :
                                            {' '}
                {dish.ingredients}
              </p>
                                                <p>
                Price : $
                                            {dish.price}
              </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          ))
                        ) : (
                          <div />
                        )
                    }
          <h2>Desserts</h2>
          {this.state.menu.length !== 0 ? (
              <Pagination totalRecords={desserts.length} pageLimit={this.pageLimit} pageNeighbours={1}
                          onPageChanged={this.onPageChangedDesserts}/>
          ):(<div></div>)
          }
          {
                        this.state.currentDesserts.length !== 0 ? (
                            this.state.currentDesserts.map((dish) => (
                            <div>
                              <table className="table">
                                <tr>
                                  <td width="160px"><img src={dish.imageurl} width="150px" height="150px" /></td>
                                  <td>
                                    <div>
                                      <h3>
                                        {dish.dishName}
                                        {' '}
                                        <span hidden={this.services.length === 0}>
                                          [Quantity:
                                          <input type="number" id={dish._id} name="quantity" style={{ width: '50px' }} value={this.state.quantity[dish._id]} min="1" onChange={this.quantityChangeHandler} />
                                          ]
                                          <button type="button" className="btn btn-default btn-sm" onClick={() => this.addToCart(dish)}>
                                            <span className="glyphicon glyphicon-plus-sign" />
                                          </button>
                                        </span>
                                      </h3>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <div>
                                                <p>{dish.description}</p>
                                                <p>
                Ingredients :
                                            {' '}
                {dish.ingredients}
              </p>
                                                <p>
                Price : $
                                            {dish.price}
              </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          ))
                        ) : (
                          <div />
                        )
                    }
          <h2>Beverages</h2>
          {this.state.menu.length !== 0 ? (
              <Pagination totalRecords={beverages.length} pageLimit={this.pageLimit} pageNeighbours={1}
                          onPageChanged={this.onPageChangedBeverages}/>
          ):(<div></div>)
          }
          {
                        this.state.currentBeverages.length !== 0 ? (
                            this.state.currentBeverages.map((dish) => (
                            <div>
                              <table className="table">
                                <tr>
                                  <td width="160px"><img src={dish.imageurl} width="150px" height="150px" /></td>
                                  <td>
                                    <div>
                                      <h3>
                                        {dish.dishName}
                                        {' '}
                                        <span hidden={this.services.length === 0}>
                                          [Quantity:
                                          <input type="number" id={dish._id} name="quantity" style={{ width: '50px' }} value={this.state.quantity[dish._id]} min="1" onChange={this.quantityChangeHandler} />
                                          ]
                                          <button type="button" className="btn btn-default btn-sm" onClick={() => this.addToCart(dish)}>
                                            <span className="glyphicon glyphicon-plus-sign" />
                                          </button>
                                        </span>
                                      </h3>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <div>
                                                <p>{dish.description}</p>
                                                <p>
                Ingredients :
                                            {' '}
                {dish.ingredients}
              </p>
                                                <p>
                Price : $
                                            {dish.price}
              </p>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          ))
                        ) : (
                          <div />
                        )
                    }
        </div>
        <div className="menucolumn2" hidden={this.services.length === 0}>
          <h2>My Cart</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                        cart.length !== 0 ? (
                          cart.map((item) => (
                            <tr>
                              <td>{item.dishName}</td>
                              <td>{item.quantity}</td>
                              <td>
                                $
                                {item.price.toFixed(2)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td><h2>Nothing in cart... Continue Shopping...</h2></td></tr>
                        )
                    }
              <tr>
                <td />
                <td>Total: </td>
                <td>
                  $
                  {this.calculatetotal().toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Select
              name="services"
              id="services"
              modalCloseButton={<ModalCloseButton />}
              options={this.services}
              selectedValue={this.state.deliveryType}
              caretIcon={<CaretIcon />}
              onChange={this.deliveryTypeChangeHandler}
            />
            { (this.state.message) ? (<div>{this.state.message}</div>) : (<div />)}
            <br />
            <input type="button" className="btn btn-warning btn-lg" value="Place Order" onClick={this.placeOrder} disabled={cart.length === 0 || this.state.message} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { profile } = state.edit;
  const { dishes } = state.edit;
  const { cust_profile } = state.edit;
  return {
    user,
    profile,
    dishes,
    cust_profile,
  };
}

export default connect(mapStateToProps)(CustViewMenu);
