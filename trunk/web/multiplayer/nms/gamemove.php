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
$log->lwrite("AddUser php called");

try
{
	if (count( $GLOBALS) > 0)
	{
	$log->lwrite("\n\nПередано GLOBALS'ом\n $GLOBALS");
	$log->lwrite(print_r($GLOBALS, true));
	$log->lwrite(print_r($_GET, true));
	$log->lwrite(print_r($_POST, true));
	  #echo "\n\nПередано GLOBALS'ом\n"; print_r( $GLOBALS);
	}


	$log->lwrite('What is inside HTTP_RAW_POST_DATA?');
	$log->lwrite(print_r($HTTP_RAW_POST_DATA, true));
	/*
	for($i=0; $i<count($q); $i++)
		{
		
		$log->lwrite('What is inside q=$HTTP_RAW_POST_DATA[$i]');
	$log->lwrite(print_r($q[$i], true));
		
		}
	  }
	*/  
	//$q=$HTTP_RAW_POST_DATA;
	$log->lwrite('What is inside q=json_decode($HTTP_RAW_POST_DATA, TRUE)');
	$log->lwrite(print_r(json_decode($HTTP_RAW_POST_DATA, TRUE), true));
	$q=json_decode($HTTP_RAW_POST_DATA, TRUE);
	//$q[0]["name"]
	$log->lwrite('What is inside $q[0]["name"]');
	$log->lwrite(print_r($q[0]["name"], true));
	$log->lwrite('What is inside $q["name"]');
	$log->lwrite(print_r($q["name"], true));
	
	$un = $_POST["username"];
	$host = $_POST["host"];
	$move = $_POST["move"];
	$counter = $_POST["counter"];
	$con = mysql_connect($dbhost, $dblogin, $dbpass);
	if (!$con)
	  {
	  die('Could not connect: ' . mysql_error());
	// close log file
	$log->lwrite('Could not connect: ' . mysql_error());
	$log->lclose();
	  }

	mysql_select_db($dbname, $con);

/*$sql="select move from gamemoves where counter = '". $counter."' and username = '". $un."'";
if($row = mysql_fetch_array($result))
  {
  if ($row['move'] > 0) {
	@mysql_query("delete from gamemoves where username = '".$un."'");
  }
  }*/
  
    $sql="insert into gamemoves (username, host, move, counter) values ('".$un."',". $host.", ".$move.", ".$counter.")";

	$result = mysql_query($sql);
$log->lwrite("username=".$un.",host=". $host.",move= ".$move.",counter= ".$counter."\nsql=".$sql."\nresult=".$result);
echo $result;
@mysql_query("UPDATE `gameusers` SET `lastactivity` = '".time()."' WHERE `name` = '".$r."'");
	mysql_close($con);
	$log->lwrite('Successful');
}
catch(Exception $e)
  {
  #echo 'Message: ' .$e->getMessage();
  $log->lwrite(print_r('Message: ' .$e->getMessage(), true));
  }
$log->lclose();

?>