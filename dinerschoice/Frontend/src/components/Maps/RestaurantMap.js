import React, {Component, Fragment} from 'react';

import {
    GoogleMap, withScriptjs,
    withGoogleMap, Marker, InfoWindow
} from "react-google-maps"

import Geocode from "react-geocode";
import equal from 'fast-deep-equal'

const center = {
    lat: 37.5449461,
    lng: -122.0372866
};

class RestaurantMap extends Component {

    static defaultProps = {
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDyyfJZ0-z7Q8GDfqg6mnZiow3Eaeq1Gxc&v=3.exp&libraries=geometry,drawing,places",
    }

    constructor(props) {
        super(props);
        this.state = {latlong: [], ready: false};
        this.initLatLongForRestaurants = this.initLatLongForRestaurants.bind(this);
    }


    CMap = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={7}
            defaultCenter={center}
        >
            {props.children}
        </GoogleMap>
    ));

    populateLatLongForRestaurant = (r) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Geocode.setApiKey("AIzaSyDyyfJZ0-z7Q8GDfqg6mnZiow3Eaeq1Gxc");
                const address = [r.streetaddress, r.city, r.state, r.zipcode].join(", ");

                Geocode.fromAddress(address).then((response) => {
                        if (response.status === 'OK') {

                            this.state.latlong.push(response.results[0].geometry.location);
                            this.setState({ready: false});
                            this.setState({ready: true});
                            resolve(response.results[0].geometry.location);
                        }
                    }
                );
            }, 1000);
        });
    }

    initLatLongForRestaurants = () => {
        this.setState({latlong: []});
        this.props.restaurantList.map((r) => {
            this.populateLatLongForRestaurant(r).then((loc) => {
                // console.log(loc);
            });
        })
    }

    componentDidMount() {
        this.setState({ready: false});
        this.initLatLongForRestaurants();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!equal(this.props, prevProps)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
            this.setState({ready: false});
            this.initLatLongForRestaurants();
        }
    }
    render() {
        this.state.latlong.length !== 0 ? console.log(this.state.latlong) : console.log('not available')

        if (this.state.ready) {

            return <div>
                <Fragment>
                <this.CMap
                    googleMapURL={this.props.googleMapURL}
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `700px`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                >
                    {!(this.state.latlong.length > 0) ? (<Marker position={center} title="my place"
                                                                 animation="BOUNCE"/>) : (this.state.latlong.map((image) => (
                        <Marker position={image} title="my place" animation="BOUNCE"/>
                    )))}

                </this.CMap>
            </Fragment>
            </div>
        } else {
            return (<div></div>);
        }

    }
}

export default RestaurantMap;