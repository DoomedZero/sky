import { getClouds, createCloud, renameCloud, deleteCloud } from "./clouds.js";

const sun = document.getElementById('sun');
const sunMenu = document.getElementById('sun-menu');
const sunIndicator = document.getElementById('sun-indicator');
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

sunIndicator.textContent = "S";

sun.addEventListener('click', event => {

    sunMenu.classList.toggle('sun-open');
    sunIndicator.textContent = sunIndicator.textContent === "S" ? "X" : "S";

});

circle1.addEventListener('click', event => {

    sunMenu.classList.remove('sun-open');
    sunIndicator.textContent = "S";
    cloudCreateMenu.classList.add('open');
    main.classList.add('shrink-main');
    cloudCreateMenuInputField.focus();

});

closeCloudCreateMenu.addEventListener('click', event => {

    cloudCreateMenu.classList.remove('open');
    cloudCreateMenuInputField.value = "";
    sunMenu.classList.remove('sun-open');
    main.classList.remove('shrink-main');
    sunIndicator.textContent = "S";

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
        sunIndicator.textContent = "S";
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

});

closeCloudEditMenu.addEventListener('click', event => {

    cloudEditMenu.classList.remove('open');
    cloudEditMenuInputField.value = '';

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