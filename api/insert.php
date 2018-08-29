<?php
include('connect.php');
header("Access-Control-Allow-Origin: *");
if (!empty($_POST['name'])) {
    $name=$_POST['name'];
    $phone=$_POST['phone'];
    $mail=$_POST['mail'];
    $content=$_POST['content'];
    $sql = "insert into msg(id,name,phone,mail,content) values(null,'$name','$phone','$mail','$content')";
    $res = $mysqli->query($sql);
    if (!$res) {
        die("sql error:\n" . $mysqli->error);
    }
    echo $res;
}
else
{
    echo '0';
}

$mysqli->close();
?>

