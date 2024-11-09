<?php
include "connection.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $expense_name = $_POST['expense_name'];
    $expense_amount = $_POST['expense_amount'];
    $category = $_POST['category'];
    $date = $_POST['date'];
    $user_id = $_POST['user_id'];

    $query = $connection->prepare("INSERT INTO expenses (expense_name, expense_amount, category, date, user_id) VALUES (?, ?, ?, ?, ?)");
    $query->bind_param("sdssi", $expense_name, $expense_amount, $category, $date, $user_id);

    if ($query->execute()) {
        echo "Expense added successfully";
    } else {
        echo "Error";
    }

    $query->close();
}
$connection->close();
?>
