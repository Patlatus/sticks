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
	$r = $_POST["name"];
	if ($r=="" || $r==null) {
	#echo 'Empty parameter';
  $log->lwrite('Empty parameter');
	  return;
	}
	$fm = $_POST["firstmove"];
	$con = mysql_connect($dbhost, $dblogin, $dbpass);
	if (!$con)
	  {
	  die('Could not connect: ' . mysql_error());
	// close log file
	$log->lwrite('Could not connect: ' . mysql_error());
	$log->lclose();
	  }

	mysql_select_db($dbname, $con);
	$addsql="insert into gameusers (name, available, firstmove, lastactivity) values ('".$r."', 1, ".$fm.",".time().")";
	$log->lwrite("r=".$r."fm=".$fm."\nsql=".$addsql);
    /*$sql="SELECT count(*) as 'c' FROM gameusers WHERE name = '".$r."'";
	$result = mysql_query($sql);
	if (($row = mysql_fetch_array($result))){
		if (isset($row['c'])) {
			$cc = intval($row['c']);
			if ($cc > 1) {
				@mysql_query("delete from gameusers where name = '".$r."'");
				@mysql_query("delete from gamemoves where username = '".$r."'");
				#$result = mysql_query($addsql);
			}
			if ($cc = 1) {
				if (($row = mysql_fetch_array(mysql_query("select lastactivity from gameusers where name = '".$r."'")))){
					if (isset($row['lastactivity']) && time() - $row['lastactivity'] > 10) {
						@mysql_query("delete from gameusers where name = '".$r."'");
						@mysql_query("delete from gamemoves where username = '".$r."'");
						#$result = mysql_query($addsql);
					} else {
						
					}
				} else {
					
				}
			}
		}
	}*/
	@mysql_query("delete from gameusers where name = '".$r."'");
	@mysql_query("delete from gamemoves where username = '".$r."'");
	$result = mysql_query($addsql);
  $log->lwrite('$result = '.$result);
  if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query;
    die($message);
}

  $sql="SELECT * FROM gameusers WHERE name = '".$r."'";

$result = mysql_query($sql);
	
echo "[";
if($row = mysql_fetch_array($result))
  {
  echo "{id:'" . $row['id'] . "',name:'" . $row['name'] . "'}";
  }
while($row = mysql_fetch_array($result))
  {
  echo ",{id:'" . $row['id'] . "',name:'" . $row['name'] . "'}";
  }
echo "]";
	mysql_close($con);
	// close log file
	$log->lwrite('Successful');
}
catch(Exception $e)
  {
  #echo 'Message: ' .$e->getMessage();
  $log->lwrite(print_r('Message: ' .$e->getMessage(), true));
  }
$log->lclose();

?>