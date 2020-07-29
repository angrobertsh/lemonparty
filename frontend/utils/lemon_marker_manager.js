export default class LemonMarkerManager{
  constructor(map, markerClick){
    this.map = map;
    this.markers = [];
    this.markerClick = markerClick;
    this.removeOldMarkers = this.removeOldMarkers.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.stopAllBounces = this.stopAllBounces.bind(this);
    this.addNewMarkers = this.addNewMarkers.bind(this);
    this.createMarkerFromLemon = this.createMarkerFromLemon.bind(this);
    this.bounce = this.bounce.bind(this);
  }

  updateMarkers(lemons, focus, updateLemon = null){
    let lemonIds = Object.keys(lemons).map((el) => (parseInt(el)));

    if(lemonIds.includes(-1)){
      this.removeNewMarker(lemons);
    }

    if (updateLemon) {
      const lemonInfo = updateLemon[Object.keys(updateLemon)[0]]

      this.markers.filter((marker) => marker.lemonId === parseInt(lemonInfo.id)).forEach(marker => {
        const newLatLng = new google.maps.LatLng(lemonInfo.lat, lemonInfo.lng);
        marker.setPosition(newLatLng)
      })
    }

    this.addNewMarkers(lemonIds, lemons, focus);
    this.removeOldMarkers(lemonIds);

    if(!lemonIds.includes(-1) && !!focus){
      this.stopAllBounces(focus.id);
      this.bounce(focus);
    } else {
      this.stopAllBounces();
    }
  }

  removeNewMarker(lemons){
    this.markers.filter((marker) => marker.lemonId === -1).forEach((marker) => {
      if (lemons[-1].lat !== marker.position.lat() && lemons[-1].lng !== marker.position.lng()){
        this.removeMarker(marker)
      }
    })
  }

  removeOldMarkers(lemonIds){
    this.markers.filter(
      (marker) => !lemonIds.includes(marker.lemonId)
    ).forEach((marker) => (this.removeMarker(marker)));
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
  }

  createMarkerFromLemon(lemon){
    let icon;
    if (lemon.tree === "Lemon") {
      icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_25/v1592092413/Lemons/hiclipart.com_2.png'
    } else if (lemon.tree === "Lime") {
      icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092399/Lemons/hiclipart.com_6.png'
    } else if (lemon.tree === "Orange") {
      icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_32/v1592092400/Lemons/hiclipart.com_4.png'
    } else if (lemon.tree === "FAKE") {
      icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,w_30/v1595193266/Lemons/newwhiteback.png'
    } else if (lemon.tree === "REAL") {
      icon = 'https://res.cloudinary.com/dujcpxlhk/image/upload/c_scale,h_41/v1595824487/Lemons/Screen_Shot_2020-07-26_at_9.29.31_PM.png'
    }

    const pos = new google.maps.LatLng(lemon.lat, lemon.lng);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      lemonId: lemon.id,
      icon: icon
    });
    marker.setAnimation(null);
    if (marker.lemonId !== -1) {
      marker.addListener('click', () => {
        this.markerClick(lemon)
      });
    }
    this.markers.push(marker);
  }

  bounce(lemon) {
    let marker = this.markers.find((marker) => lemon.id === marker.lemonId )
    if (!!marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  stopAllBounces(lemonId = null){
    let markers = this.markers;

    if (lemonId) {
      markers = markers.filter(marker => marker.lemonId !== lemonId)
    }

    markers.forEach((marker) => {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null)
      }
    })
  }

}
