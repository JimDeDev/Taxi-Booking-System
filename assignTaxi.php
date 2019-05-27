<?php
    /**
    * Web Development Assignment 2 - S1 2019
    * Name: Jaime king 
    * ID: 16959932  
    * This php file is used to assign a taxi to a booking
    */

    require("databaseManager.php");
    $db = new databaseManager();

    $bookingRef = $_POST['bookingRef'];

    if ($db->isConnected()) {
        
        $success = $db->updateBookingStatus($bookingRef, 'assigned');

        // Return bookingRef if booking exists 
        // or null if it doesn't match any entries

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