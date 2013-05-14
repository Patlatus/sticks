<?php
header("Content-type: text/plain; charset=windows-1251");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Expires: -1"); 

// include mylib.php (contains Logging class)
include('mylib.php');
include('config.inc.php');
// Logging class initialization
$log = new Logging();

// set path and name of log file (optional)
$log->lfile('mylog.txt');

// write message to the log file
$log->lwrite("JoinUser php called.");
$log->lwrite(print_r($GLOBALS, true));
	
$r = $_POST["username"];
$con = mysql_connect($dbhost, $dblogin, $dbpass);
if (!$con)
  {
  $log->lclose();
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db($dbname, $con);

$sql="select available from gameusers where name = '". $r."'";
$log->lwrite("username=".$r."\nsql=".$sql);

$result = mysql_query($sql);
$log->lwrite("result=".print_r($result,true));
if($row = mysql_fetch_array($result))
  {
$log->lwrite("available=".$row['available']);
echo ($row['available'] == 2) ? 'yes' : 'no';
@mysql_query("UPDATE `gameusers` SET `lastactivity` = '".time()."' WHERE `name` = '".$r."'");
  }

mysql_close($con);
$log->lclose();
?>