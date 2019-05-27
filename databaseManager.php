<?php
  /**
   * The DatabaseManager class is used by any php file that
   * needs to access the database
   * This class provides functionality to query the database for bookings 
   * and functions to change the status of a booking.
   */

  class DatabaseManager {

    private $conn;

    /**
     * Database constructor
     * This will connect and create the table
     */
    public function __construct() {
      $this->db_connect();
      $this->create_tables();
    }

    // Closing connection on destruction
    public function __destruct(){
      if ($this->conn) {
        mysqli_close($this->conn);
      }
    }

    // Connect to the database
    function db_connect() {
      require_once("../../conf/settings.php");
      $this->conn = @mysqli_connect($dbHost, $dbUser, $dbPass, $db);
    }

    /**
     * This function will create the table if it
     * is nor already created 
     */
    public function create_tables() {
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
    }

    /**
     * This function will return a resultset containing 
     * all bookings where pickupTime is between 
     * the current time and 2 hours from the current time
     */
    public function getBookings() {
      $query = "SELECT * FROM bookings 
        WHERE status = 'unassigned'
        AND pickupTime < (CURRENT_TIMESTAMP() + INTERVAL 2 HOUR)
        AND pickupTime > (CURRENT_TIMESTAMP())";

      $result = @mysqli_query($this->conn, $query);

      return $result;
    }

    /**
     * This function will update a bookings status with the 
     * given status if the bookingRef matched a booking
     */
    public function updateBookingStatus($bookingRef, $status) {

      // First check that the booking exists
      $bookingExists = $this->getBooking($bookingRef);

      if ($bookingExists) {
        $query = "UPDATE bookings 
          SET status = '{$status}' 
          WHERE bookingRef = '{$bookingRef}'
          AND status = 'unassigned';"; 
  
        @mysqli_query($this->conn, $query);
      }
      return $bookingExists;
    }

    /**
     * Returns true if connection is active
     * or false if connection is dead
     */
    public function isConnected() {
      return $this->conn;
    }

    /**
     * This function takes a bookingRed and will 
     * return 1 if booking exists or 0 if not
     */
    public function getBooking($bookingRef) {
      $query = "SELECT * FROM bookings 
      WHERE bookingRef = '{$bookingRef}'";

      $result = @mysqli_query($this->conn, $query);

      return mysqli_num_rows($result);
    }
  }
?>
