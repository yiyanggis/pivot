/*
*
*
*
*/

/**
 * Define a namespace for the application.
 */
window.app = {};
var app = window.app;

/**
 * @constructor
 * @extends {ol.interaction.Pointer}
 */
app.Drag = function() {

  ol.interaction.Pointer.call(this, {
    handleDownEvent: app.Drag.prototype.handleDownEvent,
    handleDragEvent: app.Drag.prototype.handleDragEvent,
    handleMoveEvent: app.Drag.prototype.handleMoveEvent,
    handleUpEvent: app.Drag.prototype.handleUpEvent
  });

  /**
   * @type {ol.Pixel}
   * @private
   */
  this.coordinate_ = null;

  /**
   * @type {string|undefined}
   * @private
   */
  this.cursor_ = 'pointer';

  /**
   * @type {ol.Feature}
   * @private
   */
  this.feature_ = null;

  /**
   * @type {string|undefined}
   * @private
   */
  this.previousCursor_ = undefined;

};
ol.inherits(app.Drag, ol.interaction.Pointer);


/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `true` to start the drag sequence.
 */
app.Drag.prototype.handleDownEvent = function(evt) {
  var map = evt.map;

  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });

  if (feature) {
    this.coordinate_ = evt.coordinate;
    this.feature_ = feature;
  }

  return !!feature;
};


/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 */
app.Drag.prototype.handleDragEvent = function(evt) {
  var map = evt.map;

  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });

  var deltaX = evt.coordinate[0] - this.coordinate_[0];
  var deltaY = evt.coordinate[1] - this.coordinate_[1];

  

  if(this.feature_==centerFeature){
  	//move circle feature

  	var geometry = /** @type {ol.geom.SimpleGeometry} */
	    (this.feature_.getGeometry());
	geometry.translate(deltaX, deltaY);

	circleFeature.getGeometry().translate(deltaX,deltaY);
	perimeterFeature.getGeometry().translate(deltaX,deltaY);

	center=[evt.coordinate[0],evt.coordinate[1]];

	//0916 update inputs
	$("#lngInput").val(evt.coordinate[0]);
	$("#latInput").val(evt.coordinate[1]);
	//$("#wettedRadiusInput").val(radius);
	//$("#pivotLenInput").val(radius);
  }

  if(this.feature_==perimeterFeature){
  	//resize circle feature
  	var geometry = /** @type {ol.geom.SimpleGeometry} */
	    (this.feature_.getGeometry());
	geometry.translate(deltaX, deltaY);

	var r=Math.sqrt(Math.pow(evt.coordinate[0]-center[0],2)+Math.pow(evt.coordinate[1]-center[1],2));
	circleFeature.getGeometry().setRadius(r);

	radius=(r * ol.proj.METERS_PER_UNIT.degrees)/ol.proj.METERS_PER_UNIT.ft;

	//0916 update inputs
	//$("#lngInput").val(centerLng);
	//$("#latInput").val(centerLat);
	$("#wettedRadiusInput").val(radius);
	$("#pivotLenInput").val(radius);
  }

  if(this.feature_==circleFeature){
  	
  }

  

  this.coordinate_[0] = evt.coordinate[0];
  this.coordinate_[1] = evt.coordinate[1];
};


/**
 * @param {ol.MapBrowserEvent} evt Event.
 */
app.Drag.prototype.handleMoveEvent = function(evt) {
  if (this.cursor_) {
  	//console.log(evt.coordinate);
    // var map = evt.map;
    // var feature = map.forEachFeatureAtPixel(evt.pixel,
    //     function(feature, layer) {
    //       return feature;
    //     });
    // var element = evt.map.getTargetElement();
    // if (feature) {
    //   if (element.style.cursor != this.cursor_) {
    //     this.previousCursor_ = element.style.cursor;
    //     element.style.cursor = this.cursor_;
    //   }
    // } else if (this.previousCursor_ !== undefined) {
    //   element.style.cursor = this.previousCursor_;
    //   this.previousCursor_ = undefined;
    // }
  }
};


/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `false` to stop the drag sequence.
 */
app.Drag.prototype.handleUpEvent = function(evt) {
  this.coordinate_ = null;
  this.feature_ = null;
  return false;
};


function GetURLParameter(sParam)

