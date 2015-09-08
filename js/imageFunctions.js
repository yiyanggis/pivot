var FlagImage=function(url, marker, date, desc,addr, googlePlaceFinder){
	this.imageURL=url;
	this.marker=marker;
	this.date=date;
	this.desc=desc;
	this.addr=addr;
	this.googlePlaceFinder=googlePlaceFinder;
}

FlagImage.prototype.focusOn=function(map){
	if(this.marker!=undefined){
		if(this.marker.map!=undefined){
			var map=this.marker.map;
			 map.setCenter(this.marker.getPosition());
			 map.setZoom(20);
			 new google.maps.event.trigger( this.marker, 'click' );

			 return true;
		}
		else{
			this.marker.setMap(map);

			map.setCenter(this.marker.getPosition());
			map.setZoom(20);
			 new google.maps.event.trigger( this.marker, 'click' );
			return true;
		}
	}
	else{
		return false;
	}
}
	

FlagImage.prototype.setDetailInfo=function(domid, googlePlaceFinder){
	var thumbnail=$("#"+domid);

	thumbnailDomid=domid;

		//detail info
	/* <div class="caption">
        <h3>Thumbnail label</h3>
        <p>...</p>
        
      </div>
      */

    var detail=$("<div></dvi>");

    var imageThumbnail=$("<img src='"+this.imageURL+"' class='imageThumbnail'>");

    var imageDesc=$("<div class='caption'><h3>"+this.addr+"</h3><p>"+this.desc+"</p></div>");
    $(detail).appendTo(thumbnail);
    $(imageThumbnail).appendTo($(detail));
    $(imageDesc).appendTo($(detail));



    googlePlaceFinder.getPlaceID(this.marker.getPosition(),'50',FlagImage.prototype.getPlaceID);

}

FlagImage.prototype.getPlaceID=function(results,status){
	var thumbnail=$("#"+thumbnailDomid);

	if(results.length>0)
	{

		if(results.length>3){
			var n=3;

			for(var i=0;i<n;i++){
				this.placeID=results[i].place_id;

				this.googlePlaceFinder.getDetails(this.placeID, placeServiceCallback);

				
				// $.ajax({
				//   url: "https://maps.googleapis.com/maps/api/place/details/json?placeid="+this.placeID+"&key=AIzaSyCp1HWib0Es6rZGsfylHOZMawOiOZYx3Q4",
				//   async:false
				// })
			 //  	.done(function( data ) {
			 //  		console.log(data);
			 //  	});
				//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJvRBCrN9-54gRGZuuaCLGrQE&key=AIzaSyCp1HWib0Es6rZGsfylHOZMawOiOZYx3Q4
			}
		}
		

		
		
	}
	else{
		$("<p>Couldn't find detail info of this location.</p>").appendTo(thumbnail);
	}


	
	
}

function placeServiceCallback(place, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
	//createMarker(place);
		console.log(place);

		//if telephone number
		if(place.formatted_phone_number!=undefined){
			var placeID=$("<p>"+place.name+"</p><p>"+place.formatted_phone_number+"</p><p>"+place.formatted_address+"</p>");
		$(placeID).appendTo(thumbnail);
		}

		
	}
}

