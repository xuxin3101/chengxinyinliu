<?php
include('connect.php');
header("Access-Control-Allow-Origin: *");
if (!empty($_POST['id'])) {
$id=$_POST['id'];
$sql="select * from case1 where id=$id";
$res = $mysqli->query($sql);
if (!$res) {
    die("sql error:\n" . $mysqli->error);
}
$row= $res->fetch_assoc();
$cishu=$row['count'];
$cishu=$cishu+1;
$sql="update case1 set count=$cishu where id = $id";
$res = $mysqli->query($sql);
echo json_encode($row);
}
else
echo  "error";
$mysqli->close();

?>

