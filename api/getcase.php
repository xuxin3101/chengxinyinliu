<?php
include('connect.php');
header("Access-Control-Allow-Origin: *");
if (empty($_GET['page'])) {
    $data=[];
    $sql = "select title,logo,id,time,count from case1 order by id  limit 0,9;";
    $res = $mysqli->query($sql);
    if (!$res) {
        die("sql error:\n" . $mysqli->error);
    }
    while ($row= $res->fetch_assoc()) {
        array_push($data, $row);
    }
    echo json_encode($data);
}
else{
$page=$_GET['page'];
$start=($page-1)*10;
$end=$start+9;
$data=[];
$sql = "select title,logo,id,time,count from case1 order by id  limit $start,$end;";
$res = $mysqli->query($sql);
if (!$res) {
    die("sql error:\n" . $mysqli->error);
}
while ($row= $res->fetch_assoc()) {
    array_push($data, $row);
}
echo json_encode($data);
}
$mysqli->close();
?>

