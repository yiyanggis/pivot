/*
*
*
*
*/

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

    	var centerLng=(extent[0]+extent[2])/2;
    	var centerLat=(extent[1]+extent[3])/2;

    	var radius=(extent[2]-extent[0])/2;
    	radius=radius*ol.proj.METERS_PER_UNIT.degrees/ol.proj.METERS_PER_UNIT.ft;
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

	$.getJSON( "soil.geojson", function( data ) {
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
	  controls: ol.control.defaults().extend([
	    new ol.control.ScaleLine({
	      units: 'feet'
	    })
	  ]),
	  layers: [layergroup,overlaygroup],
	  target: mapdiv,
	  view: new ol.View({
	    projection: 'EPSG:4326',
	    center: center,
	    //center: ol.proj.transform([-96.7,41.5], 'EPSG:4326', 'EPSG:3857'),
	    zoom: 16
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
	//var radius=r;
	var endPt=calcEntPt(lng,lat,radius,pivotAngle+pivotNorthAngle);

	var coords=[[lng,lat],endPt];

	var line=new ol.geom.LineString(coords);
	var lineFeature=new ol.Feature(line);

	// Source and vector layer
    var lineSource = new ol.source.Vector({
        projection: 'EPSG:4326'
    });
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

	$("#generateBtn").click(function(){
		var tempRadius, lat, lng, pivotLen, startAngle, stopAngle, accessRoadAngle, pivotNorthAngle, pivotAngle;

		lng=validateFloat("lngInput");

		lat=validateFloat("latInput");

		tempRadius=validatePositive("wettedRadiusInput");
		pivotLen=validatePositive("pivotLenInput");

		startAngle=validateFloat("startAngleInput");
		stopAngle=validateFloat("stopAngleInput");

		accessRoadAngle=validateFloat("accessRoadAngleInput");
		pivotNorthAngle=validateFloat("pivotNorthAngleInput");

		pivotAngle=validateFloat("pivotAngleInput");
		if(tempRadius>0&&lat!=null&&lng!=null&&pivotLen>0)
		{
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
		var myWindow = window.open("pivot2.html?lat="+center[1]+"lng="+center[0]+"r="+radius, "_self");

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
		sectorDeg=parseFloat($(this).val());

		t.clear().draw();

		sectorArray=[];

		if(sectorLayer==null){
			//sectorLayer=new ol.source.Vector();
			//map.addLayer(sectorLayer);
		}
		else{
			map.removeLayer(sectorLayer);
			
			//map.addLayer(sectorLayer);
		}
		sectorSource=new ol.source.Vector();

		drawSectors(center,radius,sectorDeg);

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

		//run clip

		$("#resultDiv").fadeIn();

		var appMin=1000,appMax=0;
		$.each(featureCollection.features,function(index,value){
			//console.log(value.geometry);

			value.geometry.crs={"type":"name","properties":{"name":"EPSG:4326"}};

			console.log(JSON.stringify(value.geometry));

			$.ajax({
			  method: "POST",
			  url: "http://97.68.192.217:9000/pivot/pivot.php",
			  data: {"polygon":JSON.stringify(value.geometry)},
			  async:true
			})
			  .done(function( data ) {
			    console.log(index+":"+data);
			    

			    //calculate area, app dept, speed, awc
			    // get major soil, awc

			    var sector={};
			    var area=0;
			    var awc=0;

			    //var soil=[0,0,0,0];//silt loam, sand, sandy loam, clay
			    var soil=data[0][3];
			    var runoff=data[0][1];
			    var yeildgoal=data[0][0];
			    var baseAwc=data[0][2];

			    for(var i=0;i<data.length;i++){
			    	var v=data[i];
			    	area+=parseFloat(v[4]);

			    	//
			    	// switch(v[3]){
			    	// 	case "Silt Loam":
			    	// 		soil[0]+=v[4];
			    	// 		break;
			    	// 	case "Sand":
			    	// 		soil[1]+=v[4];
			    	// 		break;
			    	// 	case "Silt Loam":
			    	// 		soil[2]+=v[4];
			    	// 		break;
			    	// 	case "Silt Loam":
			    	// 		soil[3]+=v[4];
			    	// 		break;
			    	// }

			    }

			    for(var i=0;i<data.length;i++){
			    	var v=data[i];
			    	awc+=parseFloat(v[2])*parseFloat(v[4])/area;
			    }

			    

			    area=area*ol.proj.METERS_PER_UNIT.degrees*ol.proj.METERS_PER_UNIT.degrees/ol.proj.AreaPerUnit.ACRE;

			    // data.push(index);//5
			    // data.push(awc);//6
			    // data.push(area);//7

			    sector.index=index;
			    sector.awc=awc;
			    sector.area=area;
			    sector.soil=soil;
			    sector.runoff=runoff;
			    sector.yeildgoal=yeildgoal;
			    sector.baseAwc=baseAwc;

			    //speed and app depth
			    var speed=baseSpeed*(baseAwc/awc);
			    var depth=appDept*(awc/baseAwc);

			    if(depth>appMax){
			    	appMax=depth;
			    	$("#appMaxInput").val(appMax.toFixed(2));
			    }
			    	

			    if(depth<appMin){
			    	appMin=depth;
			    	$("#appMinInput").val(appMin.toFixed(2));
			    }

			    sectorArray.push(sector);
			    	

			    t.row.add([index*sectorDeg,index*sectorDeg+sectorDeg,area.toFixed(2),
			    	depth.toFixed(2),//application depth
			    	speed.toFixed(2),//speed
			    	soil,//soil type
			    	awc.toFixed(2),//awc
			    	0,//field capacit
			    	0,//wilting point
			    	awc.toFixed(2),//inches to refill
			    	yeildgoal,//yild goal
			    	runoff//runoff
			    	]).draw();

			    // $("<tr></tr>").append(
			    // 	$('<td>').text(index),
			    // 	$('<td>').text(index*sectorDeg),
		     //        $('<td>').text(index*sectorDeg+sectorDeg),
		     //        $('<td>').text(area.toFixed(2))
		     //        ).appendTo($("#resultTable"));
			  });
		})



		//$("#clipTd").fadeIn();

	});

	//pivot speed
	$("#appDeptInput").change(function(e){
		appDept=parseFloat($( this ).val());

		baseSpeed=ratioApp_Speed/appDept;

		$("#speedInput").val(baseSpeed);

		//update table
		t.clear().draw();

		//sectorArray.push(data);
		$.each(sectorArray,function(index,value){

			//speed and app depth
		    var speed=baseSpeed*(value.baseAwc/value.awc);
		    var depth=appDept*(value.awc/value.baseAwc);

			t.row.add([value.index*sectorDeg,value.index*sectorDeg+sectorDeg,
				value.area.toFixed(2),
		    	depth.toFixed(2),//application depth
		    	speed.toFixed(2),//speed
		    	value.soil,//soil type
		    	value.awc.toFixed(2),//awc
		    	0,//field capacit
		    	0,//wilting point
		    	value.awc.toFixed(2),//inches to refill
		    	value.yeildgoal,//yild goal
		    	value.runoff//runoff
	    	]).draw();
		});	    	

	    



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
});

function drawSectors(center,radius,deg){

	var radius=(radius * ol.proj.METERS_PER_UNIT.ft)/ol.proj.METERS_PER_UNIT.degrees;
	var geojson=new ol.format.GeoJSON();

	for(var i=0;i<360;i+=deg){
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







