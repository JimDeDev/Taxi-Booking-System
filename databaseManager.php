<?php
  class DatabaseManager {

    private $conn;

    public function __construct() {
      $this->db_connect();
      $this->create_tables();
    }

    // Closing connection on destruction
    public function __destruct()
    {
      if ($this->conn) {
        mysqli_close($this->conn);
      }
    }

	function db_connect() {
		// connect to the database
		require_once("../../conf/settings.php");
		$this->conn = @mysqli_connect($dbHost, $dbUser, $dbPass, $db);
		  // or die("<p>The database server is not available.</p>");
	}

    public function create_tables() {
      //Prepare the tables if they are not already created
      $query = "CREATE TABLE IF NOT EXISTS `bookings` (
        `bookingRef` varchar(18) NOT NULL PRIMARY KEY,
        `custName` varchar(30) NOT NULL,
        `custPhone` varchar(15) NOT NULL,
        `unitNumber` varchar(5) DEFAULT NULL,
        `streetNumber` varchar(5) NOT NULL,
        `streetName` varchar(15) NOT NULL,
        `suburb` varchar(20) NOT NULL,
        `destSuburb` varchar(20) NOT NULL,
        `pickupTime` datetime NOT NULL,
        `bookingTime` datetime NOT NULL,
        `status` varchar(15) NOT NULL DEFAULT 'unassigned');";

      @mysqli_query($this->conn, $query);
      //  or die("<p>Table creation script failed.</p>");
    }

    public function save($booking) {

      $query = "INSERT INTO `bookings`(`bookingRef`, `custName`, `custPhone`, `unitNumber`, `streetNumber`, `streetName`, `suburb`, `destSuburb`, `pickupTime`,`bookingTime`) 
      VALUES (
        '{$booking['bookingRef']}',
        '{$booking['custName']}', 
        '{$booking['custPhone']}', 
        '{$booking['unitNumber']}', 
        '{$booking['streetNumber']}', 
        '{$booking['streetName']}', 
        '{$booking['suburb']}', 
        '{$booking['destSuburb']}', 
        '{$booking['pickupTime']}', 
        '{$booking['bookingTime']}');";

      @mysqli_query($this->conn, $query);
      // or die("<p>insert script failed.</p>");
    }

    public function isConnected() {
      return $this->conn;
    }
  }
?>
