<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

// Trying to hit some API's ya dig

//  Initiate curl
$url="http://api.dribbble.com/players/ryanboye/shots";

$ch = curl_init();
// Disable SSL verification
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// Will return the response, if false it print the response
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Set the url
curl_setopt($ch, CURLOPT_URL,$url);
// Execute
$result=curl_exec($ch);

// Will dump a beauty json :3
// var_dump(json_decode($result, true));

// echo($result);

$con = mysqli_connect("localhost","ryanboye_ryan","iamryan","ryanboye_portfolio");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

mysqli_query($con,"INSERT INTO shots(shot, id)VALUES('$result', null)");

mysqli_close($con);
?>