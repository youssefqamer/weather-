const tDay=document.querySelector('.t-day')
const tDate=document.querySelector('.t-date')
const city=document.querySelector('.city')
const nCity=document.querySelectorAll('.n-city')
const tDegree=document.querySelector('.t-degree')
const tStatus=document.querySelector('.t-status')
const tRain=document.querySelector('.t-rain')
let tIcon=document.getElementById('t-icon')
const tHumadity=document.querySelector('.humidaty')
const wSpeed=document.querySelector('.w-speed')
const wDirection=document.querySelector('.w-direction')
const nextDays=document.querySelectorAll('.next-days')
const nDay=document.querySelectorAll('.n-day')
const nDate=document.querySelectorAll('.n-date')
const nDegree=document.querySelectorAll('.n-degree')
const nIcon=document.querySelectorAll('.n-icon')
const nstatus=document.querySelectorAll('.n-status')
const nRain=document.querySelectorAll('.n-rain')
const nHumadity=document.querySelectorAll('.n-humidaty')
const nWSpeed=document.querySelectorAll('.n-w-speed')
const nWDirection=document.querySelectorAll('.n-w-direction')

let result;
let date;
const searchInput=document.querySelector('.search')
const array=['Sunday','Monday','Tuesday','Wednesday','Thursday','Fridday','Saturday']
// 
async function getData(searchCity='cairo'){
    let response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=641fa38da4624675bf982728221410&q=${searchCity}&days=3`)
    //  let response=await fetch(`https://api.weatherapi.com/v1/current.json?key=d5fea27251824d0ea0564341222410&q=${searchCity}&days=3`)
    
    result=await response.json() 
     showToday()
    showNextDays()
}
getData()
function showToday(){
 date=new Date();
tDay.innerHTML=array[date.getDay()];
tDate.innerHTML=result.forecast.forecastday[0].date;
city.innerHTML=result.location.name;
tDegree.innerHTML= `<sub >${result.current.temp_c} oC</sub>`;
tStatus.innerHTML=result.current.condition.text;
tRain.innerHTML=`rain probability: ${result.forecast.forecastday[0].day.daily_chance_of_rain} %`;

tIcon.setAttribute("src",`https:${result.current.condition.icon}`)
tHumadity.innerHTML=`${result.current.humidity} %`
wSpeed.innerHTML=`${result.current.wind_kph}Km`
wDirection.innerHTML=`${result.current.wind_dir}`
}
function showNextDays(){
    for(let i=0;i<nextDays.length;i++){
    nCity[i].innerHTML=result.location.name
    nDate[i].innerHTML=result.forecast.forecastday[i+1].date;
    nDay[i].innerHTML=array[new Date(result.forecast.forecastday[i+1].date).getDay()]
    nDegree[i].innerHTML=`<sub >${result.forecast.forecastday[i+1].day.maxtemp_c} oC</sub>`;
    nIcon[i].setAttribute("src",`https:${result.forecast.forecastday[i+1].day.condition.icon}`)
    nstatus[i].innerHTML=result.forecast.forecastday[i+1].day.condition.text;
    nRain[i].innerHTML=` rain probability: ${result.forecast.forecastday[i+1].day.daily_chance_of_rain}%`;
    nHumadity[i].innerHTML=`${result.forecast.forecastday[i+1].day.avghumidity} %`;
    nWSpeed[i].innerHTML=`${result.forecast.forecastday[i+1].day.maxwind_kph} Km`;
    nWDirection[i].innerHTML=`${result.forecast.forecastday[i+1].hour[0].wind_dir}`;
}
}
searchInput.addEventListener("keyup",function(){
    let searchCity=searchInput.value
    getData(searchCity)
})

