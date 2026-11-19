let clouds = [];

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

    return newCloud;
}

export function renameCloud(id, newName) {

    const cloud = clouds.find( c => c.id === id );

    if (!cloud) return;

    cloud.name = newName;

    return cloud;
}

export function deleteCloud(id) {

    const cloudIndex = clouds.findIndex(c => c.id === id);

    if(cloudIndex === -1) return;

    return clouds.splice(cloudIndex, 1)[0];

}