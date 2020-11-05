import React, { Component } from 'react';
import {registerfor} from "../actions/add";
import StarBasedRating from 'star-based-rating';
import {Link} from "react-router-dom";

class DashWidget extends Component {

    constructor(props) {
        super(props);
        // this.redirectToRestaurant = this.redirectToRestaurant.bind(this);
    }

    // redirectToRestaurant(restID) {
    //     console.log(restID);
    //     const { dispatch, history } = this.props;
    //     history.push({
    //         pathname: '/restaurantDashboard',result.restaurantID
    //         state: { restID: restID },
    //     });
    //     window.location.reload();
    // }
  render() {
    // eslint-disable-next-line react/prop-types
    return (
      (this.props.results.map((result) => (
        <div className="dashwidget" id={result.restaurantID}>
        <table className="table-borderless table-condensed table-hover">
          <tr>
            {
              result.profileImage ? (
                <td width="200px"><img src={result.profileImage[0]} width="180px" height="180px" /></td>) : (
                <td width="200px"><img src='images/uploads/restaurant-placeholder.png' width="180px" height="180px" /></td>)
            }
            <td valign="top" align="justify">
            <div>
                                    <Link to={{ pathname: '/restaurantDashboard', state: { restID: result.id } }}>
                                        <h3>{result.name}</h3>
                                    </Link>
                                    <i>{result.description}</i><br/>
                                    <b>Cuisine</b> : <i>{result.cuisine}</i><br/>
                                    <b>Services Offered</b> : <i>{result.mode}</i><br/>
                                    <b>Location</b> : <i>{result.city},{result.state}</i><br/>
                                    <StarBasedRating
                                        totalStars={5}
                                        previousStarsToDisplay={result.stars}
                                    />
                                    <b>Review Count</b> : <i>{result.reviewcount === null?0:result.reviewcount}</i>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <br/>
                </div>
            ))));}
}

export default DashWidget;