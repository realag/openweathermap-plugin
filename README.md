openweathermap-plugin
=====================

A wordpress plugin for displaying current conditions, current weather map, and local forecasts from http://openweathermap.org/.

PHP Functions:
OWMsetCity($searchArray) //set the city and the units
OWMshowSearch() //show the search box and buttons from http://solsticeweather.com
OWMshowCurrentConditions() //show the current conditions
OWMshowBasicMap() //show the current map
OWMshowFiveDayForecast() //show the 5-day forecast
OWMshowFourteenDayForecast() //show the 14-day forecast
OWMinitScript(useGeoIP, searchBox) //run the init script

Short Codes:
[OWMsetCity searchterm='Fort Myers, FL' searchtemp='imperial'] //set the city and the units
[OWMshowSearch] //show the search box and buttons from http://solsticeweather.com
[OWMshowCurrentConditions] //show the current conditions
[OWMshowBasicMap] //show the current map
[OWMshowFiveDayForecast] //show the 5-day forecast
[OWMshowFourteenDayForecast] //show the 14-day forecast
[OWMinitScript useGeoIP='true' searchBox='.owm-city-search-term'] //run the init script


One HTML element needs to have onload="OWMinit()" or the script will never run. The function can be called with parameters or with out.

Defaults:
UseGeoIP = true;
searchBox = ".owm-city-search-term";
