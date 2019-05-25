
var header = document.getElementById('header');
var footer = document.getElementById('footer');

const navLinks = [
    {'name': 'Home', 'link': 'index.html'},
    {'name': 'Book A Cab', 'link': 'booking.html'},
    {'name': 'About The Site', 'link': 'readme.md'},
    {'name': 'Admin Panel', 'link': 'admin.html'}
]
const slogan = "BOOK A CAB TODAY!!";


addLogo();
addNav();
addSlogan();

function addLogo() {
    var logo = document.createElement('img');
    logo.setAttribute('src', 'logo.png');
    logo.setAttribute('id', 'logo');
    
    header.appendChild(logo);
}

function addNav() {
    var nav = document.createElement('ul');
    nav.setAttribute('class', 'nav');

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

function addSlogan() {
    var sloganElement = document.createElement('h1');
    sloganElement.innerText = slogan;
    header.appendChild(sloganElement);
}
