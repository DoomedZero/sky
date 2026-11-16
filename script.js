const clouds = document.querySelectorAll('.cloud');
const sun = document.getElementById('sun');
const sunMenu = document.getElementById('sun-menu')

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

clouds.forEach((cloud) => {
    cloud.addEventListener('click', event => {
        console.log("Cloud Clicked");
    })
});
