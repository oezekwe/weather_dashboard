//var select= document.createElement("select");
var search= document.querySelector("#search-form");
var cityName= document.querySelector("#city");
var currCity= document.querySelector(".city");
var prevC= document.querySelector(".cities");
var today= document.querySelector("#date");
var remove= document.querySelector("#hidden");
var UV= document.querySelector('#uv');
var temperature= document.getElementById("temp");
var humidity= document.getElementById("humid");
var wind= document.getElementById('mph');
var id= "6816f64f60a3280d741d1bb4d4f17625";

var Locations= function(city){
    var option= document.createElement("option");
    if(city!=null && !(localStorage.hasOwnProperty(city))){
        localStorage.setItem(city, city);
        option.innerText= localStorage.getItem(city);
        prevC.appendChild(option);
    }
    else if(city==null){
        for(let b=0; b < localStorage.length; b++){
            option= document.createElement("option");
            option.innerText= localStorage.getItem(localStorage.key(b));
            prevC.appendChild(option);
        }
    }
}

var getCity= function(event){
    event.preventDefault();
    
    var city= cityName.value.trim();
    cityName.value= "";
    city= city.substring(0,1).toUpperCase()+city.substring(1);
    var CurrUrl= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+id;
    debugger
    fetch(CurrUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                Locations(city);
                currCity.innerHTML= city;
                displayCurrWeather(data);
            });
        }
        else{
            alert("Input wrong city. Please try again");
        }
        
    });
};

function displayCurrWeather(forecast){
    var lati= forecast.coord.lat;
    var long= forecast.coord.lon;
    var condition= forecast.weather[0].icon;
    var currSec= forecast.dt;
    var date= new Date(currSec * 1000);
    today.innerHTML= 1+date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear();
    $("#currCond").html("<img src=\"http://openweathermap.org/img/wn/"+ condition +".png\">");
    temperature.innerHTML= forecast.main.temp;
    humidity.innerHTML= forecast.main.humidity;
    wind.innerHTML= forecast.wind.speed;
    if(remove.getAttribute("id") == "hidden"){
        remove.setAttribute("id", "visible");
    }
    console.log(forecast);
    var fURL= "https://api.openweathermap.org/data/2.5/onecall?lat="+lati+"&lon="+long+"&exclude=alerts,hourly,minutely&units=imperial&appid="+id;
    fetch(fURL).then(function(response){
        response.json().then(function(data){
            if(data.current.uvi < 3){
                UV.setAttribute("class", "favorable");
                UV.innerHTML= data.current.uvi;
            }
            else if(data.current.uvi < 8){
                UV.setAttribute("class", "moderate");
                UV.innerHTML= data.current.uvi;
            }
            else{
                UV.setAttribute("class", "severe");
                UV.innerHTML= data.current.uvi;
            }
            displayFutureWeather(data);
        });
    });
}

function displayFutureWeather(forecast){
    for(var x=1; x<6; x++){
        let cast= forecast.daily[x];
        let d= new Date(cast.dt * 1000);
        let date= 1+d.getMonth()+"/"+d.getDate()+"/"+d.getFullYear();
        $(".dy"+x+" h3").html(date);
        $(".dy"+x+" p:nth-of-type(1)").html("Temp: "+cast.temp.max+"&#8457;");
        $(".dy"+x+" p:nth-of-type(2)").html("<img src=\"http://openweathermap.org/img/wn/"
        + cast.weather[0].icon +".png\">");
        $(".dy"+x+" p:nth-of-type(3)").html("Humidity: "+cast.humidity+"%");
        $(".col-auto").css("background-color", "lightblue");
    }
}

cityName.value= "";
Locations(null);
search.addEventListener("submit", getCity);
prevC.addEventListener("change", (event) => {
    var Prevcity= event.target.value;
    var url= "https://api.openweathermap.org/data/2.5/weather?q="+Prevcity+"&units=imperial&appid="+id;
    fetch(url).then(function(response){
        response.json().then(function(Rdata){
            currCity.innerHTML= Prevcity;
            displayCurrWeather(Rdata);
        });
    });
  });