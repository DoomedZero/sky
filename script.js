const clouds = document.querySelectorAll('.cloud');
const main = document.getElementById('main')
const sun = document.getElementById('sun');
const sunMenu = document.getElementById('sun-menu');

const sun1 = document.getElementById('sun-menu-option-1');
const closeButton = document.getElementById('close-button');

let sunMenuState = 0

closeButton.addEventListener('click', event => {
    console.log("Close button clicked");
    sunMenu.classList.add('hidden');
    sunMenuState = 0;
})

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

sun1.addEventListener('click', event => {
    console.log("Option 1 clicked");
    const newCloud = document.createElement('div');
    newCloud.classList.add('cloud');
    main.appendChild(newCloud);

})

clouds.forEach((cloud) => {
    cloud.addEventListener('click', event => {
        console.log("Cloud Clicked");
    })
});
