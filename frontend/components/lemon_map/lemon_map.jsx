import React from 'react';
import { Link, withRouter } from 'react-router';
import LemonMarkerManager from '../../utils/lemon_marker_manager';

class LemonMap extends React.Component{

  constructor(props){
    super(props);
    this.addBoundsListener = this.addBoundsListener.bind(this);
    this.addEmptyClickListener = this.addEmptyClickListener.bind(this);
  }

  componentDidMount() {
    const mapOptions = {
      center: { lat: 37.916134, lng: -122.310768 },
      zoom: 14
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
      this.props.updateLemonForm({lat: e.latLng.lat(), lng: e.latLng.lng()});
    });
  }

  componentDidUpdate(){
    this.LemonMarkerManager.updateMarkers(this.props.lemons, this.props.focus);
  }

  render(){
    return (
      <div id='map-container' className='to-fade-in' ref={ map => this.mapNode = map }></div>
    );
  }

}

export default withRouter(LemonMap);
