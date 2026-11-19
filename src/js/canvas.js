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
});

circle1.addEventListener('click', event => {
    console.log("Circle 1: Home clicked");
    window.location.href = "index.html";
});

createText.addEventListener('click', event => {

    const canvasText = document.createElement('div');
    canvasText.classList.add('canvas-text');
    canvasText.contentEditable = true;
    canvasText.textContent = '';

    main.appendChild(canvasText);

    const position = findFreePosition(canvasText);

    canvasText.style.left = `${position.x}px`;
    canvasText.style.top = `${position.y}px`;

    makeDraggable(canvasText);

    canvasText.focus();

});

function findFreePosition(element) {
    const centerX = main.clientWidth / 2 - element.offsetWidth / 2;
    const centerY = main.clientHeight / 2 - element.offsetHeight / 2;

    const existingTexts = [...main.querySelectorAll('.canvas-text')];

    const step = 40;

    for (let radius = 0; radius <= 20; radius++) {

        for (let x = -radius; x <= radius; x++) {
            
            for (let y = -radius; y <= radius; y++) {

                // Only check the outer edge of each search ring
                if (Math.abs(x) !== radius && Math.abs(y) !== radius) {
                    continue;
                }

                const left = centerX + x * step;
                const top = centerY + y * step;

                const isOccupied = existingTexts.some(text => {
                    return !(
                        left + element.offsetWidth + 12 < text.offsetLeft ||
                        left > text.offsetLeft + text.offsetWidth + 12 ||
                        top + element.offsetHeight + 12 < text.offsetTop ||
                        top > text.offsetTop + text.offsetHeight + 12
                    );
                });

                if (!isOccupied) {
                    return { x: left, y: top };
                }
            }
        }
    }

    return { x: centerX, y: centerY };
};

function makeDraggable(element) {
    let startX, startY;
    let initialLeft, initialTop;
    let isDragging = false;
    let activePointerId = null;

    element.addEventListener('pointerdown', event => {
        if (event.button !== 0) return;

        startX = event.clientX;
        startY = event.clientY;

        initialLeft = element.offsetLeft;
        initialTop = element.offsetTop;

        activePointerId = event.pointerId;
        isDragging = false;
    });

    document.addEventListener('pointermove', event => {
        if (event.pointerId !== activePointerId) return;

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) < 4) return;

        isDragging = true;

        element.style.left = `${initialLeft + dx}px`;
        element.style.top = `${initialTop + dy}px`;
    });

    document.addEventListener('pointerup', event => {
        if (event.pointerId !== activePointerId) return;

        activePointerId = null;
        isDragging = false;
    });
};