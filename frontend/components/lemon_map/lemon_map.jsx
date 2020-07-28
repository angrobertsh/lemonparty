import React from 'react';
import { Link, withRouter } from 'react-router';
import LemonMarkerManager from '../../utils/lemon_marker_manager';
import merge from 'lodash/merge';

class LemonMap extends React.Component{

  constructor(props){
    super(props);
    this.addBoundsListener = this.addBoundsListener.bind(this);
    this.addEmptyClickListener = this.addEmptyClickListener.bind(this);
  }

  componentDidMount() {
    const mapOptions = {
      center: { lat: 37.916775, lng: -122.302917 },
      zoom: 15
    }

    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.LemonMarkerManager = new LemonMarkerManager(this.map, this.props.setFocus);
    this.LemonMarkerManager.updateMarkers(this.props.lemons, this.props.focus);
    this.mapNode.classList.add("fade-in");
    this.addBoundsListener();
    this.addEmptyClickListener();
  }

  addBoundsListener(){
    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west } };
      this.props.updateLemonFilter("bounds", bounds)
    });
  }

  addEmptyClickListener(){
    google.maps.event.addListener(this.map, 'click', (e) => {
      let lemons;

      if (this.props.formOpen) {
        this.props.updateLemonForm({lat: e.latLng.lat(), lng: e.latLng.lng()});

        let fakeTree = { [-1]: (merge({}, this.props.form, {
          tree: "FAKE", id: -1, lat: e.latLng.lat(), lng: e.latLng.lng(), edit: !!this.props.form.id}
        )) };
        lemons = merge({}, this.props.lemons, fakeTree)
      } else {
        lemons = this.props.lemons;
      }
      this.LemonMarkerManager.updateMarkers(lemons, this.props.focus);
    });
  }

  componentDidUpdate(){
    let lemons;

    if (this.props.formOpen) {
      let fakeTree = { [-1]: (merge({}, this.props.form, {tree: "FAKE", id: -1})) };
      lemons = merge({}, this.props.lemons, fakeTree)
    } else {
      lemons = this.props.lemons;
    }

    this.LemonMarkerManager.updateMarkers(lemons, this.props.focus);
  }

  render(){
    return (
      <div id='map-container-container'>
        <div id='map-container' className='to-fade-in-slower' ref={ map => this.mapNode = map }></div>
      </div>
    );
  }

}

export default withRouter(LemonMap);
