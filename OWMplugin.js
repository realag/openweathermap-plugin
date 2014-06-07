var locationData = getLocationData();
var longitude;
var latitude;
var animationImage;
var refreshIntervalId;
var aLayersLength;

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}
function getJsonObject(apiURL) {
  		$.ajaxSetup({
		async: false
	});
	
	var globalJsonVar;
	$.getJSON(apiURL,function(json){
		globalJsonVar = json;
	});
	
	return globalJsonVar;
}
function updateOpenWeatherMapData(searchterm) {
	updateOpenWeatherMapCurrentData(searchterm);
	updateOpenWeatherMapForecastData(searchterm);
}
function updateOpenWeatherMapCurrentData(searchterm) {
	var apiCurrentURL = "http://api.openweathermap.org/data/2.5/weather?"+searchterm;
  	var currentWeatherData = getJsonObject(apiCurrentURL);
  	//console.log(apiCurrentURL);
  	var temp = (currentWeatherData.main.temp).toFixed(1); //convert from Kelvin and round
  	var setIcon = "<img src=\"http://openweathermap.org/img/w/"+currentWeatherData.weather[0].icon+".png\">";
	$('.owm-LocalTempurature').text(temp);
	$('.owm-current-icon').html(setIcon);
	$('.owm-current-desc').text(currentWeatherData.weather[0].description);
	$('.owm-city-name').text(currentWeatherData.name);
	$('.omw-country-name').text(currentWeatherData.sys.country);
	
	setLonLat(currentWeatherData.coord.lon,currentWeatherData.coord.lat);
	//console.log(currentWeatherData);
}
function updateOpenWeatherMapForecastData(searchterm) {
	var temp;
	var i = 0;
	var j = 0;
	var days = 5;
	
	if( $('.omw-fourteenday-forecast-container').length ) {
		days = 14;
	}
	
	var apiForecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily?"+searchterm+"&cnt="+days;
  	var forecastWeatherData = getJsonObject(apiForecastURL);
	//console.log(forecastWeatherData);
	//console.log(forecastWeatherData.list[0]);

	while(i < forecastWeatherData.cnt) {
		var dateStamp = forecastWeatherData.list[i].dt;
		var headingText = getWeatherDate(dateStamp);
		var icon = forecastWeatherData.list[i].weather[0].icon;
		var setIcon = "<img src=\"http://openweathermap.org/img/w/"+icon+".png\">";
		var headingArray = headingText.split(", ");
		
		j=i+1;
		headingText = headingArray[0]+"<br>"+headingArray[1]+", "+headingArray[2]+"";
		$('.owm-forecast-'+j+'-heading').html(headingText);
		$('.owm-forecast-'+j+'-icon').html(setIcon);
		$('.owm-forecast-'+j+'-text-desc').text(forecastWeatherData.list[i].weather[0].description);
		
		
		temp = (forecastWeatherData.list[i].temp.max).toFixed(1);
		$('.owm-forecast-'+j+'-temp-max').text(temp);
		
		temp = (forecastWeatherData.list[i].temp.min).toFixed(1);
		$('.owm-forecast-'+j+'-temp-min').text(temp);
		i++;
	}
}
function citySearch() {
	var searchField = $('.owm-city-search-term').val();
	var searchUnits = $('input[name="searchUnits"]:checked').val();
	
	if(searchField == '') {
		searchField = $('.owm-city-search-term').text();
	}
	if(searchUnits == undefined) {
		searchUnits = $('.owm-city-search-temp').text();
	}
	if(searchUnits == '') {
		searchUnits = 'metric';
	}
	//console.log(searchField);

	setUnits(searchUnits);
	searchTerm(searchField,searchUnits);
}
function setLonLat(lon, lat) {
		longitude = lon;
		latitude = lat;
}
function setUnits(units) {
	//set units
	if(units == "imperial") {
		$('.owm-temp-units').html('&nbsp&deg;F');
	}
	else {
  		$('.owm-temp-units').html('&nbsp&deg;C');
	}
}
function getWeatherDate(thisDate) {
	var daysOfTheWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var monthsOfTheYear = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Oct","Nov","Dec"];
	var weatherDate = new Date(thisDate*1000);
	var weatherYear = weatherDate.getYear()+1900;
	var formattedDate = daysOfTheWeek[weatherDate.getDay()]+", "+monthsOfTheYear[weatherDate.getMonth()]+", "+weatherDate.getDate()+" "+weatherYear;
	//console.log(formattedDate);
	
	return formattedDate;
}
function searchTerm(userSearchTerm,units) {
	var res = encodeURIComponent(userSearchTerm);
	var searchterm = "q="+res+"&units="+units;
	//console.log(searchterm);

	updateOpenWeatherMapData(searchterm);
}
function getLocationText() {
	//console.log(locationData);
	var locationText = locationData.city+", "+locationData.region_code;
	//console.log(locationText);
	return locationText;
}
function getLocationData() {
	var apiCurrentURL = "https://freegeoip.net/json/";
	locationData = getJsonObject(apiCurrentURL);
	setLonLat(locationData.longitude,locationData.latitude);
	//console.log(locationData);
	
	return locationData;
}
function get_my_url (bounds) {
	var res = this.map.getResolution();
	var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
	var z = this.map.getZoom();
	
	var path = z + "/" + x + "/" + y + "." + this.type +"?"+ parseInt(Math.random()*9999);
	var url = this.url;
	if (url instanceof Array) {
		url = this.selectUrl(path, url);
	}
	
	return url + this.service +"/"+ this.layername +"/"+ path;
}
function makeMap(mapsize) {
	var map;
	var aLayers;
	
	//clear div
	$( ".owm-basicMap" ).empty();
	
	var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
	var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
	var lonlat = new OpenLayers.LonLat(longitude, latitude).transform( fromProjection, toProjection);
	var zoom = 8;
	
	var maxExtent = new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508),
        restrictedExtent = maxExtent.clone(),
        maxResolution = 156543.0339;
    
    var options = {
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        units: "m",
        numZoomLevels: 18,
        maxResolution: maxResolution,
        maxExtent: maxExtent,
        restrictedExtent: restrictedExtent
    };
    map = new OpenLayers.Map('owm-basicMap', options);

    // create Google Mercator layers
    var gmap = new OpenLayers.Layer.Google(
        "Google Streets",
        {sphericalMercator: true}
    );
	 var gstreets = new OpenLayers.Layer.Google(
        "Google Physical",
        {type:google.maps.MapTypeId.TERRAIN,
        sphericalMercator: true}
    );
    var ghybrid = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type:google.maps.MapTypeId.HYBRID,
        sphericalMercator: true}
    );
    var gsatellite = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type:google.maps.MapTypeId.SATELLITE,
        sphericalMercator: true}
    );
    var mapbox = new OpenLayers.Layer.XYZ(
      'Natural Earth',
      ["http://a.tiles.mapbox.com/v3/mapbox.blue-marble-topo-bathy-jul/${z}/${x}/${y}.png"],
      {
      	sphericalMercator: true,
      	wrapDateLine: true,
      	numZoomLevels: 19,
      	isBaseLayer: true
      }
    );
    var n0q = new OpenLayers.Layer.TMS(
		'NEXRAD',
		'http://mesonet.agron.iastate.edu/cache/tile.py/',
		// Find more layer names here: http://mesonet.agron.iastate.edu/ogc/
		{
			layername      : 'nexrad-n0q-900913',
			service         : '1.0.0',
			type            : 'png',
			visibility      : false,
			opacity			 : 0.7,
			getURL          : get_my_url,
			isBaseLayer     : false
		}
    );
    var irsat = new OpenLayers.Layer.TMS(
		'GOES East IR Satellite',
		'http://mesonet.agron.iastate.edu/cache/tile.py/',
		{
			layername      : 'goes-east-ir-4km-900913',
			service         : '1.0.0',
			type            : 'png',
			visibility      : false,
			opacity			 : 0.7,
			getURL          : get_my_url,
			isBaseLayer     : false
		}
    );
    var vissat = new OpenLayers.Layer.TMS(
		'GOES East Vis Satellite',
		'http://mesonet.agron.iastate.edu/cache/tile.py/',
		{
			layername      : 'goes-east-vis-1km-900913',
			service         : '1.0.0',
			type            : 'png',
			visibility      : false,
			opacity			 : 0.7,
			getURL          : get_my_url,
			isBaseLayer     : false
		}
    );
    var aksat = new OpenLayers.Layer.TMS(
		'Alaska Vis Satellite',
		'http://mesonet.agron.iastate.edu/cache/tile.py/',
		{
			layername      : 'alaska-vis-900913',
			service         : '1.0.0',
			type            : 'png',
			visibility      : false,
			opacity			 : 0.7,
			getURL          : get_my_url,
			isBaseLayer     : false
		}
    );
    var hawaiisat = new OpenLayers.Layer.TMS(
		'Hawaii Vis Satellite',
		'http://mesonet.agron.iastate.edu/cache/tile.py/',
		{
			layername		: 'hawaii-vis-900913',
			service			: '1.0.0',
			type				: 'png',
			visibility		: false,
			opacity			: 0.7,
			getURL			: get_my_url,
			isBaseLayer		: false
		}
    );
    var clouds = new OpenLayers.Layer.XYZ(
		"Cloud Cover",
		"http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
		{
			numZoomLevels		: 19, 
			isBaseLayer			: false,
			opacity				: 0.7,
			visibility			: false,
			sphericalMercator	: true

		}
	 );
	 var precipitation = new OpenLayers.Layer.XYZ(
		"Quantity of Precipitation",
		"http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
		{
			numZoomLevels		: 19, 
			isBaseLayer			: false,
			opacity				: 0.6,
			visibility			: false,
			sphericalMercator	: true
		}
	 );
	 var radar = new OpenLayers.Layer.XYZ(
		"Radar",
		"http://${s}.tile.openweathermap.org/map/radar/${z}/${x}/${y}.png",
		{
			numZoomLevels		: 19, 
			isBaseLayer			: false,
			opacity				: 0.6,
			visibility			: false,
			sphericalMercator	: true

		}
	 );
	 var TMP_TGL_2 = new OpenLayers.Layer.XYZ(
		"Temperature",
		"http://${s}.tile.openweathermap.org/map/temp/${z}/${x}/${y}.png",
		{
			numZoomLevels		: 19, 
			isBaseLayer			: false,
			opacity				: 0.4,
			visibility			: false,
			sphericalMercator	: true
		}
	 );
	 var PRMSL_MSL_0 = new OpenLayers.Layer.XYZ(
		"Press Raster",
		"http://${s}.tile.openweathermap.org/map/pressure/${z}/${x}/${y}.png",
		{
			numZoomLevels		: 19, 
			isBaseLayer			: false,
			opacity				: 0.3,
			visibility			: false,
			sphericalMercator	: true
		}
	);
	var PRMSL_MSL_CONTOUR = new OpenLayers.Layer.XYZ(
		"Press Contour",
		"http://${s}.tile.openweathermap.org/map/pressure_cntr/${z}/${x}/${y}.png",
		{
			numZoomLevels		: 19, 
			isBaseLayer			: false,
			opacity				: 0.4,
			visibility			: false,
			sphericalMercator	: true
		}
	);
	var wind = new OpenLayers.Layer.XYZ(
		"Wind Speed",
		"http://${s}.tile.openweathermap.org/map/wind/${z}/${x}/${y}.png",
		{
			numZoomLevels		: 19, 
			isBaseLayer			: false,
			opacity				: 0.3,
			visibility			: false,
			sphericalMercator	: true
		}
	);
	var wind_dir = new OpenLayers.Layer.XYZ(
		"Wind Direction",
		"http://${s}.tile.openweathermap.org/map/WDIR_TGL_10/${z}/${x}/${y}.png",
		{
			numZoomLevels		: 19, 
			isBaseLayer			: false,
			opacity				: 0.3,
			visibility			: false,
			sphericalMercator	: true
		}
	);
	var rain = new OpenLayers.Layer.XYZ(
		"Rain Precipitation",
		"http://${s}.tile.openweathermap.org/map/rain/${z}/${x}/${y}.png",
		{
			numZoomLevels		: 19, 
			isBaseLayer			: false,
			opacity				: 0.6,
			visibility			: true,
			sphericalMercator	: true
		}
	);
	var snow = new OpenLayers.Layer.XYZ(
		"Snow Precipitation",
		"http://${s}.tile.openweathermap.org/map/snow/${z}/${x}/${y}.png",
		{
			numZoomLevels		: 19, 
			isBaseLayer			: false,
			opacity				: 0.6,
			visibility			: false,
			sphericalMercator	: true
		}
	);
	var stations = new OpenLayers.Layer.Vector.OWMStations("Weather Stations");
	var city = new OpenLayers.Layer.Vector.OWMWeather("Current Weather");
	
	stations.setVisibility(false);
	city.setVisibility(false);
	 
	if(mapsize == "big") {
		aLayers = [ghybrid, gmap, gstreets, gsatellite, mapbox, city, stations, n0q, clouds, rain, radar, snow, precipitation, TMP_TGL_2, wind, PRMSL_MSL_CONTOUR, PRMSL_MSL_0, irsat, vissat, aksat, hawaiisat];
	}
	else {
		aLayers = [ghybrid, n0q, rain, radar, clouds];
	}
	
	//console.log(aLayers);
	
	aLayersLength = aLayers.length;
	 
	map.addLayers(aLayers);
	var ls = new OpenLayers.Control.LayerSwitcher();
	map.addControl(ls);
	map.addControl(new OpenLayers.Control.MousePosition());
	if (!map.getCenter()){ map.zoomToMaxExtent(); map.setCenter( lonlat, zoom );}
	
	//console.log(map.controls);
	return map;
}
function updateMap(map) {
	var currentNumLayers = map.getNumLayers();
	for(var i=0; i<currentNumLayers; i++) {
		var currentLayer = map.layers[i];
		if(currentLayer.name != map.baseLayer.name) {
			try {
				map.layers[i].redraw(true);
				map.layers[i].refresh({force: true});
			}
			catch(err) {}
		}
		//console.log(currentLayer);
	}
	//console.log(map);
}
function startAnimateMap(map) {
	//get controls
	var controls = map.controls;
	
	//remove Controls
	var i=controls.length;
	while(i>0) {
		map.removeControl(map.controls[i]);
		i--;
	}
	
	//add some back in
	var nav = new OpenLayers.Control.Navigation();
	var zoom = new OpenLayers.Control.Zoom();
	var mousePos = new OpenLayers.Control.MousePosition();
	map.addControls([nav,zoom,mousePos]);
	
	//change link
	newHTML = '<a href="javascript:void(0)" onclick="stopAnimateMap(map)">stop animation</a>';
	$('.animateLink').html(newHTML);
	
	//add current nexrad image
	var nexrad = new Array();
	nexrad[0] = new OpenLayers.Layer.TMS(
		'NEXRAD-00',
		'http://mesonet.agron.iastate.edu/cache/tile.py/',
		{
			layername		: 'nexrad-n0q-900913',
			service			: '1.0.0',
			type				: 'png',
			visibility		: false,
			opacity			: 0.7,
			getURL			: get_my_url,
			isBaseLayer		: false
		}
    );
    
    var j =1;
    //add nexrad images
    for(var i=5; i<=50; i=i+5) {
    	var iPadded = pad(i,2);
		nexrad[j] = new OpenLayers.Layer.TMS(
			'NEXRAD-'+iPadded,
			'http://mesonet.agron.iastate.edu/cache/tile.py/',
			{
				layername		: 'nexrad-n0q-900913-m'+iPadded+'m',
				service			: '1.0.0',
				type				: 'png',
				visibility		: false,
				opacity			: 0.7,
				getURL			: get_my_url,
				isBaseLayer		: false
			}
	    );
	    j++;
    }
    map.addLayers(nexrad);
    //console.log(map);
    
    //animate nexrad images
    animationImage = 0;
    hideLayers(map);
    refreshIntervalId = setInterval(function(){
			animationImage = animationImage-5;
			if(animationImage<0) {
				animationImage = 50;
			}
		   animateMap(map,animationImage);
	 }, 5000);
}
function animateMap(map, imgNum) {
	var activeLayerName = 'NEXRAD-'+pad(imgNum,2);
	var i = showLayer(map, activeLayerName);
	
	hideLayer(map, imgNum, i);
}
function showLayer(map, activeLayerName) {
	var currentNumLayers = map.getNumLayers()-1;
	var i = 0;
	while(currentNumLayers>=0) {
		var currentLayer = map.layers[currentNumLayers];
		if(currentLayer.name == activeLayerName) {
			//console.log(currentLayer.name);
			i = currentNumLayers;
			currentLayer.setVisibility(true);
		}
		currentNumLayers--;
	}
	return i;
}
function hideLayer(map, imgNum, i) {
	//console.log(map);
	i++;
	if(imgNum >= 50) {
		i = i - 11;
	}
	
	var currentLayer = map.layers[i];
	//console.log(currentLayer.name);
	currentLayer.setVisibility(false);
}
function hideLayers(map) {
	//console.log(map);
	var currentNumLayers = map.getNumLayers()-1;
	while(currentNumLayers>=0) {
		var currentLayer = map.layers[currentNumLayers];
		if(currentLayer.isBaseLayer == false) {
			currentLayer.setVisibility(false);
		}
		currentNumLayers--;
	}
}
function stopAnimateMap(map) {
	//stop animation loop
	clearInterval(refreshIntervalId);
	
	//remove animation layers
	var currentNumLayers = map.getNumLayers();
	//console.log(map);
	currentNumLayers--;
	var mapLayers = map.layers;
	for(var i=currentNumLayers; i>=aLayersLength; i--) {
		var currentLayer = mapLayers[i];
		//console.log(map.layers.length);
		map.removeLayer(currentLayer);
	}
	//console.log(map.layers.length);
	
	showLayer(map, 'Rain Precipitation');
	
	//change link
	newHTML = '<a href="javascript:void(0)" onclick="startAnimateMap(map)">animate Nexrad</a>';
	$('.animateLink').html(newHTML);
	
	//add LayerSwitcher back in
	var ls = new OpenLayers.Control.LayerSwitcher();
	map.addControl(ls);
	
	//console.log(map.controls);
	
	updateMap(map);
}