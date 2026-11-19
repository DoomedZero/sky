import { getClouds, createCloud, renameCloud } from "./clouds.js";

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
const closeCloudEditMenu = document.getElementById('close-edit-menu');

let sunMenuState = 0;
let targetcloudId = null;
let clouds = getClouds();

sun.addEventListener('click', event => {

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

    console.log("Circle 1: Create Clouds clicked");
    cloudCreateMenu.classList.remove('hidden');

})

closeCloudCreateMenu.addEventListener('click', event => {

    cloudCreateMenu.classList.add('hidden');
    cloudCreateMenuInputField.value = "";

})

cloudCreateMenuButton.addEventListener('click', event => {

    let cloudName = cloudCreateMenuInputField.value.trim();

    if (cloudName != "") {

        const newCloud = createCloud(cloudName);

        renderCloud(newCloud);

        console.log("New cloud crated", newCloud);

        cloudCreateMenu.classList.add('hidden');
        cloudCreateMenuInputField.value = "";
    }

})

main.addEventListener('click', event => {

    const cloudElement = event.target.closest('.cloud');

    if (!cloudElement) return;

    const cloudId = cloudElement.dataset.cloudId;

    if (event.target.matches('.edit-button')) {

        console.log("Edit Button Clicked");

        const cloud = clouds.find( c => c.id === cloudId );

        targetcloudId = cloudId ;

        cloudEditMenu.classList.remove('hidden');

        cloudEditMenuTitle.textContent = `Edit ${cloud.name}`;

        return;

    }

    window.location.href = `canvas.html?id=${cloudId}`;

})

cloudEditMenuButton.addEventListener('click', event => {

    let cloudName = cloudEditMenuInputField.value.trim();

    if (cloudName !== "") {

        const cloud =  renameCloud(targetcloudId, cloudName);

        if (!cloud) return;

        const cloudElement = main.querySelector(
            `[data-cloud-id = "${targetcloudId}"]`
        );

        cloudElement.querySelector('h3').textContent = cloud.name;

        console.log("Cloud updated: ", cloud);
 
        cloudEditMenu.classList.add('hidden');
        cloudEditMenuInputField.value = "";

    }

})

closeCloudEditMenu.addEventListener('click', event => {

    cloudEditMenu.classList.add('hidden');
    cloudEditMenuInputField.value = '';

})

function renderCloud(cloud) {

    const cloudElement = document.createElement('div');
    cloudElement.classList.add('cloud');

    cloudElement.dataset.cloudId = cloud.id;

    const editButton = document.createElement('div');
    editButton.classList.add('edit-button');
    editButton.textContent = 'E';

    const cloudTitle = document.createElement('h3');
    cloudTitle.classList.add('cloud-title');
    cloudTitle.textContent = cloud.name

    cloudElement.appendChild(editButton);
    cloudElement.appendChild(cloudTitle);

    main.appendChild(cloudElement);
}