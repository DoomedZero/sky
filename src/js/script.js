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
let isCreateOpen = false;
let isEditOpen = false;

let canOpenSun = true;

function toggleSunMenu() {
    isSunOpen = !isSunOpen;
}

function toggleCreateMenu() {
    isCreateOpen = !isCreateOpen;
}

function toggleEditMenu() {
    isEditOpen = !isEditOpen;
}

sun.addEventListener('click', event => {

    sunMenu.classList.toggle('sun-open');
    toggleSunMenu();

});

circle1.addEventListener('click', event => {

    sunMenu.classList.remove('sun-open');
    toggleSunMenu();

    cloudCreateMenu.classList.add('open');
    toggleCreateMenu();
    canOpenSun = false;

    main.classList.add('shrink-main');

});

closeCloudCreateMenu.addEventListener('click', event => {

    cloudCreateMenu.classList.remove('open');
    cloudCreateMenuInputField.value = "";
    toggleCreateMenu();
    canOpenSun = true;

    main.classList.remove('shrink-main');


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
        toggleCreateMenu();
        canOpenSun = true;

        main.classList.remove('shrink-main');

    }

});

main.addEventListener('click', event => {

    const cloudElement = event.target.closest('.cloud');

    if (!cloudElement) return;

    const cloudId = cloudElement.dataset.cloudId;

    if (event.target.matches('.edit-button')) {

        const cloud = clouds.find(c => c.id === cloudId);

        targetcloudId = cloudId;

        cloudEditMenu.classList.add('open');
        cloudEditMenuTitle.textContent = `Edit ${cloud.name}`;
        toggleEditMenu();

        main.classList.add('shrink-main');

        console.log("isEditMenuOpen", isEditOpen);

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
        toggleEditMenu();

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
    toggleEditMenu();

    main.classList.remove('shrink-main');

});

closeCloudEditMenu.addEventListener('click', event => {

    cloudEditMenu.classList.remove('open');
    cloudEditMenuInputField.value = '';
    toggleEditMenu();

    main.classList.remove('shrink-main');

});

// KEYBOARD YAY!!!

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
        && !event.altKey
        && canOpenSun) {

        sunMenu.classList.toggle('sun-open');
        toggleSunMenu();

        return;

    }

    if (isSunOpen) {

        if (event.key.toLowerCase() === 'c'
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey) {

            sunMenu.classList.remove('sun-open');
            toggleSunMenu();

            cloudCreateMenu.classList.add('open');
            toggleCreateMenu();
            canOpenSun = false;

            main.classList.add('shrink-main');
        }

    }

    if (isCreateOpen) {

        if (event.key.toLowerCase() === 'x'
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey) {

            cloudCreateMenu.classList.remove('open');
            cloudCreateMenuInputField.value = "";
            toggleCreateMenu();
            canOpenSun = true;

            main.classList.remove('shrink-main');

            return;

        }

        if (event.key.toLowerCase() === 'i'
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey) {

            event.preventDefault();
            cloudCreateMenuInputField.focus();

            return;

        }

        if (event.key === 'Enter'
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey) {

            let cloudName = cloudCreateMenuInputField.value.trim();

            if (cloudName != "") {

                const newCloud = createCloud(cloudName);

                renderCloud(newCloud);

                console.log("Cloud created: ", newCloud);
                console.log("Clouds: ", getClouds())

                cloudCreateMenu.classList.remove('open');
                cloudCreateMenuInputField.value = "";
                toggleCreateMenu();
                canOpenSun = true;

                main.classList.remove('shrink-main');
            }

            return;

        }


    }

    if (isEditOpen) {

        if (event.key.toLowerCase() === 'i'
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey) {

            event.preventDefault();
            cloudEditMenuInputField.focus();

            return;
        }

        if (event.key.toLowerCase() === 'x'
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey) {

            cloudEditMenu.classList.remove('open');
            cloudEditMenuInputField.value = '';
            toggleEditMenu();

            main.classList.remove('shrink-main');

            return;

        }

        if (event.key === 'Enter'
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey) {

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
                toggleEditMenu();

                main.classList.remove('shrink-main');

            }

            return;

        }

        if (event.key === 'Delete'
            && !event.ctrlKey
            && !event.metaKey
            && !event.altKey) {

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
            toggleEditMenu();

            main.classList.remove('shrink-main');

            return;

        }
    }

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
