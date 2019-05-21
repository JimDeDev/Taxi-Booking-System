<?php

    require("databaseManager.php");
    date_default_timezone_set('Pacific/Auckland');

    $db = new databaseManager();

    $booking = array(
        'bookingRef' => uniqid("BID_"),
        'custName'   => $_POST['custName'],
        'custPhone'  => $_POST['custPhone'],
        'unitNumber' => $_POST['unitNumber'],
        'streetNumber' => $_POST['streetNumber'],
        'streetName'   => $_POST['streetName'],
        'suburb'       => $_POST['suburb'],
        'destSuburb'   => $_POST['destSuburb'],
        'pickupTime'   => $_POST['pickupDate'] . ' ' . $_POST['pickupTime'],
        'bookingTime'  => date("Y-m-d H:i:s:v")
    );

    if ($db->save($booking)) {
        echo json_encode($booking);
    } else {
        echo null;
    }

?>