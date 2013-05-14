<?php
include('config.inc.php');
$con = mysql_connect($dbhost, $dblogin, $dbpass);
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db($dbname, $con);

$sql="delete FROM gameusers";

$result = mysql_query($sql);


echo "Result: " . print_r($result, true);

mysql_close($con);
?>