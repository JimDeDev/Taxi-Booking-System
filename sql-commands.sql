##### REMEMBER TO CHANGE THIS TO TXT BEFORE SUBMISSION ######

# SQL Commands

## Bookings Table Creation
CREATE TABLE IF NOT EXISTS `bookings` (
  `bookingRef` int(11) NOT NULL PRIMARY KEY,
  `custName` varchar(30) NOT NULL,
  `custPhone` varchar(15) NOT NULL,
  `unitNumber` varchar(5) DEFAULT NULL,
  `streetNumber` varchar(5) NOT NULL,
  `streetName` varchar(15) NOT NULL,
  `suburb` varchar(20) NOT NULL,
  `destSuburb` varchar(20) NOT NULL,
  `pickupTime` datetime NOT NULL,
  `bookingTime` datetime NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'unassigned');

  ## Example Booking Insert (Missing bookingRef and status as they are automatically populated)
  INSERT INTO `bookings`(
    `custName`,
    `custPhone`,
    `unitNumber`,
    `streetNumber`,
    `streetName`,
    `suburb`,
    `destSuburb`,
    `pickupTime`,
    `bookingTime`) 
  VALUES ('matt', '0275033693', 'A', '33', 'Hamon Ave', 'Mount Roskill', 'Avondale', '2019-05-19 00:00:00', '2019-05-19 00:00:00');