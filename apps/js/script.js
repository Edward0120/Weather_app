const wrapper = document.querySelector(".wrapper"),
userInput = wrapper.querySelector(".user-input"),
infoText = userInput.querySelector(".info-txt"),
inputField = userInput.querySelector("input"),
locationBtn = userInput.querySelector("button"),
wIcon = document.querySelector("weather-part img"),
apikey = "6c730070ef407ce056ca8396299dad34";

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser does not support geolocation");
    }
});

function onSuccess(position) {
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;
    fetchData();
}

function onError(error) {
    infoText.innerText = error.message;
    infoText.classList.add("error");
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    fetchData();
}

function fetchData() {
    infoText.innerText = "Getting weather details...";
    infoText.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){

    if(info.cod == "404"){
        infoText.classList.replace("pending", "error");
        infoText.innerText = `${inputField.value} isn't a valid city`;
    }else{

        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){

        }

        wrapper.querySelector(".temp .number").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city} .${country}`;
        wrapper.querySelector(".temp .number-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoText.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
    
}