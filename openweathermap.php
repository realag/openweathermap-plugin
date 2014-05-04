<?php 
/*
Plugin Name: Open Weather Map
Plugin URI: http://www.solsticeweather.com
Description: Plugin for displaying current conditions, current weather map, and local forecasts from http://openweathermap.org/.
Author: Joshua Rising
Version: 1.0
Author URI: http://www.solsticeweather.com
*/

add_action('init','OWMLoadJavascript');

function OWMLoadJavascript() {
	wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js');
	wp_register_script( 'openlayers', 'http://openlayers.org/api/2.13/OpenLayers.js');
	wp_register_script( 'openweathermap', 'http://openweathermap.org/js/OWM.OpenLayers.1.3.6.js');
	wp_register_script( 'googlemaps', 'http://maps.google.com/maps/api/js?v=3.2&sensor=false');
	
	wp_enqueue_script('jquery');
	wp_enqueue_script('openlayers');
	wp_enqueue_script('openweathermap');
	wp_enqueue_script('googlemaps');
	wp_enqueue_script('OWMplugin-js',plugin_dir_url( __FILE__ ) . '/OWMplugin.js');
	wp_enqueue_script('OWMinit-js',plugin_dir_url( __FILE__ ) . '/OWMinit.js');
}
function OWMsetCity($searchterm) {
	echo "<div hidden id=\"owm-city-search-term\" class=\"owm-city-search-term\">$searchterm</div>";
}
function OWMshowSearch() {
?>
<span class="solstice-text pull-left">Search for a City</span><br>
			<span style="width:40%;" class="form-group pull-left">
				<input type="text" id="owm-city-search-term" class="form-control owm-city-search-term" value="San Francisco, CA">
			</span>
			<button type="submit" class="btn city-search-btn" OnClick="newSearch()">Search</button>&nbsp
			<input type="radio" name="searchUnits" value="metric" OnClick="citySearch()"><span class="solstice-text">&deg;C&nbsp</span>
			<input type="radio" name="searchUnits" value="imperial" class="active" OnClick="citySearch()" checked><span class="solstice-text">&deg;F</span>
<?php	
}
function OWMshowBasicMap() {
	echo '	<div id="owm-basicMap" class="owm-basicMap pull-left" style="width:50%; height:275px"></div>
	<div style="width:100%;">
		      	<span id="animateLink" class="animateLink pull-right solstice-link"><a href="javascript:void(0)" onclick="startAnimateMap(map)">animate Nexrad</a></span>
	      	</div>';
}
function OWMshowCurrentConditions() {
?>
<div class="owm-current-conditions omw-center">
  <h1 class="owm-city-name"></h1>
  <span class="owm-heading omw-country-name"></span><br>
  <h1 class="owm-lead"><span class="owm-LocalTempurature"></span><span class="owm-temp-units"></span></h1>
  <span class="owm-current-icon"></span><br>
  <span class="owm-current-desc"></span>
</div>
<?php
}

function OWMshowFiveDayForecast() {
?>
	      <div class="omw-fiveday-forecast-container">
		
<?php
	$i = 1;
	while($i < 6) {
?>
	        	 <div style="width:20%;" class="pull-left">
		          <div class="solstice-heading owm-forecast-<?php echo $i ?> owm-forecast-<?php echo $i ?>-heading"></div>
		          <div class="owm-forecast owm-forecast-<?php echo $i ?>">
		          		<div style="align:center; display:block; margin:0 auto;" class="owm-forecast-<?php echo $i ?>-icon"></div>
		          		<div>
			          		<span class="owm-forecast-<?php echo $i ?>-text-desc"></span><br>
			          		<span>High:&nbsp<span class="owm-forecast-<?php echo $i ?>-temp-max"></span><span class="owm-temp-units"></span></span><br>
			          		<span>Low:&nbsp<span class="owm-forecast-<?php echo $i ?>-temp-min"></span><span class="owm-temp-units"></span></span><br>
		          		</div>
		          </div>
	          </div>
<?php 
		$i++;
	}
?>
			</div>
<?php
}

function OWMshowFourteenDayForecast() {
?>
	      <div class="omw-fourteenday-forecast-container">
		
<?php
	$i = 1;
	while($i < 15) {
		if(($i % 5) == 0) {
			echo "<div>";
		}
?>
	        	 <div style="width:20%;" class="pull-left">
		          <div class="solstice-heading owm-forecast-<?php echo $i ?> owm-forecast-<?php echo $i ?>-heading"></div>
		          <div class="owm-forecast owm-forecast-<?php echo $i ?>">
		          		<div style="align:center; display:block; margin:0 auto;" class="owm-forecast-<?php echo $i ?>-icon"></div>
		          		<div>
			          		<span class="owm-forecast-<?php echo $i ?>-text-desc"></span><br>
			          		<span>High:&nbsp<span class="owm-forecast-<?php echo $i ?>-temp-max"></span><span class="owm-temp-units"></span></span><br>
			          		<span>Low:&nbsp<span class="owm-forecast-<?php echo $i ?>-temp-min"></span><span class="owm-temp-units"></span></span><br>
		          		</div>
		          </div>
	          </div>
<?php 
		if(($i % 5) == 0) {
			echo "</div>";
		}
		$i++;
	}
?>
			</div>
<?php
}
?>