<?php
    /**
    * Web Development Assignment 2 - S1 2019
    * Name: Jaime king 
    * ID: 16959932  
    * This php file is used to save bookings to the database
    */
    require("databaseManager.php");

    $db = new databaseManager();

    if ($db->isConnected()) {
        // Setting the default timezone to New Zealand
        date_default_timezone_set('Pacific/Auckland');

        // Creating an array to represent the booking so it 
        // can be returned as JSON and passed to the database manager.
        $booking = array(
            'bookingRef'   => uniqid("BID_"),
            'custName'     => $_POST['custName'],
            'custPhone'    => $_POST['custPhone'],
            'unitNumber'   => $_POST['unitNumber'],
            'streetNumber' => $_POST['streetNumber'],
            'streetName'   => $_POST['streetName'],
            'suburb'       => $_POST['suburb'],
            'destSuburb'   => $_POST['destSuburb'],
            'pickupTime'   => $_POST['pickupDate'] . ' ' . $_POST['pickupTime'],
            'bookingTime'  => date("Y-m-d H:i:s:v")
        );

        // Saving the booking to the database
        $db->save($booking);
        
        // Returning the booking as JSON
        echo json_encode($booking);
    } else {
        // If the database throws an error, 
        // a status of 500 is returned
        http_response_code(500);
        echo null;
    }
?>