var xhttp = new XMLHttpRequest();
var formURL = "https://script.google.com/macros/s/AKfycbzCkn9IPJjuKdjJPk6txJ7M08BzPhNIMWHQgJXUXs8/dev";

var canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
var ctx = canvas.getContext('2d');
var photoDataURL = "";


//{id: 104, name: "Edward"} --> id=104&name=Edward
const getAsUriParameters = obj => Object
        .keys(obj)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
        .join('&');

function showForm(id) {
    let forms = document.getElementsByTagName("form");
    for(var i=0; i<forms.length; i++) {
        if(forms[i].id == id)
            forms[i].style.display = "block";
        else
            forms[i].style.display = "none";
    }
}

function combo(thelist) {
    let element = thelist.previousElementSibling;
    var idx = thelist.selectedIndex;
    var content = thelist.options[idx].innerHTML;
    element.value = content;
}

/*
 * Function invoked from form submit button.
 * Collects datas like name, email, place them in a JSON.
 * Makes a post request without CORS by JSONP.
 */
function submitMemberForm() {
    let form = document.getElementById("signup-form");
    let interestBoxes = document.getElementById("interest").children;
    let interestValue = "";
    for(var i=0; i<interestBoxes.length; i++) {
        checkbox = interestBoxes[i].children[0];
        if(checkbox.checked)
            interestValue += checkbox.value + ", ";
    }
    interestValue.substring(0, interestValue.length - 2);
    
    const param = {
        func: "signup",
        callback: "displayResponseForm",
        email: form["email"].value,
        name: form["name"].value,
        id: "",
        roll: form["roll"].value,
        batch: form["batch"].value,
        major: form["major"].value,
        interest: interestValue,
        description: form["description"].value,
        why: form["why"].value
    }
    
    xhttp.open("POST", formURL, true);
    xhttp.send(getAsUriParameters(param) + "&photo=" + photoDataURL);
    
    let button = document.getElementById("signup-button");
    button.disabled = true;
    
    return false;
}

xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        let content = document.getElementById("form-response-content");
        content.innerHTML = this.responseText;
        showForm("response-form");
    }
};

// Preview image update
function updatePassportDisplay() {
    let imageInput = document.getElementById("passport-photo");
    if(imageInput.files.length > 0) {
        let preview = document.getElementById("passport-photo-display");
        var img = new Image();
        img.src = window.URL.createObjectURL(imageInput.files[0]);
        img.onload = function() {
            var ratio = img.width / img.height;
            if(img.width > img.height) {
                var margin = -1 * (canvas.height*ratio - canvas.width) / 2;
                ctx.drawImage(img, margin, 0,
                              canvas.height * ratio, canvas.height);
            }
            else {
                var margin = -1 * (canvas.width/ratio - canvas.height) / 2;
                ctx.drawImage(img, 0, margin,
                              canvas.width, canvas.width / ratio);
            }
            photoDataURL = canvas.toDataURL("image/jpeg", 0.8);
            preview.style.backgroundImage = "url('" + photoDataURL + "')";
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showForm("signup-form");
    let imageInput = document.getElementById("passport-photo");
    imageInput.addEventListener('change', updatePassportDisplay);
}, false);

