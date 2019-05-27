/**
 * Web Development Assignment 2 - S1 2019
 * Name: Jaime king 
 * ID: 16959932  
 * 
 * This file contains functions that are used on the admin.html page
 * These functions include viewBookings and assignTaxi.
 */

var xHRObject = createRequest();
// This array holds the headings for the booking table
const tableHeadings = ['Booking Ref', 'Customer Name', 'Customer Phone', 'Pickup Suburb', 'Dest Suburb', 'Pickup Time'];

var messageDiv = document.getElementById('message');

var bookings = null;
/**
 * This function is called by the user
 * It will send an XHR request to the back end to retrieve bookings
 */
function viewBookings() {
    if (xHRObject) {
        xHRObject.open("GET", "viewBookings.php");

        xHRObject.onreadystatechange = updateBookingsList;
        xHRObject.send(null);    
    } else console.log('XHR error'); 
}

/**
 * This function is called by the user
 * It will send an XHR request to the back end with a bookingRef to assign a taxi
 */
function assignTaxi() {
    formData = new FormData(document.forms.assignForm);

    if (xHRObject) {
        xHRObject.open("POST", "assignTaxi.php");

        xHRObject.onreadystatechange = assignResponse;
        xHRObject.send(formData);    
    } else console.log('XHR error'); 
}

// This function is called by the XHR object when its state changes
// It will update the message area with the appropriate message
function assignResponse() {
    if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {

        // First clear the message area
        messageDiv.innerHTML = "";

        // Create the message element
        var bookingMessage = document.createElement('p');
        
        // If the XHR object returns 0 then the booking does not exist
        if (xHRObject.responseText == '0') {
            bookingMessage.className = 'error-message';
            bookingMessage.innerText = 'There are no bookings matching that reference.';
        } else {
            bookingMessage.innerText = 'The  booking request ' + xHRObject.responseText + ' has been properly assigned.';
        }

        // Emptying the bookingRef text field
        document.getElementById('bookingRef').value = '';
        
        //Append it to the message div
        messageDiv.appendChild(bookingMessage);
        // Update the booking table
        viewBookings();
    } else if ((xHRObject.readyState == 4) && (xHRObject.status == 500)) {

        // First clear the message area
        messageDiv.innerHTML = "";

        // If there was a server error then an error will be shown 
        var errorMessage = document.createElement('p');
        errorMessage.innerText = "There was an error processing your request. Please retry in a few minutes.";
        errorMessage.className = 'error-message';
        messageDiv.appendChild(errorMessage);
    }
}
// This function is called by the XHR object when its state changes
// It will update the booking table with the correct bookings
function updateBookingsList() {
    var bookingsTable = document.getElementById('bookings');
    if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {

        bookings = JSON.parse(xHRObject.responseText);

        // First clearing the table 
        bookingsTable.innerHTML = "";
        
        // Creating the table headings 
        var tableHead = document.createElement('thead');
        var tableRow = document.createElement('tr');
        tableHeadings.map((heading) => {
            var headElement = document.createElement('th');
            headElement.innerText = heading;
            tableRow.appendChild(headElement);
        })
        tableHead.appendChild(tableRow);
        bookingsTable.appendChild(tableHead);

        // Creating a table row for each booking
        bookings.map((b) => {
            var tr = document.createElement('tr');

            var td = document.createElement('td');
            td.textContent = b.bookingRef;
            tr.appendChild(td);

            var td = document.createElement('td');
            td.textContent = b.custName;
            tr.appendChild(td);

            var td = document.createElement('td');
            td.textContent = b.custPhone;
            tr.appendChild(td);

            var td = document.createElement('td');
            td.textContent = b.suburb;
            tr.appendChild(td);

            var td = document.createElement('td');
            td.textContent = b.destSuburb;
            tr.appendChild(td);

            var td = document.createElement('td');
            td.textContent = b.pickupTime;
            tr.appendChild(td);

            bookingsTable.appendChild(tr);
        })
    }
}