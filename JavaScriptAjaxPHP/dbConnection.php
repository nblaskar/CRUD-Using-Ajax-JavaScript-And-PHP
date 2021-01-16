<?php
//Database Connection Creation
//Connection Variuables
$db_host="localhost";
$db_user="root";
$db_password="";
$db_name="ajaxphp";

//Connection Creation
$conn=new mysqli($db_host,$db_user,$db_password,$db_name);

//Check Connection
if($conn->connect_error){
    die("Connection Failed");
}
?>