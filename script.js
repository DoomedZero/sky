const clouds = document.querySelectorAll('.cloud');
const main = document.getElementById('main')
const sun = document.getElementById('sun');
const sunMenu = document.getElementById('sun-menu');

const circle1 = document.getElementById('circle-1');
const circle2 = document.getElementById('circle-2');


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
