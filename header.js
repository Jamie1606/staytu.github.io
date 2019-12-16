// Navigation bar minimzes on scroll down
var headerHome = false;
var elementHeader;
var elementMenu;
var elementDropdown;

var scroll = 0;

function navigationBarEvent() {
    if(headerHome) {
        
    }
    else {
        if (scroll < 50) {
            elementHeader.setAttribute("minimize", "0");
        }
        else {
            elementHeader.setAttribute("minimize", "1");
        }
    }
}

var scrollEnabled = true;
var scrollDisableDOMManip = false;

window.onscroll = function() {
    if(scrollEnabled) {
        scroll = window.pageYOffset || document.documentElement.scrollTop;
        navigationBarEvent();
    }
    else {
        window.scrollTo(0, scroll);
        if(scrollDisableDOMManip) {
            scrollEnabled = true;
            scrollDisableDOMManip = false;
        }
    }
};


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
    scrollEnabled = false;
    scrollDisableDOMManip = true;
    document.getElementById(obj.id).setAttribute("drop", b ? "1" : "0");
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
document.addEventListener('DOMContentLoaded', async function() {
    let header = document.getElementById("header");
    
    try {
        const response = await fetch("https://staytu.github.io/header.html");
        header.innerHTML = await response.text();
    }
    catch(err) {
        console.error(err);
        return;
    }
    
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
    
    header.setAttribute("minimize", "0");
    nav2.setAttribute("drop", "0");
    
    elementHeader = header;
    elementMenu = document.getElementById("menu");
    elementDropdown = nav2;
}, false);
