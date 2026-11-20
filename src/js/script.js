import { getClouds, createCloud, renameCloud, deleteCloud } from "./clouds.js";

const sun = document.getElementById('sun');
const sunMenu = document.getElementById('sun-menu');
const circle1 = document.getElementById('circle-1');

const main = document.getElementById('main');

const cloudCreateMenu = document.getElementById('cloud-create-menu');
const cloudCreateMenuInputField = document.getElementById('cloud-create-name-input');
const cloudCreateMenuButton = document.getElementById('cloud-create-menu-button');
const closeCloudCreateMenu = document.getElementById('close-create-menu');

const cloudEditMenu = document.getElementById('cloud-edit-menu');
const cloudEditMenuInputField = document.getElementById('cloud-edit-name-input');
const cloudEditMenuButton = document.getElementById('cloud-edit-menu-button');
const cloudEditMenuTitle = document.getElementById('edit-cloud-message');
const cloudDeleteButton = document.getElementById('cloud-delete-button');
const closeCloudEditMenu = document.getElementById('close-edit-menu');

let targetcloudId = null;
let clouds = getClouds();
let isSunOpen = false;
let canOpenSun = true;
let isCreateOpen = false;
let isEditOpen = false;

function toggleSunMenu() {
    isSunOpen = !isSunOpen;
}

function toggleCreateMenu() {
    isCreateOpen = !isCreateOpen;
}

function toggleEditMenu() {
    isCreateOpen = !isCreateOpen;
}

sun.addEventListener('click', event => {

    sunMenu.classList.toggle('sun-open');

});

circle1.addEventListener('click', event => {

    sunMenu.classList.remove('sun-open');
    cloudCreateMenu.classList.add('open');
    main.classList.add('shrink-main');

    toggleSunMenu();
    toggleCreateMenu();
    canOpenSun = false;

});

closeCloudCreateMenu.addEventListener('click', event => {

    cloudCreateMenu.classList.remove('open');
    cloudCreateMenuInputField.value = "";
    sunMenu.classList.remove('sun-open');
    main.classList.remove('shrink-main');

    toggleCreateMenu();
    canOpenSun = true;

});

cloudCreateMenuButton.addEventListener('click', event => {

    let cloudName = cloudCreateMenuInputField.value.trim();

    if (cloudName != "") {

        const newCloud = createCloud(cloudName);

        renderCloud(newCloud);

        console.log("Cloud created: ", newCloud);
        console.log("Clouds: ", getClouds())

        cloudCreateMenu.classList.remove('open');
        cloudCreateMenuInputField.value = "";
        sunMenu.classList.remove('sun-open');
        main.classList.remove('shrink-main');

        toggleSunMenu();
        toggleCreateMenu();
        canOpenSun = true;
    }

});

main.addEventListener('click', event => {

    const cloudElement = event.target.closest('.cloud');

    if (!cloudElement) return;

    const cloudId = cloudElement.dataset.cloudId;

    if (event.target.matches('.edit-button')) {

        console.log("Edit Button Clicked");

        const cloud = clouds.find(c => c.id === cloudId);

        targetcloudId = cloudId;

        cloudEditMenu.classList.add('open');
        main.classList.add('shrink-main');

        cloudEditMenuTitle.textContent = `Edit ${cloud.name}`;

        cloudEditMenuInputField.focus();

        return;

    }

    window.location.href = `canvas.html?id=${cloudId}`;

});

cloudEditMenuButton.addEventListener('click', event => {

    let cloudName = cloudEditMenuInputField.value.trim();

    if (cloudName !== "") {

        const cloud = renameCloud(targetcloudId, cloudName);

        if (!cloud) return;

        const cloudElement = main.querySelector(
            `[data-cloud-id = "${targetcloudId}"]`
        );

        cloudElement.querySelector('h3').textContent = cloud.name;

        console.log("Cloud edited: ", cloud);
        console.log("Clouds: ", getClouds());

        cloudEditMenu.classList.remove('open');
        cloudEditMenuInputField.value = "";
        main.classList.remove('shrink-main');

    }

});

cloudDeleteButton.addEventListener('click', event => {

    const deletedCloud = deleteCloud(targetcloudId);

    if (!deletedCloud) return;

    const cloudElement = main.querySelector(
        `[data-cloud-id = "${targetcloudId}"]`
    );

    cloudElement.remove();

    console.log("Cloud deleted: ", deletedCloud)
    console.log("Clouds: ", getClouds())

    cloudEditMenu.classList.remove('open');
    cloudEditMenuInputField.value = '';
    main.classList.remove('shrink-main');

});

closeCloudEditMenu.addEventListener('click', event => {

    cloudEditMenu.classList.remove('open');
    cloudEditMenuInputField.value = '';
    main.classList.remove('shrink-main');

});

function renderCloud(cloud) {

    const cloudElement = document.createElement('div');
    cloudElement.classList.add('cloud');

    cloudElement.dataset.cloudId = cloud.id;

    const editButton = document.createElement('div');
    editButton.classList.add('edit-button');
    editButton.textContent = 'E';

    const cloudTitle = document.createElement('h3');
    cloudTitle.classList.add('cloud-title');
    cloudTitle.textContent = cloud.name;

    cloudElement.appendChild(editButton);
    cloudElement.appendChild(cloudTitle);

    main.appendChild(cloudElement);
}

getClouds().forEach(cloud => {
    renderCloud(cloud);
});

// KEYBOARD YAY!!!

document.addEventListener('keydown', (event) => {

    // Ignore if user is typing in an input, textarea, or editable field
    const tag = event.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target.isContentEditable) {
        return;
    }

    if (event.key.toLowerCase() === 's'
        && !event.ctrlKey
        && !event.metaKey
        && !event.altKey
        && canOpenSun) {

        sunMenu.classList.toggle('sun-open');
        toggleSunMenu();

    }

    if (isSunOpen) {

        if (event.key.toLocaleLowerCase() === 'c'
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey) {
            
            sunMenu.classList.remove('sun-open');
            cloudCreateMenu.classList.add('open');
            main.classList.add('shrink-main');

            toggleSunMenu();
            toggleCreateMenu();
            canOpenSun = false;
        }

    }

    if (isCreateOpen) {

        if (event.key.toLocaleLowerCase() === 'x'
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey) {

            cloudCreateMenu.classList.remove('open');
            cloudCreateMenuInputField.value = "";
            sunMenu.classList.remove('sun-open');
            main.classList.remove('shrink-main');

            toggleCreateMenu();
            canOpenSun = true;

        }


    }

    if (isCreateOpen) {
        if (event.key.toLocaleLowerCase() === 'i'
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey) {

            cloudCreateMenuInputField.focus();

        }

    }

});
