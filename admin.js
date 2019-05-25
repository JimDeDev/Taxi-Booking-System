var xHRObject = createRequest();

const tableHeadings = ['Booking Ref', 'Customer Name', 'Customer Phone', 'Pickup Suburb', 'Dest Suburb', 'PickupTime'];

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

    var found = true;
    // if (bookings != null) {

    //     bookings.map((booking) => {
    //         console.log(booking.bookingRef + " " + formData.get('bookingRef'));
    //         if (formData.bookingRef == booking.bookingRef) {
    //             found = true;
    //             console.log('Found!!');
    //         }
    //     })
    // }

    if (found) {
            if (xHRObject) {
                xHRObject.open("POST", "assignTaxi.php");
        
                xHRObject.onreadystatechange = assignResponse;
                xHRObject.send(formData);    
            } else console.log('XHR error'); 

    } else {
        // First clear the message area
        messageDiv.innerHTML = "";

        // Create the message element
        var bookingFail = document.createElement('p');
        bookingFail.style.color = 'red';
        bookingFail.innerText = 'That booking reference is not valid or already booked';
        
        //Append it to the message div
        messageDiv.appendChild(bookingFail);
    }
}

function assignResponse() {

    if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {

        // First clear the message area
        messageDiv.innerHTML = "";

        // Create the message element
        var bookingSuccess = document.createElement('p');
        bookingSuccess.innerText = xHRObject.responseText + ' has been successfully assigned.';
        
        //Append it to the message div
        messageDiv.appendChild(bookingSuccess);
        viewBookings();
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