<h3>Add Vulnerability</h3>

<form action="" method="post">
    <table>
        <tr>
            <td>Status</td>
            <td><input type="radio" name="status" id="" value="Open">Open</td>
        </tr>
        <tr>
            <td>Plugin ID</td>
            <td><input type="number" name="plugin_id" placeholder="Plugin ID" required></td>
        </tr>
        <tr>
            <td>Vulnerability</td>
            <td><input type="text" name="vulnerability" placeholder="Vulnerability" required></td>
        </tr>
        <tr>
            <td>Severity</td>
            <td> <input type="text" name="severity" id="" required></td>
        </tr>
        <tr>
            <td>Hostname</td>
            <td><input type="text" name="hostname" id="" required></td>
        </tr>
        <tr>
            <td>IP Address</td>
            <td><input type="text" name="ip" id="" required></td>
        </tr>
        <tr>
            <td>Count</td>
            <td><input type="number" name="count" id="" required></td>
        </tr>
        <tr>
            <td>Date Found</td>
            <td><input type="date" name="date_found" id="" required></td>
        </tr>
        <tr>
            <td>Date Remediated</td>
            <td><input type="date" name="date_remediated" id="" required></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="submit" name="proses" id=""></td>
        </tr>
        <tr>
            <td></td>
            <td><button><a href="infrastructure.php">Back</a></button></td>
        </tr>
    </table>
</form>

<?php
include "connection.inc.php";

if (isset($_POST['proses'])) {
    $status = $_POST['status'];
    $plugin_id = $_POST['plugin_id'];
    $vulnerability = $_POST['vulnerability'];
    $severity = $_POST['severity'];
    $hostname = $_POST['hostname'];
    $ip = $_POST['ip'];
    $count = $_POST['count'];
    $date_found = $_POST['date_found'];
    $date_remediated = $_POST['date_remediated'];

    // Use prepared statements to prevent SQL injection
    $stmt = $connection->prepare("INSERT INTO infra_vulns (status, plugin_id, vulnerability, severity, hostname, ip, count, date_found, date_remediated)
                                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("sissssiss", $status, $plugin_id, $vulnerability, $severity, $hostname, $ip, $count, $date_found, $date_remediated);

    if ($stmt->execute()) {
        echo "Data Vulnerability telah ditambahkan";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}
?>