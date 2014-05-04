openweathermap-plugin
=====================

A wordpress plugin for displaying current conditions, current weather map, and local forecasts from http://openweathermap.org/.

PHP Functions:

OWMsetCity($searchterm) //set the city
OWMshowSearch() //show the search box and buttons from http://solsticeweather.com
OWMshowFiveDayForecast() //show the 5-day forecast
OWMshowFourteenDayForecast() //show the 14-day forecast
OWMshowBasicMap() //show the current map
OWMshowCurrentConditions() //show the current conditions


One HTML element needs to have onload="OWMinit()" or the script will never run. The function can be called with parameters or with out.

Defaults:
UseGeoIP = true;
searchBox = ".owm-city-search-term";
onload="OWMinit(useGeoIP, searchBox)"
