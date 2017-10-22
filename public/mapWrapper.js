var MapWrapper = function(container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom

  })
  this.googleMap.setMapTypeId('hybrid')
}

MapWrapper.prototype.goTo = function (country) {
  var position = {lat: parseFloat(country.latlng[0]), lng: parseFloat(country.latlng[1])}
  this.googleMap.setCenter(position)
  this.googleMap.setZoom(7)
}

MapWrapper.prototype.goToISS = function (issPosition) {
  var position = {lat: parseFloat(issPosition.iss_position.latitude), lng: parseFloat(issPosition.iss_position.longitude)}
  this.googleMap.setCenter(position)
  this.googleMap.setZoom(8)
}

MapWrapper.prototype.addClickEvent = function () {
  var context = this
  google.maps.event.addListener(this.googleMap, 'click', function (event) {
    var position = {lat: event.latLng.lat(), lng: event.latLng.lng()}
  }.bind(this))
  return position
}

MapWrapper.prototype.addMarker = function (country) {
  var coords = {lat: parseFloat(country.latlng[0]), lng: parseFloat(country.latlng[1])}
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  })
  var infoWindow = this.createInfoWindow(coords)
    marker.addListener('click', function() {
    infoWindow.open(marker.map, marker);
  })
  this.markers.push(marker);
};

MapWrapper.prototype.createInfoWindow = function (coords) {
  var infoWindow = new google.maps.InfoWindow({
    content: "hello world"
    })
  return infoWindow
}