{

    var sPageURL = window.location.search.substring(1);

    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++)

    {

        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] == sParam)

        {

            return sParameterName[1];

        }
    }
}

var styleFunction = function(feature, resolution) {

	switch(feature.getProperties().musym){
		case "6545":
        	return [new ol.style.Style({
			    fill: new ol.style.Fill({
			      color: 'rgba(255, 0, 0, 0.2)'
			    }),
			    stroke: new ol.style.Stroke({
			      color: 'black',
			      width: 1
			    })
		    })];
        	break;
    	case "6603":
        	return [new ol.style.Style({
			    fill: new ol.style.Fill({
			      color: 'rgba(0, 255, 0, 0.2)'
			    }),
			    stroke: new ol.style.Stroke({
			      color: 'black',
			      width: 1
			    })
		    })];
        	break;
        case "6742":
        	return [new ol.style.Style({
			    fill: new ol.style.Fill({
			      color: 'rgba(255, 255, 0, 0.2)'
			    }),
			    stroke: new ol.style.Stroke({
			      color: 'black',
			      width: 1
			    })
		    })];
        	break;
        case "6768":
        	return [new ol.style.Style({
			    fill: new ol.style.Fill({
			      color: 'rgba(155, 100, 0, 0.2)'
			    }),
			    stroke: new ol.style.Stroke({
			      color: 'black',
			      width: 1
			    })
		    })];
        	break;
        case "6811":
        	return [new ol.style.Style({
			    fill: new ol.style.Fill({
			      color: 'rgba(100, 155, 0, 0.2)'
			    }),
			    stroke: new ol.style.Stroke({
			      color: 'black',
			      width: 1
			    })
		    })];
        	break;
        case "6814":
        	return [new ol.style.Style({
			    fill: new ol.style.Fill({
			      color: 'rgba(100, 100, 0, 0.2)'
			    }),
			    stroke: new ol.style.Stroke({
			      color: 'black',
			      width: 1
			    })
		    })];
        	break;
	}
	
  //return styles[feature.getGeometry().getType()];
};



function addInteraction() {

	edit=new app.Drag();

  var value = "Circle";
  if (value !== 'None') {
    draw = new ol.interaction.Draw({
      features: features,
      type: /** @type {ol.geom.GeometryType} */ (value)
      //,geometryFunction:ol.interaction.Draw.createRegularPolygon(4)
    });
    //map.addInteraction(draw);

	draw.on('drawend',function(feature){
    	console.log(feature);
    	//features.clear();
    	//update input parameter

    	var extent=feature.feature.getGeometry().getExtent();

    	circleFeature=feature.feature;

    	// Source and vector layer
	    var vectorSource = new ol.source.Vector({
	        projection: 'EPSG:4326'
	    });
	    vectorSource.addFeature(circleFeature);
	    vectorLayer = new ol.layer.Vector({
	        source: vectorSource,
	        style: new ol.style.Style({
			    fill: new ol.style.Fill({
			      color: 'rgba(255, 255, 255, 0.2)'
			    }),
			    stroke: new ol.style.Stroke({
			      color: 'yellow',
			      width: 2
			    }),
			    image: new ol.style.Circle({
			      radius: 7,
			      fill: new ol.style.Fill({
			        color: '#ffcc33'
			      })
			    })
			})
	    });

	    map.addLayer(vectorLayer);


    	var centerLng=(extent[0]+extent[2])/2;
    	var centerLat=(extent[1]+extent[3])/2;

    	center=[centerLng,centerLat];

    	var r=(extent[2]-extent[0])/2;
    	radius=r*ol.proj.METERS_PER_UNIT.degrees/ol.proj.METERS_PER_UNIT.ft;
    	//radius=(r * ol.proj.METERS_PER_UNIT.ft)/ol.proj.METERS_PER_UNIT.degrees;

    	$("#lngInput").val(centerLng);
		$("#latInput").val(centerLat);
		$("#wettedRadiusInput").val(radius);
		$("#pivotLenInput").val(radius);

		// $("#startAngleInput").val("");
		// $("#stopAngleInput").val("");
		// $("#accessRoadAngleInput").val("");
		// $("#pivotNorthAngleInput").val("");
		// $("#pivotAngleInput").val("");
    });

    draw.on('drawstart',function(){
    	//console.log(feature);
    	features.clear();

    	if(vectorLayer!=null){
	    	map.removeLayer(vectorLayer);
	    }
    });

    var modify = new ol.interaction.Modify({
	  features: features,
	  // the SHIFT key must be pressed to delete vertices, so
	  // that new vertices can be drawn at the same position
	  // of existing vertices
	  deleteCondition: function(event) {
	    return ol.events.condition.shiftKeyOnly(event) &&
	        ol.events.condition.singleClick(event);
	  }
	});
	//map.addInteraction(modify);
  }
}

