var search= document.querySelector("#search-form");
var cityName= document.querySelector("#city");
var currCity= document.querySelector(".city");
var today= document.querySelector("#date");
var temperature= document.getElementById("temp");
var humidity= document.getElementById("humid");
var wind= document.getElementById('mph');
var UV= document.getElementById('uv');
var id= "6816f64f60a3280d741d1bb4d4f17625";

var getCity= function(event){
    event.preventDefault();
    
    var city= cityName.value.trim();
    var CurrUrl= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+id;
    fetch(CurrUrl).then(function(response){
        response.json().then(function(data){
            currCity.innerHTML= city;
            displayCurrWeather(data);
        });
    });
};

function displayCurrWeather(forecast){
    var lati= forecast.coord.lat;
    var long= forecast.coord.lon;
    var currSec= forecast.dt;
    var date= new Date(currSec * 1000);
    today.innerHTML= 1+date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear();
    temperature.innerHTML= forecast.main.temp;
    humidity.innerHTML= forecast.main.humidity;
    wind.innerHTML= forecast.wind.speed;
    var fURL= "https://api.openweathermap.org/data/2.5/onecall?lat="+lati+"&lon="+long+"&exclude=alerts,hourly,minutely&units=imperial&appid="+id;
    fetch(fURL).then(function(response){
        response.json().then(function(data){
            UV.innerHTML= data.current.uvi;
            displayFutureWeather(data);
        });
    });
}

function displayFutureWeather(forecast){
    console.log(forecast);
}

search.addEventListener("submit", getCity);