<?php

include 'db.php';

if (isset($_GET["id"])) {
    $id = intval($_GET["id"]);

    $sql = "SELECT id, name, description, price, image FROM products WHERE id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode(array());
    }
}

$conn->close();







?>
