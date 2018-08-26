<?php
include('connect.php');
header("Access-Control-Allow-Origin: *");
    $data=[];
    $sql = "select title,logo,id from jiaoben";
    $res = $mysqli->query($sql);
    if (!$res) {
        die("sql error:\n" . $mysqli->error);
    }
    while ($row= $res->fetch_assoc()) {
        array_push($data,$row);
    }
    echo json_encode($data);


$mysqli->close();

?>

