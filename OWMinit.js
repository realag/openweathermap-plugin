var map;

function OWMinit(useGeoIP, searchBox) {
	searchBox = searchBox || ".owm-city-search-term";
	
	if(useGeoIP == true) {
		$(searchBox).val(getLocationText());
		$(searchBox).bind("enterKey",function(e){
			newSearch();
			citySearch();
		});
		$(searchBox).keyup(function(e){
			if(e.keyCode == 13) {
				$(this).trigger("enterKey");
			}
		});
	}
	citySearch();
	map = makeMap();
	setInterval(function(){ 
		citySearch();
		updateMap(map);
	}, 600000); //one minute
}
function newSearch() {
	citySearch();
	map = makeMap();
}
