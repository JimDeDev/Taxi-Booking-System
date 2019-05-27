<?php
    /**
    * Web Development Assignment 2 - S1 2019
    * Name: Jaime king 
    * ID: 16959932  
    * This php file is used to get all the bookings from the database
    */
    require('databaseManager.php');
    $db = new DatabaseManager();

    // First checking if the database is connected
    if ($db->isConnected()) {

        // Get the bookings from the database
        $bookingsRS = $db->getBookings();

        // Adding all bookings to associative array
        $bookings = array();
        while($booking = mysqli_fetch_assoc($bookingsRS)) {
            $bookings[] = $booking;
        }

        // Returning array as JSON
        echo json_encode($bookings);
    } else {
        // If the database throws an error, 
        // a status of 500 is returned
        http_response_code(500);
        echo null;
    }
?>