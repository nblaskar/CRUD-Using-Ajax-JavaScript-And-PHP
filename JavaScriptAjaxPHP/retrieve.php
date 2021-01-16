<?php
include('dbConnection.php');

//Retrieve Student Information
$sql="SELECT * FROM student";
$result=$conn->query($sql);
if($result->num_rows > 0){
    $data=array();
    while($rows=$result->fetch_assoc()){
        $data[]=$rows;
    }
}else{
    echo "0 Results";
}
//Returning JSON Format Data as Response to Ajax Call
echo json_encode($data);

?>