function initmap(mapdiv){

	var layergroup=new ol.layer.Group({
         'title': 'Base maps',
		 layers : [

		  new ol.layer.Tile({
		  	title: 'Base map',
            type: 'base',
		    source: new ol.source.TileWMS({
		      url: 'http://demo.boundlessgeo.com/geoserver/wms',
		      params: {
		        'LAYERS': 'ne:NE1_HR_LC_SR_W_DR'
		      }
		    })
		  })
		  ,esriLayer
		  // ,
		  // new ol.layer.Tile({
			 //  	title: 'satelite',
	   //          type: 'base',
		  //     	visible: false,
    //             source: new ol.source.MapQuest({layer: 'sat'})
	//	  })
		  //,
		  // new ol.layer.Tile({
		  //     source: new ol.source.OSM(),
		  //     visible:false
		  // })
		]});

	soilLayer=new ol.layer.Vector({
		      title: 'soil Layer',
		      source:null,
		      //yy read geojson resource
		      // source: new ol.source.GeoJSON({
		      //    projection : 'EPSG:3857',
		      //    url: 'soil.geojson'
		      // }),
		      style:styleFunction
		  	});

	fieldLayer=new ol.layer.Vector({
		      title: 'field Layer',
		      source:null
		      //,
		      //yy read geojson resource
		      // source: new ol.source.GeoJSON({
		      //    projection : 'EPSG:3857',
		      //    url: 'soil.geojson'
		      // }),
		      //,style:styleFunction
		  	});



	var overlaygroup=new ol.layer.Group({
		'title':'overlay',
		layers:[
			fieldLayer,
			soilLayer
			
		]
		
	});

	$.getJSON( "soil2.geojson", function( data ) {
	  	console.log(data);
	  	var soilSource=new ol.source.Vector({
			features: (new ol.format.GeoJSON()).readFeatures(data)
		});

		soilLayer.setSource(soilSource);

	});

	$.getJSON( "field.geojson", function( data ) {
	  	console.log(data);

	  	var properties=data.features[0].properties;

	  	var fieldDetailList=$("#fieldDetailList");
	  	if(properties.grower){
	  		$("<li></li>").html("Grower: "+properties.grower).appendTo(fieldDetailList);
	  	}
	  	if(properties.farm){
			$("<li></li>").html("Farm: "+properties.farm).appendTo(fieldDetailList);
	  	}
	  	if(properties.field){
	  		$("<li></li>").html("Field: "+properties.field).appendTo(fieldDetailList);
	  	}
	  	var fieldSource=new ol.source.Vector({
			features: (new ol.format.GeoJSON()).readFeatures(data)
		});

		fieldLayer.setSource(fieldSource);

	});

	features = new ol.Collection();
	featureOverlay = new ol.layer.Vector({
	  source: new ol.source.Vector({features: features}),
	  style: new ol.style.Style({
	    fill: new ol.style.Fill({
	      color: 'rgba(255, 255, 255, 0.2)'
	    }),
	    stroke: new ol.style.Stroke({
	      color: '#ffcc33',
	      width: 2
	    }),
	    image: new ol.style.Circle({
	      radius: 7,
	      fill: new ol.style.Fill({
	        color: '#ffcc33'
	      })
	    })
	  })
	});
	//featureOverlay.setMap(map);
	

	var map = new ol.Map({
		//interactions: ol.interaction.defaults().extend([new app.Drag()]),
	  controls: ol.control.defaults().extend([
	    new ol.control.ScaleLine({
	      units: 'feet'
	    })
	  ]),
	  layers: [layergroup,overlaygroup],
	  target: mapdiv,
	  view: new ol.View({
	    projection: 'EPSG:4326',
	    center: [-96.699,41.55],
	    //center: ol.proj.transform([-96.7,41.5], 'EPSG:4326', 'EPSG:3857'),
	    zoom: 15
	  })
	});

	var mousePositionCtrl = new ol.control.MousePosition({
	    // prefix: '<a target="_blank" ' +
	    //     'href="http://spatialreference.org/ref/epsg/4326/">' +
	    //     'EPSG:4326</a> coordinates: '
	    // }
	    	projection: new ol.proj.Projection({code:"EPSG:4326"})
		}
	);
	map.addControl(mousePositionCtrl);

	var layerSwitcher = new ol.control.LayerSwitcher({
        //tipLabel: 'Légende' // Optional label for button
    });
    map.addControl(layerSwitcher);

    //featureOverlay.setMap(map);
    map.addLayer(featureOverlay);

    map.on('click', displayFeatureInfo);
    

	return map;
}

