import { getClouds, saveClouds, setActiveCloud } from "../../data.js";

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
const closeEditCreateMenu = document.getElementById('close-edit-menu');

let sunMenuState = 0;
let cloudCount = 0;
let targetCloud = null;

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

    if (cloudName !== "") {

        const clouds = getClouds();

        const newCloud = {
            id: crypto.randomUUID(),
            title: cloudName,
            content: []
        };

        clouds.push(newCloud);
        saveClouds(clouds);

        renderClouds();

        cloudCreateMenu.classList.add('hidden');
        cloudCreateMenuInputField.value = "";
    }

});

main.addEventListener('click', event => {

    if (event.target.matches('.edit-button')) {
        targetCloud = event.target.closest('.cloud');

        cloudEditMenu.classList.remove('hidden');

        cloudEditMenuTitle.textContent =
            `Edit ${targetCloud.querySelector('h3').textContent}`;

        return;
    }

    const cloud = event.target.closest('.cloud');

    if (cloud && main.contains(cloud)) {
        navigate(cloud);
    }

});

cloudEditMenuButton.addEventListener('click', event => {

    let cloudName = cloudEditMenuInputField.value.trim();

    if (cloudName !== "" && targetCloud) {

        const clouds = getClouds();

        const cloud = clouds.find(c => c.id === targetCloud.id);

        if (cloud) {
            cloud.title = cloudName;
            saveClouds(clouds);
        }

        renderClouds();

        cloudEditMenu.classList.add('hidden');
        cloudEditMenuInputField.value = "";
        targetCloud = null;
    }

});

closeEditCreateMenu.addEventListener('click', event => {
    cloudEditMenu.classList.add('hidden');
    cloudEditMenuInputField.value = "";
    targetCloud = null;
});

function navigate(cloud) {
    setActiveCloud(cloud.id);
    window.location.href = "canvas.html";
}

function renderClouds() {
    const clouds = getClouds();

    main.innerHTML = "";

    clouds.forEach(cloud => {
        const newCloud = document.createElement('div');

        newCloud.id = cloud.id;
        newCloud.classList.add('cloud');

        newCloud.innerHTML = `
            <div class="edit-button">&#9999;</div>
            <h3>${cloud.title}</h3>
        `;

        main.appendChild(newCloud);
    });
}

renderClouds();