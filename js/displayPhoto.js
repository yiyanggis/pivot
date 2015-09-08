$(document).ready(function(){

	//service = new google.maps.places.PlacesService(map);

	map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(28.6145, -81.5418),
        zoom: 10,
        mapTypeId: 'roadmap',
        streetViewControl: false,

	    zoomControl: true,
	    zoomControlOptions: {
	        style: google.maps.ZoomControlStyle.LARGE,
	        position: google.maps.ControlPosition.LEFT_CENTER
	    },
	    scaleControl: true,
	    streetViewControl: true,
	    streetViewControlOptions: {
	        position: google.maps.ControlPosition.LEFT_CENTER
	    },
	    panControl:true,
	    panControlOptions: {
	        position: google.maps.ControlPosition.LEFT_CENTER
	    }
      });

	map.setTilt(0);
    var infoWindow = new google.maps.InfoWindow;

    googlePlaceFinder=new GooglePlaceFinder(map);

    function popGoogleStreetView(event){
	var panoramaOptions = {
		  position: event.latLng,
		  pov: {
		    heading: 34,
		    pitch: 10
		  }
		};

		var panorama = new  google.maps.StreetViewPanorama(document.getElementById("panel2"), panoramaOptions);
		map.setStreetView(panorama);
		
		$( "#dialog" ).dialog( "open" );
	};

    //zip code
    var overlay_options = {
		getTileUrl : function(coord, zoom) {
			//return 'http://mt0.google.com/vt/lyrs=m@169010401,highlight:0x8628cfb25938b6c7:0x25bb73aa81b98232@1%7Cstyle:maps,highlight:0x8629196e6ca28391:0x40f089ab362d3930@1%7Cstyle:maps&hl=en&x=' + coord.x + '&y=' + coord.y + '&z=' + zoom + '&s=G'
			//if (highlight != null && highlight.length > 0) {
			//	return 'http://www.unitedstateszipcodes.org.s3-website-us-east-1.amazonaws.com/tiles/' + highlight + '/' + coord.x + '-' + coord.y + '-' + zoom + '.png';
			//} else {
				return 'http://www.unitedstateszipcodes.org.s3-website-us-east-1.amazonaws.com/tiles/all/' + coord.x + '-' + coord.y + '-' + zoom + '.png';
			//}
		},
		tileSize : new google.maps.Size(256, 256),
		// opacity: 0.3,
		isPng : true
	};

	/*var overlay_options2 = {
		getTileUrl : function(coord, zoom) {
			//return 'http://mt0.google.com/vt/lyrs=m@169010401,highlight:0x8628cfb25938b6c7:0x25bb73aa81b98232@1%7Cstyle:maps,highlight:0x8629196e6ca28391:0x40f089ab362d3930@1%7Cstyle:maps&hl=en&x=' + coord.x + '&y=' + coord.y + '&z=' + zoom + '&s=G'
			//if (highlight != null && highlight.length > 0) {
			//	return 'http://www.unitedstateszipcodes.org.s3-website-us-east-1.amazonaws.com/tiles/' + highlight + '/' + coord.x + '-' + coord.y + '-' + zoom + '.png';
			//} else {
				return 'http://www.themls.com/TileService/CaretsAreaToolTile/%7Bquadkey%7D';
			//}
		},
		tileSize : new google.maps.Size(256, 256),
		// opacity: 0.3,
		isPng : true
	};*/


	var overlay = new google.maps.ImageMapType(overlay_options);

	$("#isZipCodeVisible").click(function(){
		if($(this).is(':checked')){
			map.overlayMapTypes.insertAt(0, overlay);
		}
		else{
			  map.overlayMapTypes.setAt(0, null); 
		}
	});

	$("#isGoogleStreetViewVisible").click(function(){
		if($(this).is(':checked')){
			//street viewer
		    listenerHandle=google.maps.event.addListener(map, 'click', popGoogleStreetView);
		}
		else{
			if(listenerHandle!=undefined)
				google.maps.event.removeListener(listenerHandle);
		}
	});

	//map.overlayMapTypes.insertAt(0, overlay);



	$.ajax({
	  url: "testPhoto.php",
	})
  	.done(function( data ) {

  		var markers=JSON.parse(data);

  		photoMarkers=[];

  		photoImages=[];



  		$.each(markers,function(index,value){

  			var point = new google.maps.LatLng(
              parseFloat(value.lat),
              parseFloat(value.lon)
            );

  			var html = "<img class='markerImg' src='"+value.path+"'>";

  			var marker = new google.maps.Marker({
		        map: map,
		        icon: customIcons.bar.icon,
		        title: value.desc,
		        position: point
		      });

  			photoMarkers.push(marker);

  			bindInfoWindow(marker, map, infoWindow, html);

  			//add to list
  			var url=value.path;
  			var date=value.date;
  			var desc=value.desc;
  			var addr=value.addr;

  			var flagImage=new FlagImage(url, marker, date, desc,addr);

  			photoImages.push(flagImage);

  			var ImageNode="<li class='imageNode list-group-item list-group-item-success' value='"+index+"'><a id='image"+index+"'>"+value.desc+"</a></li>"

  			
  			$(ImageNode).appendTo($("#imageList"));

  	// 		$(ImageNode).on("click",function(){
			// 	alert("asd");
			// 	var id=this.value;
			// 	photoImages[id].focusOn();
			// });
  		});

  		var markerCluster = new MarkerClusterer(map, photoMarkers);

  		$(".imageNode").on("click",function(){
			//alert("asd");
			var id=this.value;
			var photoImage=photoImages[id];
			photoImage.focusOn(map);

			$("#thumbnail").empty();

			photoImage.setDetailInfo("thumbnail",googlePlaceFinder);


		});

	});




	//place api
	
	/*var placeInput=$("#pac-input");
	var searchBox = new google.maps.places.SearchBox(placeInput);

	

  	var placeInfowindow = new google.maps.InfoWindow();
	var placeMarker = new google.maps.Marker({
		map: map,
		anchorPoint: new google.maps.Point(0, -29)
	});

	// Listen for the event fired when the user selects an item from the
	// pick list. Retrieve the matching places for that item.
	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
		  return;
		}
		for (var i = 0, marker; marker = markers[i]; i++) {
		  marker.setMap(null);
		}

		// For each place, get the icon, place name, and location.
		markers = [];
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0, place; place = places[i]; i++) {
		  var image = {
		    url: place.icon,
		    size: new google.maps.Size(71, 71),
		    origin: new google.maps.Point(0, 0),
		    anchor: new google.maps.Point(17, 34),
		    scaledSize: new google.maps.Size(25, 25)
		  };

		  // Create a marker for each place.
		  var marker = new google.maps.Marker({
		    map: map,
		    icon: image,
		    title: place.name,
		    position: place.geometry.location
		  });

		  markers.push(marker);

		  bounds.extend(place.geometry.location);
		}

		map.fitBounds(bounds);
	});

	// Bias the SearchBox results towards places that are within the bounds of the
	// current map's viewport.
	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBox.setBounds(bounds);
	});*/

	var input = $("#pac-input")[0];
	//(document.getElementById('pac-input'));
  	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  	var markers = [];
  	var placeInfowindow = new google.maps.InfoWindow;

  	var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

	google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      var point = new google.maps.LatLng(
              parseFloat(place.geometry.location.k),
              parseFloat(place.geometry.location.D));

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        //icon: image,
        title: place.name,
        position: point
      });

      var html = "<b>" + place.name + "</b>";

      markers.push(marker);

      bindInfoWindow(marker, map, placeInfowindow, html);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 800,
		height:600
		// ,buttons: [
		// 	{
		// 		text: "Ok",
		// 		click: function() {
		// 			$( this ).dialog( "close" );
		// 		}
		// 	},
		// 	{
		// 		text: "Cancel",
		// 		click: function() {
		// 			$( this ).dialog( "close" );
		// 		}
		// 	}
		// ]
	});

	//$( "#dialog" ).dialog( "open" );
		
 });