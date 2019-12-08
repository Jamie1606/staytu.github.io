var formURL = "https://script.google.com/macros/s/AKfycbzes5YI5zWJ5_loeatisshzBnw2veJZJ5mKxwpddI6xPTalKDw/exec";

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
    let element = thelist.previousSibling;
    var idx = thelist.selectedIndex;
    var content = thelist.options[idx].innerHTML;
    element.value = content;
}

function submitMemberForm() {
    let form = document.getElementById("signup-form");
    let interestBoxes = document.getElementById("interest").children;
    let interestValue = "";
    for(var i=0; i<interestBoxes.length; i++) {
        checkbox = interestBoxes[i].children[0];
        if(checkbox.checked)
            interestValue += checkbox.value + ", ";
    }
    const photo = document.getElementById("passport-photo").files[0];
    
    const data = {
        email: form["email"].value,
        name: form["name"].value,
        roll: form["roll"].value,
        year: form["year"].value,
        major: form["major"].value,
        interest: interestValue,
        description: form["description"].value,
        why: form["why"].value,
        passport: photo
    }
    
    const param = {
        headers: {
            "Accept": "text/html; charset=UTF-8",
            "Content-Type": "application/json; charset=UTF-8"
        },
        method: "POST",
        body: data
    }
    
    fetch(formURL, param)
      .then(data=>{return data.text()})
      .then(res=>{
        showForm("response-form");
        let responseForm = document.getElementById("response-form");
        responseForm.innerHTML = res;
      })
      .catch(error=>console.log(error));
    
    return false;
}

function updatePassportDisplay() {
    let imageInput = document.getElementById("passport-photo");
    if(imageInput.files.length > 0) {
        let preview = document.getElementById("passport-photo-display");
        const dataURL = window.URL.createObjectURL(imageInput.files[0]);
        preview.style.backgroundImage = "url('" + dataURL + "')";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showForm("signin-form");
    let imageInput = document.getElementById("passport-photo");
    imageInput.addEventListener('change', updatePassportDisplay);
}, false);
