<?php

include 'db.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id = $_POST["id"];
    $name = $_POST["name"];
    $description = $_POST["description"];
    $price = $_POST["price"];
    $image = $_FILES["image"]["name"];


    if ($image) {

        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["image"]["name"]);

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {

            $sql = "UPDATE products SET name = '$name', description = '$description', price = '$price', image = '$image' WHERE id = $id";
        } else {
            echo "Error uploading file.";
            exit();
        }
    } else {

        $sql = "UPDATE products SET name = '$name', description = '$description', price = '$price' WHERE id = $id";
    }

    if ($conn->query($sql) === TRUE) {
        echo "Product updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}


$conn->close();

?>
