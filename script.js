const clouds = document.querySelectorAll('.cloud');

clouds.forEach((cloud) => {
    cloud.addEventListener('click', event => {
        console.log("Cloud Clicked");
    })
});
