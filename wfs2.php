<?php

//$servername = "64.90.178.5";
$servername = "localhost";
$username = "postgres";
$password = "postgres";
$dbname="property";
//$tableName="carlsbad2";
$tableName="result4";



header("content-type:application/json");

//var_dump($_POST);

$polygon1=$_POST["polygon1"];
$polygon2=$_POST["polygon2"];

//echo $polygon1;
//$polygon1=json_decode($polygon1);
//$polygon2=json_decode($polygon2);

//$polygonStr1=composePolygonStr($polygon1);
//$polygonStr2=composePolygonStr($polygon2);

//echo $polygonStr2."<br/>";

function composePolygonStr($polygon){
	$polygonStr="POLYGON((";
	if($polygon->coordinates!=NULL){
		$array=$polygon->coordinates[0];
		foreach ($array as &$value) {
			$polygonStr.=$value[0]." ".$value[1].",";
		    //print_r($value);
		}
		$polygonStr=substr($polygonStr,0,-1);
		$polygonStr.="))";
		return $polygonStr;
	}
}

$connection_string="host=".$servername." port=5432 dbname=".$dbname." user=".$username." password=".$password;
$db_conn=pg_connect($connection_string) or die ("Could not connect to server\n");

 //$query = "SELECT station, \"city or to\", \"lat.\", \"long.\",type FROM airport_merge where ST_Intersects(ST_SetSRID(ST_POINT(".$lng.",".$lat."),4326)::geography, airport_merge.geom)";
 //$query = "SELECT ST_AsGeoJson(ST_Intersection(ST_GeomFromText('".$polygonStr1."',4326),ST_GeomFromText('".$polygonStr2."',4326)))";

$query="SELECT ST_AsGeoJson(ST_Intersection(ST_GeomFromGeoJSON('".$polygon1."'),ST_GeomFromGeoJSON('".$polygon2."')))";

 //$query = "select * from mapunitpoly where "
 //echo $query;
 $rs = pg_query($db_conn, $query) or die("Cannot execute query: $query\n");

$myarray = array();
while ($row = pg_fetch_row($rs)) {
  $myarray[] = $row;
}

//echo "run query";
echo json_encode($myarray);
pg_close($db_conn);

?>