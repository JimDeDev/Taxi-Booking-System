<?php
    require("databaseManager.php");

    $db = new databaseManager();

    // print_r(array_keys($_POST));

    $bookingRef = $_POST['bookingRef'];

    if ($db->isConnected()) {
        
        $success = $db->updateBookingStatus($bookingRef, 'assigned');
        echo $bookingRef;
    } else {
        // If the database throws an error, 
        // a status of 500 is returned
        http_response_code(500);
        echo null;
    }
?>