const weather = document.querySelector(".js-weather")

const API_KEY = "305da5cc374e56f50e711f395f4e407a";
const COORDS = 'coords';

// 데이터를 얻는 방법은 fetch()를 쓰는 것. 괄호 안에 가져올 데이터가 들어가면 된다 주의할 점은 따옴표가 아닌 백틱을 사용할 것! http://로 시작.
//이부분 에러나서 다시 확인
function getWeather(lat, lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude =  position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude.latitude);
    }
}

function init(){
    loadCoords();
}
init();