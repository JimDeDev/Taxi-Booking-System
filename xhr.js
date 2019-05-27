/**
 * Web Development Assignment 2 - S1 2019
 * Name: Jaime king 
 * ID: 16959932 
 * 
 * This JavaScript file is used to generate an XHR object
 */function createRequest() {
    var xhr = false;  
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
} 
