<?php 

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "expense_tracker";


$connection = new mysqli($host,$user,$pass,$dbname); //mysqpli: a class inside php whicht stand for mysql improved for which has enhanced features


if($connection->connect_error){
    die("Error happened");
} 

