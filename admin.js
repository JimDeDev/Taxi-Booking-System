/**
 * This file contains functions that are used on the admin.html page
 * These functions include viewBookings and assignTaxi.
 */

var xHRObject = createRequest();

const tableHeadings = ['Booking Ref', 'Customer Name', 'Customer Phone', 'Pickup Suburb', 'Dest Suburb', 'Pickup Time'];

var messageDiv = document.getElementById('message');

var bookings = null;

function viewBookings() {
    if (xHRObject) {
        xHRObject.open("GET", "viewBookings.php");

        xHRObject.onreadystatechange = updateBookingsList;
        xHRObject.send(null);    
    } else console.log('XHR error'); 
}

function assignTaxi() {
    formData = new FormData(document.forms.assignForm);

    if (xHRObject) {
        xHRObject.open("POST", "assignTaxi.php");

        xHRObject.onreadystatechange = assignResponse;
        xHRObject.send(formData);    
    } else console.log('XHR error'); 
}

function assignResponse() {



    if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {

        // First clear the message area
        messageDiv.innerHTML = "";
        console.log(xHRObject.responseText);
        console.log(xHRObject.status);

        // Create the message element
        var bookingMessage = document.createElement('p');
        
        if (xHRObject.responseText != '0') {
            bookingMessage.style.color = 'unset';
            bookingMessage.innerText = xHRObject.responseText + ' has been successfully assigned.';
        } else {
            bookingMessage.style.color = 'red';
            bookingMessage.innerText = 'There are no bookings matching that reference.';
        }
        
        //Append it to the message div
        messageDiv.appendChild(bookingMessage);
        // Update the booking table
        viewBookings();
    } else if ((xHRObject.readyState == 4) && (xHRObject.status == 500)) {

        // First clear the message area
        messageDiv.innerHTML = "";

        // If there was a server error then an error will be shown 
        var errorMessage = document.createElement('p');
        errorMessage.innerHTML = "There was an error processing your request. Please retry in a few minutes.";
        errorMessage.style.color = "red";
        messageDiv.appendChild(errorMessage);
    }
}

function updateBookingsList() {

    var bookingsTable = document.getElementById('bookings');

    if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {

        bookings = JSON.parse(xHRObject.responseText);

        bookingsTable.innerHTML = "";
        
        var tableHead = document.createElement('thead');
        var tableRow = document.createElement('tr');
        tableHeadings.map((heading) => {
            var headElement = document.createElement('th');
            headElement.innerText = heading;
            tableRow.appendChild(headElement);
        })
        tableHead.appendChild(tableRow);
        bookingsTable.appendChild(tableHead);

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