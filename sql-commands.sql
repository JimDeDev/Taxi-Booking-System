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

  ## Example Booking Insert (Missing status as it isautomatically populated)
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
  VALUES ('matt', '0275033693', 'A', '22', 'Simon Ave', 'Mount Roskill', 'Avondale', '2019-05-19 00:00:00', '2019-05-19 00:00:00');

## Selecting all booking within the next two hours
SELECT * FROM bookings WHERE pickupTime < (CURRENT_TIMESTAMP() + INTERVAL 2 HOUR)

## Command used to set all bookings to unassigned
UPDATE bookings SET status = 'unassigned';

## Command used to set all pickup times to 2 hours from now
UPDATE bookings SET pickupTime = (CURRENT_TIMESTAMP() + INTERVAL 2 HOUR)

