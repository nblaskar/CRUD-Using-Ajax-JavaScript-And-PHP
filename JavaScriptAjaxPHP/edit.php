<?php
include('dbConnection.php');
//When you click Edit button below code get executed
$data=stripslashes(file_get_contents("php://input"));
$mydata=json_decode($data, true);
$id=$mydata['sid'];

//Retrive Specific Student ,Information
$sql="SELECT * FROM student WHERE id={$id}";
$result=$conn->query($sql);
$row=$result->fetch_assoc();

//Returning JSON Fprmat Data As Response to Ajax Call
echo json_encode($row);
?>