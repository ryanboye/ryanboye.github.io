<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

// Trying to hit some API's ya dig

//  Initiate curl
$url="http://www.behance.net/v2/users/ryanboye/projects?api_key=3vbEwiDYQ4hS81M3wrWjuSQ6iki3TRwi";

$ch = curl_init();
// Disable SSL verification
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// Disable SSL verification
curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
// Will return the response, if false it print the response
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Set the url
curl_setopt($ch, CURLOPT_URL,$url);
// Execute
$result=curl_exec($ch);

echo($result);

$con = mysqli_connect("localhost","ryanboye_ryan","iamryan","ryanboye_portfolio");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

mysqli_query($con,"INSERT INTO projects(project, id)VALUES('$result', null)");

mysqli_close($con);
?>