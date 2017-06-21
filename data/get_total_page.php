<?php
	header('Content-Type: application/json');
	//$conn = mysqli_connect('127.0.0.1','root','','xiumeitu_msg',3306);
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql = "SELECT COUNT(*) FROM messages";
	$result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
	$totalPage=intval($row['COUNT(*)']);
	echo $totalPage;
?>