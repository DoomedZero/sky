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

createText.addEventListener("click", () => {

  const dragBox = document.createElement("div");
  dragBox.classList.add("drag-box");

  const canvasText = document.createElement("div");
  canvasText.classList.add("canvas-text");
  canvasText.contentEditable = "true";
  canvasText.textContent = "";

  dragBox.appendChild(canvasText);
  main.appendChild(dragBox);

  // Focus and place the blinking cursor at the end of "Text"
  canvasText.focus();
  const range = document.createRange();
  range.selectNodeContents(canvasText);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  // State scoped to this specific textbox
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // Double-click to re-enter edit mode later
  dragBox.addEventListener("dblclick", () => {
    canvasText.contentEditable = "true";
    canvasText.focus();
  });

  // Disable editing when clicking outside so single-click dragging works
  canvasText.addEventListener("blur", () => {
    canvasText.contentEditable = "false";
  });

  dragBox.addEventListener("pointerdown", (e) => {
    // Allow normal typing/cursor movement if actively editing
    if (document.activeElement === canvasText) return;

    canvasText.blur();
    window.getSelection()?.removeAllRanges();

    // Remove the centering transform smoothly on the first drag
    const boxRect = dragBox.getBoundingClientRect();
    const parentRect = main.getBoundingClientRect();
    dragBox.style.transform = "none";
    dragBox.style.left = `${boxRect.left - parentRect.left}px`;
    dragBox.style.top = `${boxRect.top - parentRect.top}px`;

    isDragging = true;
    offsetX = e.clientX - boxRect.left;
    offsetY = e.clientY - boxRect.top;

    dragBox.classList.add("is-dragging");
    dragBox.setPointerCapture(e.pointerId);
  });

  dragBox.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const parentRect = main.getBoundingClientRect();

    dragBox.style.left = `${e.clientX - parentRect.left - offsetX}px`;
    dragBox.style.top = `${e.clientY - parentRect.top - offsetY}px`;
  });

  dragBox.addEventListener("pointerup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    dragBox.classList.remove("is-dragging");
    dragBox.releasePointerCapture(e.pointerId);
  });
  
});
