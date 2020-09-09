<?php 


// Connect to your MySQL database.
$hostname = "localhost";
$username = "root";
$password = "";
$database = "information_schema";

$conn = new mysqli($hostname, $username, $password,$database);

if ($conn->connect_errno) {
  echo "Failed to connect to MySQL: " . $conn->connect_error;
  exit();
}
$sql = "SELECT table_name FROM tables WHERE table_schema = 'constructie_old'";
$result = $conn->query($sql);

$conn->close();
$conn2 = new mysqli($hostname, $username, $password,'constructie_old');

if ($conn2->connect_errno) {
  echo "Failed to connect to MySQL: " . $conn2->connect_error;
  exit();
}

foreach ($result->fetch_all() as $key => $table) {
$sql = "UPDATE ". $table[0]. " SET id_lang=3 WHERE id_lang=1";
$sql2 = "UPDATE ". $table[0]. " SET id_lang=1 WHERE id_lang=2";


	if ($conn2->query($sql) === TRUE && $conn2->query($sql2) === TRUE) {
	  echo $table[0]." Record updated successfully<br><br>";
	} else {
	  echo $table[0] ."Error updating record: " . $conn->error."<br><br>";
	}
}
$conn2->close();


 ?>