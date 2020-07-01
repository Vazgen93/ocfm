<?php
$admin = require "./db_info.php";
$_db = new mysqli(
    $admin['host'],
    $admin['user'],
    $admin['password'],
    $admin['db_name']
);

if ($_db->connect_error) {
    die('Ошибка подключения (' . $_db->connect_errno . ') '
            . $_db->connect_error);
}
$product = $_db->query("SELECT `name`, `covers`,`price`, `quantity` FROM `product` WHERE `id`= $_POST[id]");
$data = [];

while ($res = $product->fetch_assoc()) {
    $data[] = $res;
};



echo json_encode($data);

?>