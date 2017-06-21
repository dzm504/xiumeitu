<?php
	header('Content-Type: application/json');
	$page=$_REQUEST['page'];
	$pager = [
      'recordCount'=>0,			//�ܼ�¼��
      'pageSize'=>5,			//ҳ���С
      'pageCount'=>0,			//��ҳ��
      'currentPage'=>intval($page), //��ǰҳ��
      'data'=>null				//��ǰҳ����
    ];
	//$conn = mysqli_connect('127.0.0.1','root','','xiumeitu_msg',3306);
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql = "SELECT COUNT(*) FROM messages";
	$result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    $pager['recordCount'] = intval($row['COUNT(*)']);//count�������ص���һ���ַ�������Ҫ����Ϊ����
	$pager['pageCount'] = ceil($pager['recordCount']/$pager['pageSize']); //��ȡ��������ҳ������
	$start = ($pager['currentPage']-1)*$pager['pageSize']; //��������¼��ʼ��ȡ
	$count = $pager['pageSize'];//һ������ȡ�����м�¼
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