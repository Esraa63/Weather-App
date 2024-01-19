$.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
        weather(location.city);
} });
let Countryname=document.getElementById('inputName');
let counter=0;
document.getElementById("inputName").addEventListener('keypress',function(){
    counter++;
    if(counter>3){
        weather(Countryname.value);
        counter=0;
    }

});
document.getElementById("submit").addEventListener('click',function(){
    weather(Countryname.value);
    Countryname.value="";
});
let day="";
async function weather(name) {  
    const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7155d2a381a746fbb8a134635241801&q=${name}&days=3`);
    let forecasts=[{}];
    if(response.ok==true && response.status==200){
        let final = await response.json();
        //current
        let current={
            location:final.location.name,
            temp:final.current.temp_c,
            statues:final.current.condition.text,
            icon:final.current.condition.icon,
            day: checkDay(new Date(final.current.last_updated).getDay()),
            date:new Date(final.current.last_updated).getDate(),
            month:monthList[new Date().getMonth()],
            wind_dir:final.current.wind_dir,
            wind_kph:final.current.wind_kph
        }
          displayCurrentData(current);
         //forecast
         for(let i=0;i<final.forecast.forecastday.length-1;i++){  
               forecasts[i]={
                    statues:final.forecast.forecastday[i+1].day.condition.text,
                    maxTemp:final.forecast.forecastday[i+1].day.maxtemp_c,
                    minTemp:final.forecast.forecastday[i+1].day.mintemp_c,
                    icon:final.forecast.forecastday[i+1].day.condition.icon,
                    day:checkDay(new Date(final.forecast.forecastday[i+1].date).getDay())                  
                 };
         }  
         displayForecastData(forecasts);
    }
  }    

function checkDay(date){
        switch(date){
            case 0:
                day="Sunday";
                break;
              case 1:
                day="Monday";
                break;
              case 2:
                day="Tuesday";
                break;
              case 3:
                day="Wednesday";
                break;
              case 4:
                day="Thursday";
                break;
              case 5:
                day="Friday";
                break;
              case 6:
                day=("Saturday");
         }
         return day;
}

function displayCurrentData(current){
    let cartona=``;
        cartona+=` 
        <div class="col-md-4" >       
         <div style="color: #fff; " class="d-flex justify-content-between  p-3 bg-headColor ">
          <span>${day}</span>
          <span>${current.date} ${current.month} </span>
        </div>
        <div class="p-3 text-white bg-bodyColor">
          <span>${current.location}</span>
          <h1>${current.temp}\u00B0C   <img src="https:${current.icon}" alt="" width="90"></h1>
          <p>${current.statues}</p>
          <p><span><i class="bi bi-umbrella"></i></span> 20% <span class="ps-2"><i class="bi bi-wind"></i></span> ${current.wind_kph}km/h <span  class="ps-2"><i class="bi bi-compass"></i></span> ${current.wind_dir}</p>
        </div>
        </div>
        `;
  document.getElementById("firstDiv").innerHTML=cartona;
}

function displayForecastData(forecasts){
    let cartona2=``;
    for(let i=0; i<forecasts.length;i++){
        cartona2+=`
        <div class="col-md-4 text-center">
        <div style="color: #fff; " class="  p-3 bg-headColor">
          <span>${forecasts[i].day}</span>
        </div>
        <div class="p-4 bg-bodyColor text-white ">
          <img src="http:${forecasts[i].icon}" alt="">
        <h1>${forecasts[i].maxTemp}\u00B0C</h1>
        <span>${forecasts[i].minTemp}\u00B0C</span>
        <p>${forecasts[i].statues}</p>
        </div>
        </div>`;
    }
    document.getElementById("firstDiv").innerHTML+=cartona2;
}