function initmap2(mapdiv){

	var layergroup2=new ol.layer.Group({
         'title': 'Base maps',
		 layers : [

		  new ol.layer.Tile({
		  	title: 'basemap1',
            type: 'base',
		    source: new ol.source.TileWMS({
		      url: 'http://demo.boundlessgeo.com/geoserver/wms',
		      params: {
		        'LAYERS': 'ne:NE1_HR_LC_SR_W_DR'
		      }
		    })
		  })
		  ,
		  new ol.layer.Tile({
			  	title: 'satelite',
	            type: 'base',
		      	visible: false,
                source: new ol.source.MapQuest({layer: 'sat'})
		  })
		  //,
		  // new ol.layer.Tile({
		  //     source: new ol.source.OSM(),
		  //     visible:false
		  // })
		]});

	var overlaygroup2=new ol.layer.Group({
		'title':'overlay',
		layers:[

			new ol.layer.Vector({
		      title: 'added Layer',
		      //yy read geojson resource
		      // source: new ol.source.GeoJSON({
		      //    projection : 'EPSG:3857',
		      //    url: 'soil.geojson'
		      // }),
		      style:styleFunction
		  	})
		]
		
	});

	var map2 = new ol.Map({
	  controls: ol.control.defaults().extend([
	    new ol.control.ScaleLine({
	      units: 'feet'
	    })
	  ]),
	  layers: [layergroup2],
	  target: mapdiv,
	  view: new ol.View({
	    //projection: 'EPSG:4326',
	    //center: [-96.7,41.5],
	    center: ol.proj.transform([-96.7,41.5], 'EPSG:4326', 'EPSG:3857'),
	    //center:center,
	    zoom: 11
	  })
	});
	var mousePositionCtrl2 = new ol.control.MousePosition({
	    // prefix: '<a target="_blank" ' +
	    //     'href="http://spatialreference.org/ref/epsg/4326/">' +
	    //     'EPSG:4326</a> coordinates: '
	    // }
	    	projection: new ol.proj.Projection({code:"EPSG:4326"})
		}
	);
	map2.addControl(mousePositionCtrl2);

	var layerSwitcher2 = new ol.control.LayerSwitcher({
        //tipLabel: 'Légende' // Optional label for button
    });
    map2.addControl(layerSwitcher2);

	return map2;
}

function drawPivotCircle(map, r, lat,lng){
	var view = map.getView();
    var projection = view.getProjection();
    var resolutionAtEquator = view.getResolution();
    //var center = map.getView().getCenter();
    //var pointResolution = projection.getPointResolution(resolutionAtEquator, center);
    //var resolutionFactor = resolutionAtEquator/pointResolution;
    //var radius = (radius / ol.proj.METERS_PER_UNIT.ft) ;//* resolutionFactor;
    var radius=(r * ol.proj.METERS_PER_UNIT.ft)/ol.proj.METERS_PER_UNIT.degrees;

    center=[lng,lat];

    var point = new ol.geom.Point(center);
    //point.transform("EPSG:4326","EPSG:3857");
    //center=point.getCoordinates();

    if(vectorLayer!=null){
    	map.removeLayer(vectorLayer);
    }
    circle = new ol.geom.Circle(center, radius);
    circleFeature = new ol.Feature(circle);

    // Source and vector layer
    var vectorSource = new ol.source.Vector({
        projection: 'EPSG:4326'
    });
    vectorSource.addFeature(circleFeature);
    vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
		    fill: new ol.style.Fill({
		      color: 'rgba(255, 255, 255, 0.2)'
		    }),
		    stroke: new ol.style.Stroke({
		      color: 'yellow',
		      width: 2
		    }),
		    image: new ol.style.Circle({
		      radius: 7,
		      fill: new ol.style.Fill({
		        color: '#ffcc33'
		      })
		    })
		})
    });

    map.addLayer(vectorLayer);
}

