import { getClouds } from "./clouds.js";

const sun = document.getElementById('sun');
const circle1 = document.getElementById('circle-1');
const sunMenu = document.getElementById('sun-menu');
const main = document.getElementById('main');

const createText = document.getElementById('create-text');

const canvasName = document.getElementById('canvas-name');

let sunMenuState = 0;

const params = new URLSearchParams(
    window.location.search
);

const cloudId = params.get('id');
console.log("Received cloud ID:", cloudId);
canvasName.textContent = getClouds().find(c => c.id === cloudId).name;

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

createText.addEventListener('click', event => {

    const canvasText = document.createElement('div');
    canvasText.classList.add('canvas-text');
    canvasText.setAttribute("contenteditable", "true");
    canvasText.textContent = "Click Me!";

    main.appendChild(canvasText);
})