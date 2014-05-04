openweathermap-plugin
=====================

A wordpress plugin for displaying current conditions, current weather map, and local forecasts from http://openweathermap.org/.


PHP FUNCTIONS:

OWMsetCity($atts) //set the city and the units

OWMshowSearch() //show the search box and buttons from http://solsticeweather.com

OWMshowCurrentConditions() //show the current conditions

OWMshowBasicMap() //show the current map

OWMshowFiveDayForecast() //show the 5-day forecast

OWMshowFourteenDayForecast() //show the 14-day forecast

OWMinitScript($atts) //run the init script


SHORT CODES:

[OWMsetCity searchterm='Fort Myers, FL' searchtemp='imperial'] //set the city and the units

[OWMshowSearch] //show the search box and buttons from http://solsticeweather.com

[OWMshowCurrentConditions] //show the current conditions

[OWMshowBasicMap] //show the current map

[OWMshowFiveDayForecast] //show the 5-day forecast

[OWMshowFourteenDayForecast] //show the 14-day forecast

[OWMinitScript usegeoip='true' searchbox='.owm-city-search-term'] //run the init script


OWMinitScript is required or the script will never run. The function/shortcode can be called with parameters or with out.

DEFAULTS:

UseGeoIP = true;

searchBox = ".owm-city-search-term";


EXAMPLE:

[OWMsetCity   searchterm='Fort Myers, FL' searchtemp='Imperial']

[OWMshowCurrentConditions]

[OWMinitScript  useGeoIP='false']
