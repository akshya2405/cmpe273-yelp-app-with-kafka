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
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import StarBasedRating from 'star-based-rating';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import UserServices from '../../js/services/user.service';
import { addReview } from '../../js/actions/add';
import CustViewMenu from '../Menu/CustViewMenu';

const getDetails = (value) => {
  // console.log('value: ', value);
  if (value) {
    // console.log('in get details', typeof value.hours);
    const hoursMap = new Map(Object.entries(value.hours));
    const details = [];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    daysOfWeek.map((day) => {
      let detail = {
        day: [day], openclose: '-', opentime: '-', closetime: '-',
      };
      if (hoursMap.has(day)) {
        const val = hoursMap.get(day);
        // console.log(hoursMap.get(day));
        detail = { day: [day], ...val };
      }
      details.push(detail);
    });
    return details.map((detail) => (
      <tr>
        <td>{detail.day}</td>
        <td>{detail.openclose}</td>
        <td>{detail.opentime}</td>
        <td>{detail.closetime}</td>
      </tr>
    ));
  }
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      rating: 3,
      review: '',
      allReviews: [],
      success: false,
      isCustView: false,
    };
    this.handleRating = this.handleRating.bind(this);
    this.reviewChangeHandler = this.reviewChangeHandler.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  componentDidMount() {
    let restID = null;
    if (this.props.location.state) {
      restID = this.props.location.state.restID;
      this.setState({
        isCustView: true,
      });
    }
    // console.log('In restaurant profile did mount', restID);

    let profile = '';

    function promise1() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          UserServices.getRestaurantProfile(restID).then(
            (response) => {
              profile = response.data,
              resolve(response);
            },
            (error) => {
              this.setState({
                profile:
                  (error.response
                    && error.response.data
                    && error.response.data.message)
                  || error.message
                  || error.toString(),
              });
            },
          );
        }, 100);
      });
    }
    // console.log('Getting reviews');
    const promise2 = (restaurantID) => UserServices.getReviews(restaurantID).then(
      (response) => {
        if (!response.data) {
          // console.log('response: ', response.data);
          this.setState({
            allReviews: [],
          });
        } else {
          // console.log('response: ', response.data);
          this.setState({
            allReviews: response.data,
          });
        }
      },
      (error) => {
        this.setState({
          allReviews:
            (error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString(),
        });
      },
    );

    promise1().then((response) => {
      this.setState({
        profile: response.data,
      });
      promise2(response.data.restaurantID);
    }).then(() => console.log('done'));
  }

  handleRating(totalStarsSelected) {
    // console.log(totalStarsSelected);
    this.setState({
      rating: totalStarsSelected,
    });
  }

  reviewChangeHandler(e) {
    this.setState({
      review: e.target.value,
    });
  }

  submitReview(e) {
    e.preventDefault();
    const data = {
      rating: this.state.rating,
      review: this.state.review,
      restaurantID: this.state.profile.restaurantID,
    };

    this.setState({
      success: false,
    });

    const { dispatch } = this.props;
    dispatch(
      addReview(data),
    )
      .then(() => {
        this.setState({
          success: true,
        });
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
    // console.log('In restaurant dashboard');
    const editLink = (currentUser.userid === this.state.profile.email) ? (
      <td>
        <h4>
          {' '}
          <Link to={{ pathname: '/editRestaurantProfile', state: this.state.profile }} className="glyphicon glyphicon-edit">
            {' '}
          </Link>
        </h4>
      </td>
    ) : (<td />);

    const newReview = (true && currentUser) ? (
      <div>
        <div>
          <h2>Add your review here: </h2>
          <StarBasedRating
            onSelectRatingStars={this.handleRating}
            totalStars={5}
            previousStarsToDisplay={this.state.rating}
          />

          <textarea id="review" name="review" rows="4" cols="50" placeholder="Add your comments here..." onChange={this.reviewChangeHandler} />
          {' '}
          <br />
          <button type="button" className="btn btn-success btn-lg" onClick={this.submitReview}>Submit Review</button>
        </div>
      </div>
    ) : (
      <div />
    );

    return (
      <div>
        {/* {redirectVar} */}
        <div className="container">
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <table>
                  <tr>
                    <td><h2>{this.state.profile.name}</h2></td>
                    <td />
                    {editLink}
                  </tr>
                </table>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="div1">
                    <table width="100%">
                      <tr>
                        <td>
                          <div className="div2">
                            <p>
                              <b>Description:</b>
                              {' '}
                              {this.state.profile.description ? this.state.profile.description : ('No description added yet')}
                            </p>
                            <p>
                              <b>Location:</b>
                              {' '}
                              {this.state.profile.streetAddress}
                              ,
                              {' '}
                              {this.state.profile.city}
                              {' '}
                              {this.state.profile.state}
                              {' '}
                              {this.state.profile.zipcode}
                            </p>
                            <p>
                              <b>Cuisine:</b>
                              {' '}
                              {this.state.profile.cuisine ? this.state.profile.cuisine : ('No cuisine added yet')}
                            </p>
                            <p>
                              <b>E-mail us @</b>
                              {' '}
                              {this.state.profile.email}
                            </p>
                            <p>
                              <b>Call us @</b>
                              {' '}
                              {this.state.profile.contactInfo ? this.state.profile.contactInfo : ('No contact added yet')}
                            </p>
                            <p>
                              <b>Services Offered:</b>
                              {' '}
                              {this.state.profile.mode ? this.state.profile.mode : ('No services added yet')}
                            </p>
                            <p>
                              <b>Status:</b>
                              {' '}
                              {this.state.profile.status ? this.state.profile.status : ('Yet to be added')}
                            </p>
                          </div>
                        </td>
                        <td>
                          <p>
                            <b> Hours:</b>
                            {' '}
                            <table className="table">
                              {' '}
                              {(this.state.profile) ? getDetails(this.state.profile) : ('No Business hours added yet')}
                            </table>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <hr size="30px" />
                  <div className="centre">
                    <Carousel containerClass="carousel-container" infinite responsive={responsive} centerMode>
                      {!(this.state.profile) ? ('Your images will be displayed here') : (this.state.profile.images.map((image) => (
                        <div>
                          <img id={image} src={image} width="350px" height="350px" />
                        </div>
                      )))}
                    </Carousel>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                <h2>Reviews</h2>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <div>
                    <h2>Reviews:</h2>
                    {
                        (this.state.allReviews.length !== 0) ? (
                          this.state.allReviews.map((review) => {
                            // console.log('in display: ', review);
                            return (
                              <div className="review">
                                <div className="review1">
                                  <p>
                                    <b>Reviewed By:</b>
                                    {' '}
                                    {review.fname}
                                    {' '}
                                    {review.lname}
                                  </p>
                                  <p>
                                    <b>Reviewed On: </b>
                                    {review.date}
                                  </p>
                                  <p>
                                    <b>Choosing Since: </b>
                                    {review.choosingSince}
                                  </p>
                                </div>
                                <div className="review2">
                                  <p>
                                    {' '}
                                    <StarBasedRating
                                      totalStars={5}
                                      previousStarsToDisplay={review.rating}
                                    />
                                  </p>
                                  <p>{review.comment === 'undefined' ? 'No comment' : review.comment}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : ((<div>No reviews yet</div>))
                      }
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            {
                this.state.isCustView ? (
                  <div>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="2">
                        <h2>Add Review</h2>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>

                          <div>
                            {newReview}
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="3">
                        <h2>View Menu and Order</h2>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body>
                          {
                    this.state.profile ? (
                      <div>
                        <CustViewMenu state={this.state.profile} history={this.props.history} />
                      </div>
                    ) : (
                      <div />
                    )
                  }
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </div>
                ) : (<div />)
                  }
          </Accordion>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(RestaurantProfile);
