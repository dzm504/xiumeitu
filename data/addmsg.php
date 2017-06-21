<?php
	header('Content-Type: text/plain');
	$uname = $_REQUEST['username'];
	$msg = $_REQUEST['msg'];
	$createtime = time()*1000;
	//$conn = mysqli_connect('127.0.0.1','root','','xiumeitu_msg',3306);
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql = "INSERT INTO messages VALUES(NULL,'$uname','$msg','$createtime')";
	$result = mysqli_query($conn,$sql);
	if($result){
		echo 'succ';
	}else {	
		echo "err";
	}
?>