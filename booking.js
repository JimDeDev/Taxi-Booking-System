var xHRObject = createRequest();

function submitBooking() {
    console.log("submitBooking called");

    const formItems = document.forms.bookingForm;
    let valid = true;
    const currentTime = new Date();

    resetFormBorders();

    if (formItems.custName.value == "") {
        valid = false;
        document.getElementById('custName').style.borderColor = 'red';
    }

    if (formItems.custPhone.value == "") {
        valid = false;
        document.getElementById('custPhone').style.borderColor = 'red';
    }

    if (formItems.streetNumber.value == "") {
        valid = false;
        document.getElementById('streetNumber').style.borderColor = 'red';
    }

    if (formItems.streetName.value == "") {
        valid = false;
        document.getElementById('streetName').style.borderColor = 'red';
    }

    if (formItems.suburb.value == "") {
        valid = false;
        document.getElementById('suburb').style.borderColor = 'red';
    }

    if (formItems.destSuburb.value == "") {
        valid = false;
        document.getElementById('destSuburb').style.borderColor = 'red';
    }

    if (formItems.pickupDate.value != "" && formItems.pickupTime.value != "") {
        var inputDate = new Date(formItems.pickupDate.value + ' ' + formItems.pickupTime.value);

        if (inputDate < currentTime) {
            valid = false;
            document.getElementById('pickupDate').style.borderColor = 'red';
            document.getElementById('pickupTime').style.borderColor = 'red';
        }

    } else {
        valid = false;
        document.getElementById('pickupDate').style.borderColor = 'red';
        document.getElementById('pickupTime').style.borderColor = 'red';
    }

    if (valid) {
        console.log("Saving to DB");
        saveBooking(formItems);
    }
}

function saveBooking(formItems) {
    formData = new FormData(formItems);

    xHRObject.open("POST", "saveBooking.php");

    xHRObject.onreadystatechange = processBookingResponse;
    xHRObject.send(formData);
}

function processBookingResponse() {
    var contentDiv = document.getElementById('content');

    if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {

        console.log("Response Text");
        console.log(xHRObject.responseText);

        const booking = JSON.parse(xHRObject.responseText);

        console.log("Response Text as JSON");
        console.log(booking);

        var bookingDiv = document.createElement('div');
        bookingDiv.className = 'booking-card';
        var title = document.createElement('h3');
        title.innerText = 'Booking successful!';
        bookingDiv.appendChild(title);

        var bookingRefNode = document.createElement('p')
        bookingRefNode.innerHTML = '<b>Booking Reference: </b>' + booking.bookingRef;
        bookingDiv.appendChild(bookingRefNode);
        
        var custNameNode = document.createElement('p')
        custNameNode.innerHTML = '<b>Customer Name: </b>' + booking.custName;
        bookingDiv.appendChild(custNameNode);
        
        var custPhoneNode = document.createElement('p')
        custPhoneNode.innerHTML = '<b>Customer Phone: </b>' + booking.custPhone;
        bookingDiv.appendChild(custPhoneNode);
        
        var pickupAddress = booking.streetNumber + booking.unitNumber + ' ' + booking.streetName + ', ' + booking.suburb;

        var pickupAddressNode = document.createElement('p')
        pickupAddressNode.innerHTML = '<b>Pickup Address: </b>' + pickupAddress;
        bookingDiv.appendChild(pickupAddressNode);
        
        var pickupTimeNode = document.createElement('p')
        pickupTimeNode.innerHTML = '<b>Pickup Time: </b>' + booking.pickupTime;
        bookingDiv.appendChild(pickupTimeNode);

        contentDiv.removeChild(document.getElementById('bookingForm'));
        contentDiv.appendChild(bookingDiv);

    } else if (xHRObject.readyState == 4 && xHRObject.status == 500) {
        var errorMessage = document.createElement('p');
        errorMessage.innerHTML = "There was an error processing your request";
        errorMessage.style.color = "red";
        contentDiv.appendChild(errorMessage);

    }
}

function resetFormBorders() {
    document.getElementById('custName').style.borderColor = '#ccc';
    document.getElementById('custPhone').style.borderColor = '#ccc';
    document.getElementById('streetNumber').style.borderColor = '#ccc';
    document.getElementById('streetName').style.borderColor = '#ccc';
    document.getElementById('suburb').style.borderColor = '#ccc';
    document.getElementById('destSuburb').style.borderColor = '#ccc';
    document.getElementById('pickupDate').style.borderColor = '#ccc';
    document.getElementById('pickupTime').style.borderColor = '#ccc';
}

function setDateToToday() {
    var date = new Date();
    document.getElementById('pickupDate').value = date.getFullYear() + "-" + addLeadingZero(date.getMonth() + 1) + "-" + addLeadingZero(date.getDate());

}

function addLeadingZero(aDateSegment) {
    if (aDateSegment < 10) return "0" + aDateSegment;
    return aDateSegment;
}