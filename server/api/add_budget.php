<?php
include "connection.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $budget_name = $_POST['budget_name'];
    $budget_amount = $_POST['budget_amount'];
    $user_id = $_POST['user_id'];

    $query = $connection->prepare("INSERT INTO budgets (budget_name, budget_amount, user_id) VALUES (?, ?, ?)");
    $query->bind_param("sdi", $budget_name, $budget_amount, $user_id);

    if ($query->execute()) {
        echo "Budget added successfully";
    } else {
        echo "Error: " . $query->error;
    }

    $query->close();
}
$connection->close();

?>
