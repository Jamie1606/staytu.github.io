// Navigation bar minimzes on scroll down
var headerHome = false;
var elementHeader;
var elementMenu;
var elementDropdown;

function navigationBarEvent() {
    if(headerHome) {
        
    }
    else {
        if (document.body.scrollTop < 50 &&
            document.documentElement.scrollTop < 50)
        {
            elementHeader.setAttribute("minimize", "0");
        }
        else {
            elementHeader.setAttribute("minimize", "1");
        }
    }
}

window.onscroll = function() {navigationBarEvent()};


// Dropdown content visibility functions
var navDrop = {
    id: "dropdown-nav",
    show: false
};

var searchDrop = {
    id: "dropdown-search",
    show: false
};

function setDropdownVisibility(obj, b) {
    document.getElementById(obj.id).style.display
        = (b ? "block" : "none");
    obj.show = b;
}

function toggleDropdown(obj) {
    setDropdownVisibility(obj, !obj.show);
}


// Dropdown content click outside event
document.addEventListener("click", (evt) => {
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement == elementDropdown || targetElement == elementMenu) {
            // Do nothing, just return.
            return;
        }
        // Go up the DOM.
        targetElement = targetElement.parentNode;
    } while (targetElement);

    setDropdownVisibility(navDrop, false);
});


// DOM manipulation after the content is loaded
document.addEventListener('DOMContentLoaded', function() {
    let header = document.getElementById("header");
    
    // For non-home pages, a spacer is added.
    if(!headerHome) {
        let spacer = document.createElement("div");
        spacer.id = "header-spacer";
        header.parentNode.insertBefore(spacer, header.nextSibling);
    }
    
    // Copies the contents of navigation bar
    let nav1 = header.getElementsByClassName("box-1")[0];
    let nav2 = document.getElementById("dropdown-nav");
    let links = nav1.getElementsByTagName("a");
    links[0].innerHTML = "Home";
    nav2.innerHTML += "<ul>";
    for (i = 0; i < links.length; i++) {
        nav2.innerHTML += "<li>" + links[i].outerHTML + "</li>";
    }
    nav2.innerHTML += "</ul>";
    
    let spacer2 = document.createElement("div");
    spacer2.style.height = "35px";
    header.insertBefore(spacer2, nav2);
    
    elementHeader = header;
    elementMenu = document.getElementById("menu");
    elementDropdown = nav2;
}, false);
