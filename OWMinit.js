var map;
function OWMinit(useGeoIP, searchBox) {
	useGeoIP = useGeoIP || true;
	searchBox = searchBox || ".owm-city-search-term";
	if(useGeoIP) {
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