function calcEntPt(x1,y1,L,Ang){
	var x2,y2;
	x2 = x1 + Math.cos(Ang) * L;
	y2 = y1 + Math.sin(Ang) * L;

	return [x2,y2];
}

function drawPivotLine(lat,lng,pivotLen,pivotAngle,pivotNorthAngle,radius,accessRoadAngle){
	drawPivot(pivotLen, lat,lng,pivotAngle*Math.PI/180,pivotNorthAngle*Math.PI/180);
	drawRoad(radius, lat,lng,accessRoadAngle*Math.PI/180);
}

function drawPivot(r, lat,lng,pivotAngle,pivotNorthAngle){
	var radius=(r * ol.proj.METERS_PER_UNIT.ft)/ol.proj.METERS_PER_UNIT.degrees;
	var endPt=calcEntPt(lng,lat,radius,pivotAngle+pivotNorthAngle);

	var coords=[[lng,lat],endPt];

	var line=new ol.geom.LineString(coords);
	var lineFeature=new ol.Feature(line);

	// Source and vector layer
    var lineSource = new ol.source.Vector({
        projection: 'EPSG:4326'
    });

    if(pivotLineLayer!=null){
    	map.removeLayer(pivotLineLayer);
    }

    lineSource.addFeature(lineFeature);
    pivotLineLayer = new ol.layer.Vector({
        source: lineSource,
        style: new ol.style.Style({
		    fill: new ol.style.Fill({
		      color: 'rgba(255, 255, 255, 0.2)'
		    }),
		    stroke: new ol.style.Stroke({
		      color: 'Red',
		      width: 2
		    }),
		    image: new ol.style.Circle({
		      radius: 7,
		      fill: new ol.style.Fill({
		        color: '#ffcc33'
		      })
		    })
		})
    });

    map.addLayer(pivotLineLayer);


}

function drawRoad(r, lat,lng,accessRoadAngle){
	var radius=(r * ol.proj.METERS_PER_UNIT.ft)/ol.proj.METERS_PER_UNIT.degrees;
	var endPt=calcEntPt(lng,lat,radius,accessRoadAngle);

	var coords=[[lng,lat],endPt];

	var road=new ol.geom.LineString(coords);
	var roadFeature=new ol.Feature(road);

	// Source and vector layer
    var roadSource = new ol.source.Vector({
        projection: 'EPSG:4326'
    });

    if(roadAccessLayer!=null){
    	map.removeLayer(roadAccessLayer);
    }

    roadSource.addFeature(roadFeature);
    roadAccessLayer = new ol.layer.Vector({
        source: roadSource,
        style: new ol.style.Style({
		    fill: new ol.style.Fill({
		      color: 'rgba(255, 255, 255, 0.2)'
		    }),
		    stroke: new ol.style.Stroke({
		      color: 'Blue',
		      width: 2
		    }),
		    image: new ol.style.Circle({
		      radius: 7,
		      fill: new ol.style.Fill({
		        color: '#ffcc33'
		      })
		    })
		})
    });

    map.addLayer(roadAccessLayer);
}

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}





var highlight;
var displayFeatureInfo = function(evt) {

var pixel=evt.pixel;

  var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
  	console.log(feature);
    return feature;
  });


  if (feature !== highlight) {
    if (highlight) {
      soilLayer.getSource().removeFeature(highlight);
    }
    if (feature) {
      soilLayer.getSource().addFeature(feature);

      var coordinate = evt.coordinate;
	  
	  content.innerHTML = objToString(feature.getProperties());

	  overlay.setPosition(coordinate);
    }
    highlight = feature;
  }

   

};

// map.on('pointermove', function(evt) {
//   if (evt.dragging) {
//     return;
//   }
//   var pixel = map.getEventPixel(evt.originalEvent);
//   displayFeatureInfo(pixel);
// });

