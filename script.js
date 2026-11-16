const sun = document.getElementById('sun');
const clouds = document.querySelectorAll('.cloud');
const main = document.getElementById('main')

const sunMenu = document.getElementById('sun-menu');
const editMenu = document.getElementById('edit-menu')

const circle1 = document.getElementById('circle-1');
const circle2 = document.getElementById('circle-2');
const editButton = document.getElementById('edit-button');


const cloudInnerHTML =
    `<div id="edit-button">&#9999;</div>
            <h3>Title</h3>`

let sunMenuState = 0

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
    console.log("Option 1 clicked");
    const newCloud = document.createElement('div');
    newCloud.innerHTML = cloudInnerHTML
    newCloud.classList.add('cloud');
    main.appendChild(newCloud);

})

circle2.addEventListener('click', event => {
    sunMenu.classList.add('hidden');
    sunMenuState = 0;
})

clouds.forEach((cloud) => {
    cloud.addEventListener('click', event => {
        console.log("Cloud Clicked");
    })
});

editButton.addEventListener('click', event => {
    console.log("Edit Button Clicked");
    if (sunMenuState == 0) {
        editMenu.classList.remove('hidden');
        sunMenuState = 1;
    }
    else {
        editMenu.classList.add('hidden');
        sunMenuState = 0;
    }
})
