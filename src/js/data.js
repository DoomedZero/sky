const CLOUDS_KEY = "sky-clouds";
const ACTIVE_CLOUD_KEY = "sky-active-cloud";

export function getClouds() {
    return JSON.parse(localStorage.getItem(CLOUDS_KEY)) || [];
}

export function saveClouds(clouds) {
    localStorage.setItem(CLOUDS_KEY, JSON.stringify(clouds));
}

export function setActiveCloud(id) {
    localStorage.setItem(ACTIVE_CLOUD_KEY, id);
}

export function getActiveCloud() {
    const clouds = getClouds();
    const activeId = localStorage.getItem(ACTIVE_CLOUD_KEY);

    return clouds.find(cloud => cloud.id === activeId);
}