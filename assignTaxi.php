<?php
    /**
     * This php file is used to assign a taxi to a booking
     */

    require("databaseManager.php");

    $db = new databaseManager();

    // print_r(array_keys($_POST));

    $bookingRef = $_POST['bookingRef'];

    if ($db->isConnected()) {
        
        $success = $db->updateBookingStatus($bookingRef, 'assigned');

        // Return bookingRef if booking exists or null if it doesn't

        if ($success == '1') {
            echo $bookingRef;
        } else {
            echo $success;
        } 
 

    } else {
        // If the database is not connected, 
        // a status of 500 is returned
        http_response_code(500);
        echo null;
    }
?>