<?php
    require('databaseManager.php');
    $db = new DatabaseManager();


    if ($db->isConnected()) {

        $bookingsRS = $db->getBookings();

        $bookings = array();
        while($booking = mysqli_fetch_assoc($bookingsRS)) {
            $bookings[] = $booking;
        }

        echo json_encode($bookings);
    } else {
        // If the database throws an error, 
        // a status of 500 is returned
        http_response_code(500);
        echo null;
    }
?>