function validateFloat(element){
	var html=$("#"+element);
	html.removeClass("has-error");
	var result=parseFloat(html.val());
	if(isNaN(result)){
		html.addClass("has-error");
		return null;
	}
	else
		return result;
}

function validatePositive(element){
	var html=$("#"+element);
	html.removeClass("has-error");
	var result=parseFloat(html.val());
	if(isNaN(result)){
		html.addClass("has-error");
		return null;
	}
	else if(result<=0){
		html.addClass("has-error");
		return null;
	}
	else
		return result;
}

function handleFileSelect()
{               
	if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
	  alert('The File APIs are not fully supported in this browser.');
	  return;
	}   

	input = document.getElementById('fileinput');
	if (!input) {
	  alert("Um, couldn't find the fileinput element.");
	}
	else if (!input.files) {
	  alert("This browser doesn't seem to support the `files` property of file inputs.");
	}
	else if (!input.files[0]) {
	  alert("Please select a file before clicking 'Load'");               
	}
	else {
	  file = input.files[0];
	  fr = new FileReader();
	  fr.onload = function(e) {
	  	//e.target.result
	  	var obj=JSON.parse(e.target.result);

	  	var pivotDef=obj.definition;

	 //  	"lat":41.546,
		// "lng":-96.696,
		// "wettedRadius":7018,
		// "pivotLen":7018,
		// "startAngle":0,
		// "stopAngle":360,
		// "accessRoadAngle":-1,
		// "pivotNorthAngle":360,
		// "pivotAngle":0

	  	$("#lngInput").val(pivotDef.lng);
		$("#latInput").val(pivotDef.lat);
		$("#wettedRadiusInput").val(pivotDef.wettedRadius);
		$("#pivotLenInput").val(pivotDef.pivotLen);
		$("#startAngleInput").val(pivotDef.startAngle);
		$("#stopAngleInput").val(pivotDef.stopAngle);
		$("#accessRoadAngleInput").val(pivotDef.accessRoadAngle);
		$("#pivotNorthAngleInput").val(pivotDef.pivotNorthAngle);
		$("#pivotAngleInput").val(pivotDef.pivotAngle);
	  };
	  fr.readAsText(file);
	  //fr.readAsDataURL(file);
	}
}


