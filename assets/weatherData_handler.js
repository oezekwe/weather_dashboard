var search= document.querySelector("#search-form");
var cityName= document.querySelector("#city");
var id= "6816f64f60a3280d741d1bb4d4f17625";

var getCity= function(event){
    event.preventDefault();
    
    var city= cityName.value.trim();
    var CurrUrl= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+id;
    fetch(CurrUrl).then(function(response){
        response.json().then(function(data){
            displayCurrWeather(data);
        });
    });
};

function displayCurrWeather(forecast){
    var lati= forecast.coord.lat;
    var long= forecast.coord.lon;
    var fURL= "https://api.openweathermap.org/data/2.5/onecall?lat="+lati+"&lon="+long+"&exclude=alerts,hourly,minutely,current&units=imperial&appid="+id;
    fetch(fURL).then(function(response){
        response.json().then(function(data){
            displayFutureWeather(data);
        });
    });
}

function displayFutureWeather(forecast){
    console.log(forecast);
}

search.addEventListener("submit", getCity);