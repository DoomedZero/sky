const sun = document.getElementById('sun');
const circle1 = document.getElementById('circle-1');
const circle2 = document.getElementById('circle-2');

const main = document.getElementById('main');

const sunMenu = document.getElementById('sun-menu');
const editMenu = document.getElementById('edit-menu');


const cloudInnerHTML =
    `<div class="edit-button">&#9999;</div>
            <h3>Title</h3>`;

let sunMenuState = 0;
let editMenuState = 0;

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
    console.log("Circle 1: Create Clouds clicked");
    const newCloud = document.createElement('div');
    newCloud.innerHTML = cloudInnerHTML;
    newCloud.classList.add('cloud');
    main.appendChild(newCloud);

})

circle2.addEventListener('click', event => {
    console.log("Circle 2: Close button clicked")
    sunMenu.classList.add('hidden');
    sunMenuState = 0;
})

main.addEventListener('click', event => {
    if (event.target.matches('.edit-button')) {
        console.log("Edit Button Clicked");
        if(editMenuState == 0) {
            editMenu.classList.remove('hidden');
            editMenuState = 1;
        }
        else {
        editMenu.classList.add('hidden');
        editMenuState = 0;
    }
    }
    if (event.target.matches('.cloud')){
        console.log("Cloud Clicked");
    }
})
