<?php
header('Content-Type: application/json');
define('PATH', dirname(__FILE__));

require_once PATH . "/config/config.php";
if ($_POST) {
    # code...
}
$product = $_db->query("SELECT * FROM `product` ORDER BY `id` LIMIT 10 OFFSET 0");
if(!empty($_POST)){
    if ($_POST['pag'] == 1) {
        $product = $_db->query("SELECT * FROM `product` LIMIT 10 OFFSET 0");
    }
    if ($_POST['pag'] == 2) {
        $product = $_db->query("SELECT * FROM `product` LIMIT 10 OFFSET 10");
    }
    if ($_POST['pag'] == 3) {
        $product = $_db->query("SELECT * FROM `product` LIMIT 10 OFFSET 20");
    }
    if ($_POST['pag'] == 4) {
        $product = $_db->query("SELECT * FROM `product` LIMIT 10 OFFSET 30");
    }
    if ($_POST['pag'] == 5) {
        $product = $_db->query("SELECT * FROM `product` LIMIT 10 OFFSET 40");
    }
}
$data = [];

while ($res = $product->fetch_assoc()) {
    $data[] = $res;
};



echo json_encode($data);
// echo json_encode($_POST);
