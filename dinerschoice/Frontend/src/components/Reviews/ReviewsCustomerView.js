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
import StarBasedRating from 'star-based-rating';

import UserServices from '../../js/services/user.service';

class ReviewsCustomerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
        };
    }

    componentDidMount() {
        UserServices.getCustomerReviews().then(
            (response) => {
                // console.log('response: ', response);
                this.setState({
                    reviews: response.data,
                });
            },
            (error) => {
                this.setState({
                    reviews: [],
                });
            },
        );
    }

    render() {
        const { user: currentUser } = this.props;
        if (!currentUser) {
            return <Redirect to="/login" />;
        }
        // console.log('user: ', currentUser);

        // console.log('In customer reviews');
        return (
            <div>
                <div className="container">
                    <table>
                        <tr>
                            <td><h2>My Reviews</h2></td>
                        </tr>
                    </table>
                    {
                        (this.state.reviews && this.state.reviews.length) ? (
                            this.state.reviews.map((review) => {
                                // console.log('in display: ', review);
                                return (
                                    <div className="review">
                                        <div className="review1">
                                            <p>
                                                <b>Reviewed For:</b>
                                                {' '}
                                                {review.restName}
                                            </p>
                                            <p>
                                                <b>Reviewed On: </b>
                                                {review.date}
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

export default connect(mapStateToProps)(ReviewsCustomerView);