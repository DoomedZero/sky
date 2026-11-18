const sun = document.getElementById('sun');
const circle1 = document.getElementById('circle-1');

const sunMenu = document.getElementById('sun-menu');

let canvasName = document.getElementById('canvas-name');

let sunMenuState = 0;

canvasName.textContent = "test";

sun.addEventListener('click', event => {
    console.log("Sun Clicked");
    if (sunMenuState == 0) {
        sunMenu.classList.remove('hidden');
        sunMenuState = 1;
    }
    else {
        sunMenu.classList.add('hidden');
        sunMenuState = 0;
    }
})

circle1.addEventListener('click', event => {
    console.log("Circle 1: Home clicked");
    window.location.href = "index.html";
})