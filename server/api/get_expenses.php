<?php
include "connection.php";

$sql = "SELECT expense_name, expense_amount, category, date FROM expenses";
$result = $connection->query($sql);

$expenses = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $expenses[] = $row;
    }
}

echo json_encode($expenses);

$connection->close();
?>
