// var geolocation = require('geolocation')

const COORDS = 'coords';

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coords));
}

function handleGeoSuccess(position){
    console.log("position="+position)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
    const test = navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
    console.log("ttt="+test)
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS)
    if (loadCoords === null) {
        askForCoords();
    } else {
        // getWeather
    }
}


function init() {
    loadCoords()
}

init();