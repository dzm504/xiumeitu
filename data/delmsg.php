<?php
	header('Content-Type: text/plain');
	$id = $_REQUEST['mid'];
	//$conn = mysqli_connect('127.0.0.1','root','','xiumeitu_msg',3306);
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql = "DELETE FROM messages WHERE mid='$id'";
	$result = mysqli_query($conn,$sql);
	if($result){
		echo 'succ';
	}else {
		echo "err";
	}
?>