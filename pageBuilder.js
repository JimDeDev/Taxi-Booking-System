/**
 * Web Development Assignment 2 - S1 2019
 * Name: Jaime king 
 * ID: 16959932 
 * 
 * This JavaScript file is used to generate static elements
 * that are present on every page of the website
 */
var header = document.getElementById('header');
var footer = document.getElementById('footer');

// This JSON object holds information to build the nav menu
const navLinks = [
    {'name': 'Home', 'link': 'index.html'},
    {'name': 'Book A Cab', 'link': 'booking.html'},
    {'name': 'Admin Panel', 'link': 'admin.html'}
]

const slogan = "BOOK A CAB TODAY!!";

addLogo();
addNav();
addSlogan();

/**
 * This function adds the logo to the header
 */
function addLogo() {
    var logo = document.createElement('img');
    logo.setAttribute('src', 'logo.png');
    logo.setAttribute('id', 'logo');
    
    header.appendChild(logo);
}

/**
 * This function adds the nav menu to the header
 */
function addNav() {
    var nav = document.createElement('ul');
    nav.setAttribute('class', 'nav');

    // Using the navLinks JSON to build nav
    navLinks.map((navLink) => {
        var navItem = document.createElement('li');
        var link = document.createElement('a');

        link.setAttribute('href', navLink.link);
        link.innerText = navLink.name;

        navItem.appendChild(link);
        nav.appendChild(navItem);
    })
    header.appendChild(nav);
}

/**
 * This function adds the slogan to the header
 */
function addSlogan() {
    var sloganElement = document.createElement('h1');
    sloganElement.innerText = slogan;
    header.appendChild(sloganElement);
}
