YY=YY||{};
		
YY.spatialIntersection=function(polygon1,polygon2, callback){
	var isGeoJson1=GJV.isGeoJSONObject(JSON.parse(polygon1));
		var isGeoJson2=GJV.isGeoJSONObject(JSON.parse(polygon2));

		if(isGeoJson2&&isGeoJson1){
			// server:"97.68.192.217",
			// port:"9000",
			// srid:"4326",
			// apiName:"wfs.php"
			var url=YY.config.server+":"+YY.config.port+"/"+YY.config.apiName;
			$.post(url,{"polygon1":polygon1,"polygon2":polygon2},function(data){
				//console.log(data);
				callback(true,data);
			});
			
		}
		else{
			//return {"Please check if parameters are geojson format.";
			var error="geojson validation failed. Please check if parameters are geojson format";
			callback(false,error);
		}
};

YY.validateGeoJSON=function(feature){
	if(typeof(feature)=="string"){
		GJV.isGeoJSONObject(JSON.parse(feature), function(isGeoJson, errors){
			console.log(isGeoJson);
			console.log(errors);

			return isGeoJson;
		});
	}
	else{
		GJV.isGeoJSONObject(feature, function(isGeoJson, errors){
			console.log(isGeoJson);
			console.log(errors);

			return isGeoJson;
		});
	}
};


