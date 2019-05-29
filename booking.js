/**
* Web Development Assignment 2 - S1 2019
 * Name: Jaime king 
 * ID: 16959932  
 * 
 * This file is used on the booking.html page.
 * it contains functions such as form validation
 * and saveBooking
 */

var xHRObject = createRequest();

// Preloading the date field with correct dates
setDate();
var messageDiv = document.getElementById('message');

// This function will validate the inputs and save to db if valid
function submitBooking() {
    console.log("submitBooking called");

    // Getting the form data 
    const formItems = document.forms.bookingForm;

    // errors array for storing any validation error messages
    var errors = [];

    // Get current time to compare against input time
    const currentTime = new Date();

    // First reset the borders incase this is the second submit attempt
    resetFormBorders();

    // All the following validation statements are checking if the field is empty 
    // and then checking the value against a regular expression
    if (formItems.custName.value == "") {
        errors.push('Customer name is required.');
        document.getElementById('custName').style.borderColor = 'red';
    } else if (formItems.custName.value.match(/[^a-zA-Z ]/g)) {
        errors.push('Customer name can only contain letters.');
        document.getElementById('custName').style.borderColor = 'red';
    }

    if (formItems.custPhone.value == "") {
        errors.push('Customer phone is required.');
        document.getElementById('custPhone').style.borderColor = 'red';
    } else if (formItems.custPhone.value.match(/[^0-9- +]/g)) {
        errors.push('Customer phone can only contain 0-9, -, +, and space.');
        document.getElementById('custPhone').style.borderColor = 'red';
    }

    if (formItems.unitNumber.value.match(/[^0-9]/g)) {
        errors.push('Unit number can only contain 0-9');
        document.getElementById('unitNumber').style.borderColor = 'red';
    }

    if (formItems.streetNumber.value == "") {
        errors.push('Street number is required.');
        document.getElementById('streetNumber').style.borderColor = 'red';
    } else if (formItems.streetNumber.value.match(/[^0-9]/g)) {
        errors.push('Street number can only contain 0-9.');
        document.getElementById('streetNumber').style.borderColor = 'red';
    }

    if (formItems.streetName.value == "") {
        errors.push('Street name is required.');
        document.getElementById('streetName').style.borderColor = 'red';
    } else if (formItems.streetName.value.match(/[^A-Za-z ]/g)) {
        errors.push('Street name can only contain letters and spaces.');
        document.getElementById('streetName').style.borderColor = 'red';
    }

    if (formItems.suburb.value == "") {
        errors.push('Pickup suburb is required.');
        document.getElementById('suburb').style.borderColor = 'red';
    } else if (formItems.suburb.value.match(/[^A-Za-z ]/g)) {
        errors.push('Suburb can only contain letters and spaces.');
        document.getElementById('suburb').style.borderColor = 'red';
    }

    if (formItems.destSuburb.value == "") {
        errors.push('Destination suburb is required.');
        document.getElementById('destSuburb').style.borderColor = 'red';
    } else if (formItems.destSuburb.value.match(/[^A-Za-z ]/g)) {
        errors.push('Destination Suburb can only contain letters and spaces.');
        document.getElementById('destSuburb').style.borderColor = 'red';
    }

    var inputDate = new Date(formItems.pickupDate.value + ' ' + formItems.pickupTime.value);

    if (formItems.pickupDate.value == "" || formItems.pickupTime.value == "") {
        errors.push('Pickup date and time is required.');
        document.getElementById('pickupDate').style.borderColor = 'red';
        document.getElementById('pickupTime').style.borderColor = 'red';

    } else if (inputDate < currentTime) {
        // Verifying that the given date and time is past the current time
        errors.push('Pickup time must be in the future.');
        document.getElementById('pickupDate').style.borderColor = 'red';
        document.getElementById('pickupTime').style.borderColor = 'red';
    }

    // If errors array is empty then booking is valid
    if (errors.length == 0) {
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

/**
 * This function is called by the submitBooking function 
 * It will send an XHR request with the booking information to the server 
 * and save it to the database
 */
function saveBooking(formItems) {
    formData = new FormData(formItems);

    xHRObject.open("POST", "saveBooking.php");

    xHRObject.onreadystatechange = processBookingResponse;
    xHRObject.send(formData);
}

/**
 * This function is called by the XHR object from saveBooking
 * it will update the booking page with the result from the server
 */
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

        // Create and add success message to the screen
        var messageElement = document.createElement('p');
        messageElement.innerHTML = "Thank you! Your booking reference  number  is <b>" 
        + booking.bookingRef + ".</b><br> You will be picked up in front of your provided address at <b>" 
        + date.toLocaleTimeString() + "</b> on the <b>" + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ".</b>";
        messageDiv.appendChild(messageElement);

        // Create and add new booking button to the screen
        var newBookingButton = document.createElement('input');
        newBookingButton.setAttribute('type', 'button');
        newBookingButton.setAttribute('onclick', 'location.reload()');
        newBookingButton.setAttribute('value', 'Make Another Booking');
        messageDiv.appendChild(newBookingButton);

    }  else if ((xHRObject.readyState == 4) && (xHRObject.status == 500)) {

        // First clear the message area
        messageDiv.innerHTML = "";

        // If there was a server error then an error will be shown 
        var errorMessage = document.createElement('p');
        errorMessage.innerText = "There was an error processing your request. Please retry in a few minutes.";
        errorMessage.className = 'error-message';
        messageDiv.appendChild(errorMessage);
    }
}

// This helper function will reset all input box border colours
function resetFormBorders() {
    document.getElementById('custName').style.borderColor = '#ccc';
    document.getElementById('custPhone').style.borderColor = '#ccc';
    document.getElementById('unitNumber').style.borderColor = '#ccc';
    document.getElementById('streetNumber').style.borderColor = '#ccc';
    document.getElementById('streetName').style.borderColor = '#ccc';
    document.getElementById('suburb').style.borderColor = '#ccc';
    document.getElementById('destSuburb').style.borderColor = '#ccc';
    document.getElementById('pickupDate').style.borderColor = '#ccc';
    document.getElementById('pickupTime').style.borderColor = '#ccc';
}

// This function is called after page load to set dateField value and min to today
function setDate() {
    var date = new Date();
    var todayString = date.getFullYear() + "-" + addLeadingZero(date.getMonth() + 1) + "-" + addLeadingZero(date.getDate());
    var dateField = document.getElementById('pickupDate');
    dateField.value = todayString;
    dateField.setAttribute('min', todayString);
    console.log(todayString);
    console.log(date.getFullYear() + '-12-31');
    dateField.setAttribute('max', date.getFullYear() + '-12-31')

}
// This helper function appends leading 0s to date segments
function addLeadingZero(aDateSegment) {
    if (aDateSegment < 10) return "0" + aDateSegment;
    return aDateSegment;
}