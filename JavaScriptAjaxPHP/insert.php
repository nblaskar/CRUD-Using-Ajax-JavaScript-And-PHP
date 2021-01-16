<?php

//Make dcConnection
include('dbConnection.php');

// Theory
        //stripslashes function can be used to clean up data retrieved from a database or from an HTML form

        //php://input - This is a read-only stream that allows us to read raw data from the request body. It returns all the raw data after the HTTP-headers of the request, regardless od the content type

        // json_decode - It takes JSON String and Conmvert it into PHP Objkects or Array, if true then associative array.

//Start Coding to insert Data

// //Received the data Comminmg through ajax from ajaxscript.js
// $data =file_get_contents("php://input");// received data from ajax request
// //OR

$data=stripslashes(file_get_contents("php://input"));//Received and cleanup the data

// //Convert row data into PHP Object
// $mydata=json_decode($data);
// //OR

//Convert row data into PHP  Array(Associative Array)
$mydata=json_decode($data, true);

//Access the Data
$id=$mydata['id'];
$name=$mydata['name'];
$email=$mydata['email'];
$password=$mydata['password'];

// //Insert data
// if(!empty($name) && !empty($email) && !empty($password)){
//         $sql="INSERT INTO student(name, email, password) VALUES('$name', '$email', '$password')";
//         if($conn->query($sql)== TRUE){
//                 echo "Student Save Successfully";
//         } else{
//                 echo "Unable to Save Information";
//         }
// } else{
//         echo "Fill All Fields";
// }


//Insert or Update data
if(!empty($name) && !empty($email) && !empty($password)){
        $sql="INSERT INTO student(id, name, email, password) VALUES('$id','$name', '$email', '$password') ON DUPLICATE KEY UPDATE name='$name', email='$email', password='$password'";
        if($conn->query($sql)== TRUE){
                echo "Student Save Successfully";
        } else{
                echo "Unable to Save Information";
        }
} else{
        echo "Fill All Fields";
}



?>