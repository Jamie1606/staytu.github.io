// DOM manipulation after the content is loaded
document.addEventListener('DOMContentLoaded', async function() {
    let footer = document.getElementById("footer");
    const response = await fetch("https://staytu.github.io/header.html");
    footer.innerHTML = await response.text();
}, false);
