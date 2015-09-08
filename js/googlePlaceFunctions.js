/*
*class name:GooglePlacefinder
*class description: use google place api
*
*
*
*/

var GooglePlaceFinder=function(map){
	this.service = new google.maps.places.PlacesService(map);
	this.latlng=null;
	this.radius=null;
	this.placeID="";
	this.results={};
}

GooglePlaceFinder.prototype.getPlaceID=function(latlng,radius,callback){
	this.latlng=latlng;
	this.radius=radius;

	var request = {
	    location: this.latlng,
	    radius: '500'
	    //,rankBy: google.maps.places.RankBy.DISTANCE
	};

	if(this.service!=undefined){
		//this.service.nearbySearch(request, GooglePlaceFinder.prototype.callback);
		this.service.nearbySearch(request, callback);
	}

}

GooglePlaceFinder.prototype.getDetails=function(id,callback){
	var request = {
	  placeId: id
	};

	if(this.service!=undefined){
		//this.service.nearbySearch(request, GooglePlaceFinder.prototype.callback);
		this.service.getDetails(request, callback);
	}

}

GooglePlaceFinder.prototype.callback=function(results,status){
	console.log(results);
	this.results=results;
}

