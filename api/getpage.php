<?php
include('connect.php');
header("Access-Control-Allow-Origin: *");
$sql = "select count(*) shuliang from jiaoben";
    $res = $mysqli->query($sql);
    if (!$res) {
        die("sql error:\n" . $mysqli->error);
    }
$row= $res->fetch_assoc();
echo json_encode($row);
$mysqli->close();
?>