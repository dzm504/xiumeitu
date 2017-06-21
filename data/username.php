<?php
	$username = $_REQUEST['username'];
	//$conn = mysqli_connect('127.0.0.1','root','','myblog',3306);
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql = "SELECT * FROM users WHERE username = '$username'";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_assoc($result);
	if($row===NULL){
		echo "unexist";
	}else{
		echo "exist";
	}
?>