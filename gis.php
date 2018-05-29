<?php
/*
Konfigurimet e databases 
**/
$servername="localhost";
$username="root";
$password="";
$database="test";
$conn=mysqli_connect($servername,$username,$password,$database);
if ($conn->connect_error) {
	die("Connectio failed".$conn->connect_error);
}
/*
Funksion per te parsuar xml per nqs name ka vlera qe mund te prishin pune tek xml
**/
function parseToXML($htmlStr)
{
$xmlStr=str_replace('<','&lt;',$htmlStr);
$xmlStr=str_replace('>','&gt;',$xmlStr);
$xmlStr=str_replace('"','&quot;',$xmlStr);
$xmlStr=str_replace("'",'&#39;',$xmlStr);
$xmlStr=str_replace("&",'&amp;',$xmlStr);
return $xmlStr;
}

$query="SELECT * FROM geoinfo WHERE 1";
$results=mysqli_query($conn,$query);
if (!$results) {
    die('Invalid query: ' . mysql_error());
  }
header("Content-type: text/xml");
// Start XML file
echo "<?xml version='1.0' ?>";
echo '<hotels>';
$ind=0;
// Iterate through the rows, printing XML nodes for each
while ($row = mysqli_fetch_array($results,MYSQLI_ASSOC)){
  // Add to XML document node
  echo '<hotel ';
  echo 'id="' . $row['ID'] . '" ';
  echo 'name="' . parseToXML($row['name']) . '" ';
  echo 'lat="' . $row['lat'] . '" ';
  echo 'lng="' . $row['lng'] . '" ';
  echo 'value="' . $row['value'] . '" ';
  echo '/>';
  $ind = $ind + 1;
}

// End XML file
echo '</hotels>';
?>