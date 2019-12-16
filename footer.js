// DOM manipulation after the content is loaded
document.addEventListener('DOMContentLoaded', async function() {
    let footer = document.getElementById("footer");
    try {
        const response = await fetch("https://staytu.github.io/footer.html");
        footer.innerHTML = await response.text();
        
        let spacer = document.createElement("div");
        spacer.id = "footer-spacer";
        footer.parentNode.insertBefore(spacer, footer);
    }
    catch(err) {
        console.error(err);
    }
}, false);
