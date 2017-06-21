<?php
	$username = $_REQUEST['username'];
	$pwd = $_REQUEST['userpwd'];
	//$conn = mysqli_connect('127.0.0.1','root','','myblog',3306);
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql = "SELECT * FROM users WHERE username='$username' AND pwd='$pwd'";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_assoc($result);
	if($row===NULL){
		$row['code']=0;//登陆失败
	}else{
		$row['code']=1;//登陆成功
	}
	echo json_encode($row);
?>