openweathermap-plugin
=====================

A wordpress plugin for displaying current conditions, current weather map, and local forecasts from http://openweathermap.org/.

function OWMsetCity($searchterm) //set the city

function OWMshowSearch() //show the search box and buttons from solsticeweather.com

function OWMshowFiveDayForecast() //show the 5-day forecast

function OWMshowFourteenDayForecast() //show the 14-day forecast

function OWMshowBasicMap() //show the current map

function OWMshowCurrentConditions() //show the current conditions

One HTML element needs to have onload="OWMinit()" or the script will never run.  The function can be called with paramters: OWMinit(useGeoIP, searchBox).
