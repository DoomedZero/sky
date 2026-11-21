import { getClouds } from "./clouds.js";

const sun = document.getElementById('sun');
const circle1 = document.getElementById('circle-1');
const sunMenu = document.getElementById('sun-menu');

const main = document.getElementById('main');

const createText = document.getElementById('create-text');

const canvasName = document.getElementById('canvas-name');

const params = new URLSearchParams(
  window.location.search
);

const cloudId = params.get('id');
console.log("Received cloud ID:", cloudId);
canvasName.textContent = getClouds().find(c => c.id === cloudId).name;

let isSunOpen = false;

function toggleSunMenu() {
  isSunOpen = !isSunOpen;
}

sun.addEventListener('click', event => {

  sunMenu.classList.toggle('sun-open');
  toggleSunMenu();

});

circle1.addEventListener('click', event => {

  window.location.href = "index.html";
  toggleSunMenu();

});

function createTextFun() {
  const dragBox = document.createElement("div");
  dragBox.className = "drag-box";

  const canvasText = document.createElement("div");
  canvasText.className = "canvas-text";
  canvasText.contentEditable = "true";

  dragBox.appendChild(canvasText);
  main.appendChild(dragBox);
  canvasText.focus(); // Empty div doesn't need Range/Selection math!

  let offsetX = 0, offsetY = 0, isDragging = false;

  // Toggle editing via a single CSS class on the parent
  dragBox.addEventListener("dblclick", () => {
    dragBox.classList.add("editing");
    canvasText.focus();
  });

  canvasText.addEventListener("blur", () => {
    dragBox.classList.remove("editing");
  });

  // Dragging
  dragBox.addEventListener("pointerdown", (e) => {
    if (dragBox.classList.contains("editing")) return;

    isDragging = true;
    const boxRect = dragBox.getBoundingClientRect();
    offsetX = e.clientX - boxRect.left;
    offsetY = e.clientY - boxRect.top;

    dragBox.setPointerCapture(e.pointerId);
  });

  dragBox.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const parentRect = main.getBoundingClientRect();
    dragBox.style.left = `${e.clientX - parentRect.left - offsetX}px`;
    dragBox.style.top = `${e.clientY - parentRect.top - offsetY}px`;
  });

  dragBox.addEventListener("pointerup", () => {
    isDragging = false;
  });
}

createText.addEventListener("click", () => {
  createTextFun();
});

document.addEventListener('keydown', (event) => {

  const tag = event.target.tagName;
  const isEditable =
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    event.target.isContentEditable;

  if (isEditable) {

    if (event.key === "Escape") {
      event.target.blur();
    }
    return;

  }

  if (event.key.toLowerCase() === 's'
    && !event.ctrlKey
    && !event.metaKey
    && !event.altKey) {
    sunMenu.classList.toggle('sun-open');
    toggleSunMenu();

  }

  if (isSunOpen) {
    if (event.key.toLocaleLowerCase() === 'h'
      && !event.ctrlKey
      && !event.metaKey
      && !event.altKey) {

      window.location.href = "index.html";
      toggleSunMenu();

    }
  }

  if (event.key.toLowerCase() === 't'
    && !event.ctrlKey
    && !event.metaKey
    && !event.altKey) {

    createTextFun();
    event.preventDefault();
  }

});
