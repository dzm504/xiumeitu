<?php
	$username=$_REQUEST['username'];
	$userpwd=$_REQUEST['userpwd'];
	$email=$_REQUEST['email'];
	//$conn = mysqli_connect('127.0.0.1','root','','myblog',3306);
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql = "INSERT INTO users VALUES(NULL,'$username','$userpwd','$email')";
	$result = mysqli_query($conn,$sql);
	if($result){
		echo 'succ';
	}else{
		echo 'erro';
	}
?>