<?php
include('config.inc.php');
$con = mysql_connect($dbhost, $dblogin, $dbpass);
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db($dbname, $con);

$t = time() - 10;
$sql="SELECT * FROM gameusers WHERE available = 1 and lastactivity > ".$t;

$result = mysql_query($sql);
echo "[";
if($row = mysql_fetch_array($result))
  {
  echo "{id:'" . $row['id'] . "',name:'" . $row['name'] . "',firstmove:'" . $row['firstmove'] . "'}";
  }
while($row = mysql_fetch_array($result))
  {
  echo ",{id:'" . $row['id'] . "',name:'" . $row['name'] . "',firstmove:'" . $row['firstmove'] . "'}";
  }
echo "]";

mysql_close($con);
?>