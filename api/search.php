<?php
include('connect.php');
header("Access-Control-Allow-Origin: *");
if (!empty($_POST['keyword'])) {
    $data=[];
    $keyword=$_POST['keyword'];
    $sql = "select title,logo,id,time,cishu from jiaoben where content like '%$keyword%' or title like '%$keyword%';";
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
echo 'error';
}


$mysqli->close();

?>

