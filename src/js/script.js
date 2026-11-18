const sun = document.getElementById('sun');
const sunMenu = document.getElementById('sun-menu');
const circle1 = document.getElementById('circle-1');

const main = document.getElementById('main');

const cloudCreateMenu = document.getElementById('cloud-create-menu');
const cloudCreateMenuInputField = document.getElementById('cloud-create-name-input');
const cloudCreateMenuButton = document.getElementById('cloud-create-menu-button');

const cloudEditMenu = document.getElementById('cloud-edit-menu');
const cloudEditMenuInputField = document.getElementById('cloud-edit-name-input');
const cloudEditMenuButton = document.getElementById('cloud-edit-menu-button');

let sunMenuState = 0;
let cloudCount = 0;
let savedCloudID = null;

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

main.addEventListener('click', event => {
    if (event.target.matches('.edit-button')) {
        console.log("Edit Button Clicked");
        cloudEditMenu.classList.remove('hidden');
        savedCloudID = event.target.parentElement.id

    }
    if (event.target.matches('.cloud')) {
        console.log("Cloud Clicked");
        let navigateToCloudID = event.target.id;
        let cloudTitle = document.getElementById(navigateToCloudID).querySelector('h3').textContent;
        console.log(navigateToCloudID);
        console.log(cloudTitle)
    }
})


cloudCreateMenuButton.addEventListener('click', event => {

    let cloudName = cloudCreateMenuInputField.value;

    if (cloudName != "") {
        const newCloud = document.createElement('div');
        cloudCount = cloudCount + 1;
        newCloud.id = `cloud${cloudCount}`
        newCloud.classList.add('cloud');
        newCloud.innerHTML =
            `<div class="edit-button">&#9999;</div>
            <h3 id=cloud-title>${cloudName}</h3>`;
        main.appendChild(newCloud);
        console.log(`Cloud created!, id: ${newCloud.id}`)

        cloudCreateMenu.classList.add('hidden');
        cloudCreateMenuInputField.value = "";
    }

    else {
        console.log("This only comes when input is nothing.");
    }

})

cloudEditMenuButton.addEventListener('click', event => {

    let cloudName = cloudEditMenuInputField.value;
    let editCloud = document.getElementById(savedCloudID);


    if (cloudName != "") {
        editCloud.innerHTML =
            `<div class="edit-button">&#9999;</div>
            <h3 id=cloud-title>${cloudName}</h3>`;
        console.log(`Cloud Edited!, id: ${editCloud.id}`)

        cloudEditMenu.classList.add('hidden');
        cloudEditMenuInputField.value = "";
    }

    else {
        console.log("This only comes when input is nothing.");
    }
})
