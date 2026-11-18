const sun = document.getElementById('sun');
const circle1 = document.getElementById('circle-1');

const sunMenu = document.getElementById('sun-menu');

let canvasName = document.getElementById('canvas-name');

let sunMenuState = 0;

canvasName.textContent = "Work";

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
    window.location.href = "./index.html";
})

circle2.addEventListener('click', event => {
    console.log("Circle 2: Close clicked")
    sunMenu.classList.add('hidden');
    sunMenuState = 0;
})