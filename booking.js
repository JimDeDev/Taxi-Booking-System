var xHRObject = false;
if (window.XMLHttpRequest) {
    xHRObject = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

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
    return valid;
}

function saveBooking(formItems) {
    console.log("saveBooking");

    formData = new FormData(formItems);

    xHRObject.open("POST", "saveBooking.php");

    xHRObject.onreadystatechange = processServerResponse;
    xHRObject.send(formData);  
}


function processServerResponse() {
    if ((xHRObject.readyState == 4) &&(xHRObject.status == 200)) {
        
        console.log("Response Text");
        console.log(xHRObject.responseText);

        const booking = JSON.parse(xHRObject.responseText);

        console.log("Response Text as JSON");
        console.log(booking);

        var contentDiv = document.getElementById('content');

        
        var bookingHTML = "<h2>Big Success!</h2>";
        bookingHTML += booking.bookingRef + '<br>';
        bookingHTML += booking.custName + '<br>';
        bookingHTML += booking.custPhone + '<br>';

        contentDiv.innerHTML = bookingHTML;
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