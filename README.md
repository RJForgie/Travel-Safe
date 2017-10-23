# Weekend Project - Travel Safe - Country Information Web App

## The Brief

JavaScript weekend project to practice the following:
* Fetching information from an api
* Display/Analyse the information in the browser using DOM manipulation
* Using Event listeners to make the app interactive

I decided to go beyond the brief and integrate information from 4 separate APIs into the web app to provide useful information on countries for travellers.

The APIs used were:
* [RESTCountries](https://restcountries.eu)
* [Travel Briefing](https://travelbriefing.org/api)
* [On Water](https://onwater.io)
* [Open Notify](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)

## Functionality

* When the user chooses a country from the drop down menu the page displays information on that country relevant for travellers
* The Country Information is extracted from the RESTCountries API
* Safety and Health information is extracted from the Travel Briefing API
* The Google Map position will also shift to display the country using the latitude and longitude from the RESTcountries API
* User can also select a country by clicking it on the map. The app makes use of reverse geocoding to extract the latitude and longitude of the click event feed it to the Google Maps API which returned the nearest street address. The app compares the address to the list of available countries and changes the selection to the correct country that was clicked

## Future Extensions

* Integration of further APIs to add currency exchange and climate information
* Addition of charts to display more detailed country information