$(document).ready(function(){

	// closer.onclick = function() {
	//   overlay.setPosition(undefined);
	//   closer.blur();
	//   return false;
	// };

	// var container = document.getElementById('popup');
	// var content = document.getElementById('popup-content');
	// var closer = document.getElementById('popup-closer');

	overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
	  element: container,
	  autoPan: true,
	  autoPanAnimation: {
	    duration: 250
	  }
	}));
	overlay.setMap(map);

	$('#popup-closer').click(function(){
		overlay.setPosition(undefined);
	   	closer.blur();
	   	return false;
	});

	$('#uploadBtn').click(function(){
		handleFileSelect();
	});

	$("#generateBtn").click(function(){
		var tempRadius, lat, lng, pivotLen, startAngle, stopAngle, accessRoadAngle, pivotNorthAngle, pivotAngle;

		lng=validateFloat("lngInput");

		lat=validateFloat("latInput");

		radius=tempRadius=validatePositive("wettedRadiusInput");
		pivotLen=validatePositive("pivotLenInput");

		startAngle=validateFloat("startAngleInput");
		stopAngle=validateFloat("stopAngleInput");

		accessRoadAngle=validateFloat("accessRoadAngleInput");
		pivotNorthAngle=validateFloat("pivotNorthAngleInput");

		pivotAngle=validateFloat("pivotAngleInput");
		if(tempRadius>0&&lat!=null&&lng!=null&&pivotLen>0)
		{
			//
			map.removeLayer(featureOverlay);
			drawPivotCircle(map, tempRadius, lat,lng);
			drawPivotLine(lat,lng,pivotLen,pivotAngle,pivotNorthAngle,tempRadius,accessRoadAngle);
		}	
		else{
			console.log("parameter error");
		}
	});

	$("#drawBtn").click(function(){
		$(this).toggleClass('btn-success')

		if(mapStatus==null){
			//$('.leaflet-container').css('cursor','help');
			
			mapStatus=mapStatusMode.Draw;
			map.addInteraction(draw);

			map.un('click', displayFeatureInfo);
		}
		else if(mapStatus==mapStatusMode.Draw){
			//$('.leaflet-container').css('cursor','-webkit-grab');
			mapStatus=mapStatusMode.Null;
			map.removeInteraction(draw);

			map.on('click', displayFeatureInfo);
		}
		
	});

	$("#editBtn").click(function(){
		$(this).toggleClass('btn-success')

		//edit=ol.interaction.defaults().extend([new app.Drag()]);


		if(mapStatus==null){
			//$('.leaflet-container').css('cursor','help');
			//var centerFeature, perimeterFeature;
			centerPoint = new ol.geom.Point(center);
			centerFeature = new ol.Feature(centerPoint);

			var r=(radius * ol.proj.METERS_PER_UNIT.ft)/ol.proj.METERS_PER_UNIT.degrees;
			perimeterPoint = new ol.geom.Point([center[0],center[1]+r]);
			perimeterFeature = new ol.Feature(perimeterPoint);

			var editSource = new ol.source.Vector({
		        projection: 'EPSG:4326'
		    });
		    editSource.addFeature(centerFeature);
		    editSource.addFeature(perimeterFeature);

		    editLayer = new ol.layer.Vector({
		        source: editSource,
		        style: new ol.style.Style({
				    fill: new ol.style.Fill({
				      color: 'rgba(255, 255, 255, 0.2)'
				    }),
				    stroke: new ol.style.Stroke({
				      color: 'Blue',
				      width: 2
				    }),
				    image: new ol.style.Circle({
				      radius: 4,
				      fill: new ol.style.Fill({
				        color: 'Blue'
				    	})
				    })
				})
		    });

		    map.addLayer(editLayer);
			
			mapStatus=mapStatusMode.Edit;
			map.addInteraction(edit);

			map.un('click', displayFeatureInfo);
		}
		else if(mapStatus==mapStatusMode.Edit){
			//$('.leaflet-container').css('cursor','-webkit-grab');
			mapStatus=mapStatusMode.Null;
			map.removeInteraction(edit);
			map.removeLayer(editLayer);

			map.on('click', displayFeatureInfo);
		}
		
	});

	$("#modifyBtn").click(function(){
		map.removeInteraction(draw);
	});

	$("#deleteBtn").click(function(){
		//var vectorLayer,pivotLineLayer, roadAccessLayer;
		if(vectorLayer==null){
		}
		else{
			map.removeLayer(vectorLayer);
		}

		if(featureOverlay==null){
		}
		else{
			map.removeLayer(featureOverlay);
		}

		if(pivotLineLayer==null){
		}
		else{
			map.removeLayer(pivotLineLayer);
		}

		if(roadAccessLayer==null){
		}
		else{
			map.removeLayer(roadAccessLayer);
		}
	});

	$("#resetBtn").click(function(){
		console.log("reset button");
		$("#lngInput").val("0");
		$("#latInput").val("0");
		$("#wettedRadiusInput").val("0.0");
		$("#pivotLenInput").val("0.0");
		$("#startAngleInput").val("0");
		$("#stopAngleInput").val("360");
		$("#accessRoadAngleInput").val("-1");
		$("#pivotNorthAngleInput").val("360");
		$("#pivotAngleInput").val("0");

		$("#lngInput").removeClass("has-error");
		$("#latInput").removeClass("has-error");
		$("#wettedRadiusInput").removeClass("has-error");
		$("#pivotLenInput").removeClass("has-error");
		$("#startAngleInput").removeClass("has-error");
		$("#stopAngleInput").removeClass("has-error");
		$("#accessRoadAngleInput").removeClass("has-error");
		$("#pivotNorthAngleInput").removeClass("has-error");
		$("#pivotAngleInput").removeClass("has-error");

		map.removeLayer(vectorLayer);
		
	});

	$("#deletaBtn").click(function(){

		console.log("delete button");
	});


	$("#saveChangesBtn").click(function(){

		console.log("save changes button");

		//open new page instead
		var myWindow = window.open("pivot2.html?lat="+center[1]+"&lng="+center[0]+"&r="+radius+"&speed="+baseSpeed+"&dept="+appDept+"&time="+rotationTime, "_self");

		// $("#pivotBtns").fadeOut();
		
		// //$('#tabs a[href="#Pivot_Essentials"]').tab('show');
		// //map2=initmap2('map2',center);
		// setTimeout($("#pivotSector").fadeIn(),1000);
	});


	$("#cancelBtn").click(function(){

		console.log("cancel button");
	});

	$("#degSelect").on('change', function() {
		console.log($(this).val());
		//draw sectors

		if(sectorLayer==null){
			//sectorLayer=new ol.source.Vector();
			//map.addLayer(sectorLayer);
		}
		else{
			map.removeLayer(sectorLayer);
			
			//map.addLayer(sectorLayer);
		}
		sectorSource=new ol.source.Vector();

		drawSectors(center,radius,parseFloat($(this).val()));

		var geojson = new ol.format.GeoJSON();

		featureCollection=geojson.writeFeaturesObject(sectorSource.getFeatures());

		sectorLayer = new ol.layer.Vector({
	        source: sectorSource,
	        style: new ol.style.Style({
			    fill: new ol.style.Fill({
			      color: 'rgba(255, 255, 255, 0.2)'
			    }),
			    stroke: new ol.style.Stroke({
			      color: 'blue',
			      width: 2
			    })
			})
	    });

		map.addLayer(sectorLayer);

		$("#clipTd").fadeIn();

	});

	$("#clipBtn").click(function(){

		$("#resultDiv").fadeIn();
		$.each(featureCollection.features,function(index,value){
			//console.log(value.geometry);

			value.geometry.crs={"type":"name","properties":{"name":"EPSG:4326"}};

			console.log(JSON.stringify(value.geometry));

			$.ajax({
			  method: "POST",
			  url: "http://localhost/pivot/pivot.php",
			  data: {"polygon":JSON.stringify(value.geometry)},
			  async:true
			})
			  .done(function( data ) {
			    console.log(index+":"+data);
			    $("<tr></tr>").append(
			    	$('<td>').text(index),
			    	$('<td>').text("from "+index*2+" degree "+" to "+(index*2+2)+" degree"),
		            $('<td>').text(data)
		            ).appendTo($("#resultTable"));
			  });
		})
	});

	//=====================================================pivot essential

	$("#speedInput").change(function(e){
		baseSpeed=parseFloat($( this ).val());

		$("#appDeptLabel").text("Application depth (in) @ "+baseSpeed+"%");
		$("#rotationTimeLabel").text("360 deg rotation time @ "+baseSpeed+"%");

		appDept=ratioApp_Speed/baseSpeed;

		$("#appDepthInput").val(appDept);

		rotationTime=ratioSpeed_Time/baseSpeed;

		$("#rotationTimeInput").val(rotationTime);
	});

	$("#appDepthInput").change(function(e){
		appDept=parseFloat($( this ).val());

		baseSpeed=ratioApp_Speed/appDept;

		$("#appDeptLabel").text("Application depth (in) @ "+baseSpeed+"%");
		$("#rotationTimeLabel").text("360 deg rotation time @ "+baseSpeed+"%");

		$("#speedInput").val(baseSpeed);

		rotationTime=ratioSpeed_Time/baseSpeed;

		$("#rotationTimeInput").val(rotationTime);

	});
});

function drawSectors(center,radius,deg){

	var geojson=new ol.format.GeoJSON();

	for(var i=0;i<=360;i+=deg){
		var pointArray=[];
		pointArray.push(center);

		var pt1=[],pt2=[];
		var x1,y1,x2,y2;

		x1=center[0]+radius*Math.cos(i*Math.PI/180);
		y1=center[1]+radius*Math.sin(i*Math.PI/180);

		x2=center[0]+radius*Math.cos((i+deg)*Math.PI/180);
		y2=center[1]+radius*Math.sin((i+deg)*Math.PI/180);

		pt1.push(x1);
		pt1.push(y1);

		pt2.push(x2);
		pt2.push(y2);

		pointArray.push(pt1);
		pointArray.push(pt2);

		pointArray.push(center);

		var sector=new ol.geom.Polygon([pointArray]);

		console.log(JSON.stringify(geojson.writeGeometryObject(sector)));

		var sectorFeature=new ol.Feature(sector);

		sectorSource.addFeature(sectorFeature);
	}
}







