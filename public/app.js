var url = "https://restcountries.eu/rest/v2/all"
var mainMap = undefined
var clickedCountry = undefined
var countries = undefined

var initialize = function(){
  makeRequestREST(url)
  var countryToRestore = restore()
  render(countryToRestore)
  renderMap(countryToRestore)
  makeRequestTravelBriefing(countryToRestore)

  var findISSButton = document.getElementById("find-ISS-btn")
  findISSButton.addEventListener('click', findTheISS)

  google.maps.event.addListener(mainMap.googleMap, 'click', function (event) {
    var position = {lat: event.latLng.lat(), lng: event.latLng.lng()}
    makeRequestLandWater(position)
    var newurl = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.lat + "," + position.lng
    var request = new XMLHttpRequest()
    request.open( "GET", newurl );
    request.addEventListener( "load", function() {
      var result = JSON.parse( this.responseText )
      findCountryFromClick(result)
    })
    request.send()
  })
}

// var borderCountryPopDensity = function (country) {
//   chartCountries = []
//   for (alphaCode of country.borders) {
//     for (bordering of countries) {
//       if (bordering.alpha3Code === alphaCode) {
//           chartCountries.push(bordering)
//       }
//     }
//   }
//   chartCountries.push(country)
//   console.log(chartCountries)
//
// }

var findCountryFromClick = function (result) {
  var addressString = result.results[0].formatted_address
  countries.forEach(function (country, index){
    if (addressString.includes(country.name)) {
      var select = document.getElementById("country-select")
      index = countries.indexOf(country)
      select.options.selectedIndex = index
      var event = new Event('change')
      select.dispatchEvent(event)
    }
  })
}

var makeRequestREST = function( url ) {
  var request = new XMLHttpRequest()
  request.open( "GET", url );
  request.addEventListener( "load", function() {
    countries = JSON.parse( this.responseText )
    var countryToRestore = restore()
    if (countryToRestore === null) countryToRestore = countries[1]
    addCountriesToList(countries, countryToRestore)
  })
  request.send()
}

var makeRequestLandWater = function( position ) {
  var newurl = "https://api.onwater.io/api/v1/results/" + position.lat + "," + position.lng
  var request = new XMLHttpRequest()
  request.open( "GET", newurl );
  request.addEventListener( "load", function() {
    var result = JSON.parse( this.responseText )
    var waterWarning = document.getElementById("water-warning")
    if (result.water) alert("You've clicked water, please click on land to select a country!")
  })
  request.send()
}

var makeRequestTravelBriefing = function( country ) {
  var newurl = "https://travelbriefing.org/" + country.name + "?format=json"
  var request = new XMLHttpRequest()
  request.open( "GET", newurl );
  request.addEventListener( "load", function() {
    var result = JSON.parse( this.responseText )
    renderTravelBriefing(result)
  })
  request.send()
}

var findTheISS = function () {
  var ISSurl = "http://api.open-notify.org/iss-now.json"
  var request = new XMLHttpRequest()
  request.open( "GET", ISSurl );
  request.addEventListener( "load", function() {
    var issPosition = JSON.parse( this.responseText )
    mainMap.goToISS(issPosition)
  })
  request.send()
}

var addCountriesToList = function( countries, countryToRestore ) {
  var select = document.getElementById("country-select")
  countries.forEach( function(country, index) {
    var option = document.createElement("option")
    if (country.name === countryToRestore.name) option.selected = true
    option.innerText = country.name
    option.value = index
    select.appendChild(option)
  })
  select.addEventListener("change", function () {
    var country = countries[this.value]
    save(country)
    render(country)
    moveMap(country)
    makeRequestTravelBriefing(country)
    // borderCountryPopDensity(country)
  })
}

var render = function(country){
  var countryName = document.getElementById("name")
  countryName.innerText = "Name: " + country.name
  var countryCapital = document.getElementById("capital")
  countryCapital.innerText = "Capital: " + country.capital
  var countryPopulation = document.getElementById("population")
  countryPopulation.innerText = "Population: " + country.population

}

var renderTravelBriefing = function(country){
  var countryBriefing = document.getElementById("travel-briefing")
  countryBriefing.innerText = "Advice: " + country.advise.UA.advise
  var countryWaterSafety = document.getElementById("travel-water-safety")
  countryWaterSafety.innerText = "Drinking water: " + country.water.short
  var vaccinationsList = document.getElementById("vaccinations-list")
  vaccinationsList.innerHTML = "Vaccinations Advised: "
  for (vaccination of country.vaccinations){
  var li = document.createElement("li")
  li.innerText = vaccination.name
  vaccinationsList.appendChild(li)
  }
}

var restore = function () {
  var jsonString = localStorage.getItem("country")
  var savedCountry = JSON.parse(jsonString)
  return savedCountry
}

var save = function (country) {
  var jsonString = JSON.stringify(country)
  localStorage.setItem("country", jsonString)
}

var renderMap = function (country) {
  var mapDiv= document.getElementById('main-map')
  var center = {lat: parseFloat(country.latlng[0]), lng: parseFloat(country.latlng[1])}
  mainMap = new MapWrapper(mapDiv, center, 10)
}

var moveMap = function (country) {
  mainMap.goTo(country)
}

window.addEventListener("load", initialize)
