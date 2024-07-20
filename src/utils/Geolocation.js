// geolocation.js
async function Geolocation () {
    // Function to get the geolocation of the browser
    async function getGeolocation() {
        if(!navigator.geolocation) {
            throw new Error("Geolocation not supported in this browser");
        }
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position.coords);
            }, (error) => {
                reject(error);
            });
        });
    }
    return await getGeolocation();
}

export default Geolocation;