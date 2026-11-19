const savedClouds = localStorage.getItem("sky-clouds")

let clouds = savedClouds ? JSON.parse(savedClouds) : [];

function saveClouds() {
    localStorage.setItem('sky-clouds', JSON.stringify(clouds));
}

export function getClouds() {

    return clouds;

}

export function createCloud(name) {

    const newCloud = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now()
    };

    clouds.push(newCloud);

    saveClouds();

    return newCloud;
}

export function renameCloud(id, newName) {

    const cloud = clouds.find( c => c.id === id );

    if (!cloud) return;

    cloud.name = newName;

    saveClouds();

    return cloud;
}

export function deleteCloud(id) {

    const cloudIndex = clouds.findIndex(c => c.id === id);

    if(cloudIndex === -1) return;

    const deletedCloud = clouds.splice(cloudIndex, 1)[0];

    saveClouds();

    return deletedCloud;

}