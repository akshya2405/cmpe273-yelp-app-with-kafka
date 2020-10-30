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
import ReactPaginate from 'react-paginate';

import { getRestaurantProfile } from '../../js/actions/getCalls';
import { addReview } from '../../js/actions/add';
import CustViewMenu from '../Menu/CustViewMenu';

const getDetails = (value) => {
  console.log('value: ', value);
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
      offset: 0,
      perPage: 5,
      currentPage: 0,
    };
    this.handleRating = this.handleRating.bind(this);
    this.reviewChangeHandler = this.reviewChangeHandler.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.paginateReviews = this.paginateReviews.bind(this);
  }

  componentDidMount() {
    let restID = null;
    if (this.props.location.state) {
      restID = this.props.location.state.restID;
      this.setState({
        isCustView: true,
      });
    } else {
      restID = localStorage.getItem('id');
    }
    console.log("getting details");
    this.props.getRestaurantProfile(restID);
    if (this.props.edit.profile) { this.paginateReviews(this.props.edit.profile); }
  }

  paginateReviews(profile) {
    const data = profile.reviews;
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
    const postData = slice.map((review) => <React.Fragment>
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
            <StarBasedRating
              totalStars={5}
              previousStarsToDisplay={review.rating}
            />
          </p>
          <p>{review.comment === 'undefined' ? 'No comment' : review.comment}</p>
        </div>
      </div>
    </React.Fragment>);

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      postData,
    });
  }

  handlePageClick(e) {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.paginateReviews(this.props.edit.profile);
    });
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

    this.props.addReview(data);
  }

  render() {
    const { auth, edit } = this.props;
    console.log('auth', auth);
    console.log('edit', edit);
    console.log('edit.profile :', edit.profile && edit.profile.profile.email);

    if (!auth.user) {
      return <Redirect to="/login" />;
    }
    const editLink = (!this.state.isCustView) ? (
      <td>
        <h4>
          {' '}
          <Link to={{ pathname: '/editRestaurantProfile', state: edit.profile }} className="glyphicon glyphicon-edit">
            {' '}
          </Link>
        </h4>
      </td>
    ) : (<td />);

    const newReview = (true && auth.user) ? (
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
                  <thead>
                  <tr>
                    <td><h2>{edit.profile && edit.profile.profile.name}</h2></td>
                    <td />
                    {editLink}
                  </tr>
                  </thead>
                </table>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="div1">
                    <table width="100%">
                      <tbody>
                      <tr>
                        <td>
                          <div className="div2">
                            <p>
                              <b>Description:</b>
                              {' '}
                              {edit.profile && edit.profile.profile.description ? edit.profile.profile.description : ('No description added yet')}
                            </p>
                            <p>
                              <b>Location:</b>
                              {' '}
                              {edit.profile && edit.profile.profile.streetAddress}
                              ,
                              {' '}
                              {edit.profile && edit.profile.profile.city}
                              {' '}
                              {edit.profile && edit.profile.profile.state}
                              {' '}
                              {edit.profile && edit.profile.profile.zipcode}
                            </p>
                            <p>
                              <b>Cuisine:</b>
                              {' '}
                              {edit.profile && edit.profile.profile.cuisine ? edit.profile.profile.cuisine : ('No cuisine added yet')}
                            </p>
                            <p>
                              <b>E-mail us @</b>
                              {' '}
                              {edit.profile && edit.profile.profile.email}
                            </p>
                            <p>
                              <b>Call us @</b>
                              {' '}
                              {edit.profile && edit.profile.profile.contactInfo ? edit.profile.profile.contactInfo : ('No contact added yet')}
                            </p>
                            <p>
                              <b>Services Offered:</b>
                              {' '}
                              {edit.profile && edit.profile.profile.mode ? edit.profile.profile.mode : ('No services added yet')}
                            </p>
                            <p>
                              <b>Status:</b>
                              {' '}
                              {edit.profile && edit.profile.profile.status ? edit.profile.profile.status : ('Yet to be added')}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <b> Hours: </b>
                            <table className="table">
                              {(edit.profile && edit.profile.profile.hours) ? getDetails(edit.profile.profile) : ('No Business hours added yet')}
                            </table>
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr size="30px" />
                  <div className="centre">
                    <Carousel containerClass="carousel-container" infinite responsive={responsive} centerMode>
                      {!(edit.profile && edit.profile.profile.images) ? ('Your images will be displayed here') : (edit.profile.profile.images.map((image) => (
                        <div>
                          <img id={image} src={image} alt="Restaurant Profile" width="350px" height="350px" />
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
                    {this.state.postData ? (this.state.postData,
                      <ReactPaginate
                        previousLabel="prev"
                        nextLabel="next"
                        breakLabel="..."
                        breakClassName="break-me"
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName="pagination"
                        subContainerClassName="pages pagination"
                        activeClassName="active"
                      />
                    ) : ('No reviews yet')}
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
                    edit.profile ? (
                      <div>
                        <CustViewMenu state={edit.profile.profile.dishes} history={this.props.history} />
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

const mapStateToProps = (state) => ({
  // console.log('in state to props - state : ', state);
  auth: state.auth,
  edit: state.edit,
});

export default connect(mapStateToProps, { addReview, getRestaurantProfile })(RestaurantProfile);
