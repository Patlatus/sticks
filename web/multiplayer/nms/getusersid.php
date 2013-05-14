<?php
include('mylib.php');
$log = new Logging();
// set path and name of log file (optional)
$log->lfile('mylog.txt');
// write message to the log file
$log->lwrite("GetUsersId php called");
include('config.inc.php');
$con = mysql_connect($dbhost, $dblogin, $dbpass);
if (!$con)
  {
  // close log file
	$log->lwrite('Could not connect: ' . mysql_error());
	$log->lclose();
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db($dbname, $con);

$t = time() - 10;
$sql="SELECT * FROM gameusers WHERE available = 1 and lastactivity > ".$t;
$log->lwrite("Current time minus 10 = ".$t."\nsql=".$sql);

$result = mysql_query($sql);
$log->lwrite("$result = ".$result);
echo "[";
if($row = mysql_fetch_array($result))
  {
  $log->lwrite("if ");
  echo "{id:'" . $row['id'] . "',name:'" . $row['name'] . "',firstmove:'" . $row['firstmove'] . "'}";
  }
while($row = mysql_fetch_array($result))
  {
  $log->lwrite("while ");
  echo ",{id:'" . $row['id'] . "',name:'" . $row['name'] . "',firstmove:'" . $row['firstmove'] . "'}";
  }
echo "]";

mysql_close($con);
$log->lclose();
?>