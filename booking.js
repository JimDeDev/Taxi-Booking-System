/**
 * This file is used on the booking.html page.
 * it contains functions such as form validation
 * and saveBooking
 */

var xHRObject = createRequest();

// Preloading the date field with today
setDateToToday();
var messageDiv = document.getElementById('message');

// This function will validate the inputs and save to db if valid
function submitBooking() {
    console.log("submitBooking called");

    const formItems = document.forms.bookingForm;
    var errors = [];
    const currentTime = new Date();

    resetFormBorders();

    if (formItems.custName.value == "") {
        errors.push('Customer name is required.');
        document.getElementById('custName').style.borderColor = 'red';
    }

    if (formItems.custPhone.value == "") {
        errors.push('Customer phone is required.');
        document.getElementById('custPhone').style.borderColor = 'red';
    }

    if (formItems.streetNumber.value == "") {
        errors.push('Street number is required.');
        document.getElementById('streetNumber').style.borderColor = 'red';
    }

    if (formItems.streetName.value == "") {
        errors.push('Street name is required.');
        document.getElementById('streetName').style.borderColor = 'red';
    }

    if (formItems.suburb.value == "") {
        errors.push('Pickup suburb is required.');
        document.getElementById('suburb').style.borderColor = 'red';
    }

    if (formItems.destSuburb.value == "") {
        errors.push('Destination suburb is required.');
        document.getElementById('destSuburb').style.borderColor = 'red';
    }

    if (formItems.pickupDate.value != "" && formItems.pickupTime.value != "") {

        // Verifying that the given date and time is past the current time
        var inputDate = new Date(formItems.pickupDate.value + ' ' + formItems.pickupTime.value);

        console.log('years ' + (inputDate.getFullYear() < currentTime.getFullYear()));
        
        if (inputDate < currentTime) {
            errors.push('Pickup time must be in the future.');
            document.getElementById('pickupDate').style.borderColor = 'red';
            document.getElementById('pickupTime').style.borderColor = 'red';
        }
    } else {
        errors.push('Pickup date and time is required.');
        document.getElementById('pickupDate').style.borderColor = 'red';
        document.getElementById('pickupTime').style.borderColor = 'red';
    }

    if (errors.length == 0) {
        console.log("Saving to DB");
        saveBooking(formItems);
    } else {
        messageDiv.innerHTML = "";

        var errorTitle = document.createElement('p');
        errorTitle.innerText = "There was one or more issues with your details, please fix the following errors and try again.";
        errorTitle.className = 'error-message';
        messageDiv.appendChild(errorTitle);

        // Create the list to hold error messages
        var list = document.createElement('ul');
        
        // Add all errors to the error list
        errors.map((error) => {
            var errorMessage = document.createElement('li');
            errorMessage.innerText = error;
            errorMessage.className = 'error-message';
            
            list.appendChild(errorMessage);
        })
        messageDiv.appendChild(list);
    }
}

function saveBooking(formItems) {
    formData = new FormData(formItems);

    xHRObject.open("POST", "saveBooking.php");

    xHRObject.onreadystatechange = processBookingResponse;
    xHRObject.send(formData);
}

function processBookingResponse() {

    if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {

        // Parse the response text to get JSON 
        const booking = JSON.parse(xHRObject.responseText);

        // Clear the form and message div
        messageDiv.innerHTML = "";
        document.getElementById('bookingForm').style.display ='none';

        // Create message elements and append them to message div
        var title = document.createElement('h3');
        title.innerText = 'Booking successful!';
        messageDiv.appendChild(title);

        // Create date object to extract time and date
        var date = new Date(booking.pickupTime);

        var messageElement = document.createElement('p');
        messageElement.innerHTML = "Thank you! Your booking reference  number  is <b>" 
        + booking.bookingRef + ".</b><br> You will be picked up in front of your provided address at <b>" 
        + date.toLocaleTimeString() + "</b> on the <b>" + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ".</b>";
        messageDiv.appendChild(messageElement);

        var newBookingButton = document.createElement('input');
        newBookingButton.setAttribute('type', 'button');
        newBookingButton.setAttribute('onclick', 'location.reload()');
        newBookingButton.setAttribute('value', 'Make Another Booking');
        messageDiv.appendChild(newBookingButton);

    } else {
        // If there was a server error then an error will be shown 
        var errorMessage = document.createElement('p');
        errorMessage.innerHTML = "There was an error processing your request. Please retry in a few minutes.";
        errorMessage.style.color = "red";
        messageDiv.appendChild(errorMessage);
    }
}

// This helper function will reset all input box border colours
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

// This function is called after page load to set dateField value and min to today
function setDateToToday() {
    var date = new Date();
    var todayString = date.getFullYear() + "-" + addLeadingZero(date.getMonth() + 1) + "-" + addLeadingZero(date.getDate());
    var dateField = document.getElementById('pickupDate');
    dateField.value = todayString;
    dateField.setAttribute('min', todayString);

}
// This helper function appends leading 0s to date segments
function addLeadingZero(aDateSegment) {
    if (aDateSegment < 10) return "0" + aDateSegment;
    return aDateSegment;
}