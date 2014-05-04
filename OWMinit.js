var map;

function OWMinit(useGeoIP, searchBox) {
	if(useGeoIP == true) {
		$(".owm-city-search-term").val(getLocationText());
		$(".owm-city-search-term").bind("enterKey",function(e){
			newSearch();
			citySearch();
		});
		$(".owm-city-search-term").keyup(function(e){
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