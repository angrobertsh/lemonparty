export default class MarkerManager{
  constructor(map, markerClick){
    this.map = map;
    this.markers = [];
    this.markerClick = markerClick;
    this.removeOldMarkers = this.removeOldMarkers.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.addNewMarkers = this.addNewMarkers.bind(this);
    this.createMarkerFromLemon = this.createMarkerFromLemon.bind(this);
    this.stopAllBounces = this.stopAllBounces.bind(this);
    this.bounce = this.bounce.bind(this);
  }

  updateMarkers(lemons, focus){
    let lemonIds = Object.keys(lemons).map((el) => (parseInt(el)));
    if(!focus){
      this.stopAllBounces();
    }
    this.addNewMarkers(lemonIds, lemons, focus);
    this.removeOldMarkers(lemonIds);
  }

  removeOldMarkers(lemonIds){
    this.markers.filter( (marker) => !lemonIds.includes(marker.lemonId)).forEach((marker) => (this.removeMarker(marker)));
  }

  removeMarker(marker){
    const idx = this.markers.indexOf( marker );
    this.markers[idx].setMap(null);
    this.markers.splice(idx, 1);
  }

  addNewMarkers(lemonIds, lemons, focus){
    let currentLemonIds = this.markers.map((marker) => (marker.lemonId))
    lemonIds.forEach((lemonId) => {
      if(!currentLemonIds.includes(lemonId)){
        this.createMarkerFromLemon(lemons[lemonId]);
      }
    })
    if(!!focus){
      this.bounce(focus)
    }
  }

  createMarkerFromLemon(lemon){
    const pos = new google.maps.LatLng(lemon.lat, lemon.lng);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      lemonId: lemon.id,
      icon: 'http://res.cloudinary.com/dujcpxlhk/image/upload/v1496940485/r5whkdz0ingbhzk57eyx.png'
    });
    marker.setAnimation(null);
    marker.addListener('click', () => this.bounceAndClick(lemon));
    this.markers.push(marker);
  }

  bounceAndClick(lemon){
    this.markerClick(lemon);
    this.bounce(lemon);
  }

  bounce(lemon) {
    let marker = this.markers.find((marker) => lemon.id === marker.lemonId )
    if (!!marker) {
      if (marker.getAnimation() !== null) {
        this.stopAllBounces();
      } else {
        this.stopAllBounces();
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }

  stopAllBounces(){
    this.markers.forEach((marker) => marker.setAnimation(null))
  }

}
