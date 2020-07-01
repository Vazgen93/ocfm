<?php
$admin = require PATH . "/config/db_info.php";

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

?>