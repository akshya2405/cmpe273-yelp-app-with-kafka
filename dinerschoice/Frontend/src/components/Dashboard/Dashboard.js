/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import LookupService from '../../js/services/lookup.service';
import DashWidget from "../../js/helpers/DashWidget";
import RestaurantMap from "../Maps/RestaurantMap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      lookupParams:{searchToken: ''},
      results: [],
      filteredresults: [],
      latlong: {},
    };
    this.filterparams = {
        modeFilters : [],
        zip: '',
        city: '',
        state: '',
    }
    this.modeChangeHandler = this.modeChangeHandler.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
  }


  componentDidMount() {
      if(this.props.location.state && this.props.location.state.lookupParams) {
        this.state.lookupParams = this.props.location.state.lookupParams;
      }
      LookupService.dashboardLookup(this.state.lookupParams)
            .then((results) => {
              this.setState({
                success: true,
                results: results.data,
                  filteredresults: results.data,
              });
              // console.log('success');
            })
            .catch((err) => {
                console.error(err);
              this.setState({
                results: [],
                  filteredresults: []
              });
            });
      }



  modeChangeHandler(e) {

      if (e.target.checked) {
          // console.log("mode change: ", e.target.value, e.target.checked)
          this.filterparams.modeFilters.push(e.target.value);
      } else {
          const index = this.filterparams.modeFilters.indexOf(e.target.value);
          this.filterparams.modeFilters.splice(index, 1);
      }
      this.applyFilters();
  }

  locationChangeHandler(e) {
      this.filterparams[e.target.id] = e.target.value;
      this.applyFilters();
  }
    isModeOverlapping = (modeString, modeFilters) => {
        return (modeString.split(",").filter(x => modeFilters.includes(x)).length > 0);
    }

    filterByZip = (zip, results) => {
      if(zip && results && results.length) {
          const filteredResults = [];
          results.map((result) => {
              if (zip && result.zipcode.toString() === zip.toString()) filteredResults.push(result);
          });
          return filteredResults;
      } else {
          return results;
      }
    }

    filterByState= (state, results) => {
        if(state && results && results.length) {
            const filteredResults = [];
            results.map((result) => {
                if (state && result.state.toLowerCase() === state.toLowerCase()) filteredResults.push(result);
            });
            return filteredResults;
        } else {
            return results;
        }
    }

    filterByCity = (city, results) => {
        if(city && results && results.length) {
            const filteredResults = [];
            results.map((result) => {
                if (city && result.city.toLowerCase() === city.toLowerCase()) filteredResults.push(result);
            });
            return filteredResults;
        }  else {
            return results;
        }
    }

    filterByMode = (modeFilters, results) => {
      if(modeFilters && modeFilters.length && results.length) {
          const filteredResults = [];
          results.map((result) => {
              if (result.mode && modeFilters.length !== 0 && this.isModeOverlapping(result.mode, modeFilters)) filteredResults.push(result);
          });
          return filteredResults;
      } else {
          return results;
      }
    }

  applyFilters() {
    // console.log(JSON.stringify(this.filterparams));
    const {modeFilters, zip, state, city} = this.filterparams;
    let filteredResults = this.state.results;

      filteredResults = this.filterByMode(modeFilters, filteredResults);
      filteredResults = this.filterByZip(zip, filteredResults);
      filteredResults = this.filterByCity(city, filteredResults);
      filteredResults = this.filterByState(state, filteredResults);
    this.setState({filteredresults: filteredResults});
    // console.log("Filter Results: ", filteredResults)
  }



  render() {
    if (this.state.results && this.state.results.length) {
      return (

          <div>
              <div className="dashcolumn1">
                  &nbsp;<h2> Filter by Services offered </h2>


                  &nbsp;   <label>
                              <input type="checkbox" value="Dine-in" name="services" onChange={this.modeChangeHandler} />
                              {' '}
                              Dine-in
                          </label><br/>
                  &nbsp;    <label>
                                  <input type="checkbox" value="Curbside pickup" name="services" onChange={this.modeChangeHandler} />
                                  {' '}
                                  Curbside pickup
                              </label><br/>
                  &nbsp;      <label>
                                  <input type="checkbox" value="Patio dine-in" name="services" onChange={this.modeChangeHandler} />
                                  {' '}
                                  Patio dine-in
                              </label><br/>
                  &nbsp;      <label>
                                  <input type="checkbox" value="Delivery" name="services" onChange={this.modeChangeHandler} />
                                  {' '}
                                  Delivery
                              </label><br/>
                  &nbsp;      <label>
                                  <input type="checkbox" value="Pick up" name="services" onChange={this.modeChangeHandler} />
                                  {' '}
                                  Pick up
                              </label><br/>
                  <hr/>
                  <div text-align = "justify-all">
                      <h2> Filter Based on Location/ Neighbourhood </h2>
                      <table className="table table-borderless">
                          <tr><td>&nbsp;City: </td><td><input id="city" type="text" onChange={this.locationChangeHandler}/></td></tr>
                          <tr><td>&nbsp;State: </td><td><input id="state" type="text" onChange={this.locationChangeHandler}/></td></tr>
                              <tr> <td>&nbsp;Zip Code: </td><td><input id="zip" type="text" onChange={this.locationChangeHandler}/></td></tr>
                      </table>
                  </div>
              </div>

            <div className="dashcolumn2"> <DashWidget results={this.state.filteredresults}></DashWidget></div>
          <div className="dashcolumn3"><h2> Map area </h2>
              <RestaurantMap restaurantList={this.state.filteredresults}></RestaurantMap>
          </div>
          </div>
      );
    }
    return (
        <h3>No results yet!!</h3>
    );
  }

}

function mapStateToProps(state) {
  console.log(state);
  const { user } = state.auth;
  return {
    user,
  };
}

// export Home Component
export default connect(mapStateToProps)(Dashboard);
