<?php
	header('Content-Type: application/json');
	$page=$_REQUEST['page'];
	$pager = [
      'recordCount'=>0,			//总记录数
      'pageSize'=>5,			//页面大小
      'pageCount'=>0,			//总页数
      'currentPage'=>intval($page), //当前页号
      'data'=>null				//当前页数据
    ];
	//$conn = mysqli_connect('127.0.0.1','root','','xiumeitu_msg',3306);
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql = "SELECT COUNT(*) FROM messages";
	$result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    $pager['recordCount'] = intval($row['COUNT(*)']);//count函数返回的是一个字符串，需要解析为整数
	$pager['pageCount'] = ceil($pager['recordCount']/$pager['pageSize']); //上取整计算总页面数量
	$start = ($pager['currentPage']-1)*$pager['pageSize']; //从哪条记录开始读取
	$count = $pager['pageSize'];//一次最多读取多少行记录
    $sql = "SELECT * FROM messages LIMIT $start,$count";
	$result = mysqli_query($conn,$sql);
	$output = [];
	while(true){
		$row = mysqli_fetch_assoc($result);
		if($row == null){
			break;
		}
		$output[] = $row;
	}
	echo json_encode($output);
?>