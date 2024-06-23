
const navLinks = Array.from(document.querySelectorAll('.nav-item'));
const btnFind = document.querySelector('#btnFind');
const findInput = document.querySelector('#findInput');
const forecast = document.querySelector('#forecast');

//Api
var APIKey = '54305ae68c90447d866190824242106';
var baseURL = 'http://api.weatherapi.com/v1/forecast.json';

let searchLocation = '';
let weatherList = {};
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


//handel 


function handleDay(dateString) {
    var d = new Date(dateString);
    var dayName = days[d.getDay()];
    return dayName;
}
function handleMonth(dateString) {
    var d = new Date(dateString);
    var monthName = monthNames[d.getMonth()];
    return monthName;
}






async function getWeather(searchLocation) {
    try {
        let response = await fetch(`${baseURL}?key=${APIKey}&q=${searchLocation}&days=3`);
        if (response.ok && response.status === 200) { return await response.json(); }
    } catch (error) {
        console.log('error');
    }
}


async function displayWeather() {
    weatherList = await getWeather(searchLocation);
    var currentObj = weatherList.current;
    var locationObj = weatherList.location;
    var forecastArr = weatherList.forecast.forecastday;
    var weatherContainer = `
 <div id="today" class="col-md-4 text-white data-weather text-white m-0  ">
                    <div class="head p-2 d-flex justify-content-between">
                        <p>${handleDay(locationObj.localtime)}</p>
                       
                    </div>

                    <div id="current" class="body-weather text-center pt-5 pb-5 pe-3 ps-2 ">
                        <p class='text-start fs-2'>${locationObj.name}</p>
                        <h1 class='text-start temp'>${currentObj.temp_c}<sup>O</sup>C</h1>
                      
                        <img src="${currentObj.condition.icon}" class="w-25 pt-3 " alt="">
                        <p class='text-start text-info'>${currentObj.condition.text}</p>
                    </div>

                    <div class="footer pb-4 pe-4 ">
                        <ul class="d-flex justify-content-around ">
                            <li><span><i class="fa-solid fa-wind  pe-1"></i></span>${currentObj.wind_kph}km/h</li>
                            <li><span><i class="fa-solid fa-umbrella  pe-1 "></i></span>${currentObj.wind_degree}%</li>
                            <li> <span><i class="fa-solid fa-compass  pe-1 "></i></span>${currentObj.wind_dir}</li>
                        </ul>
                    </div>



                </div>



  <div class="col-md-4 text-white data-weather m-0 " id="tomorrow">
                    <div class="head p-2 d-flex justify-content-between">
                        <p class="text-center">${handleDay(forecastArr[1].date)}</p>

                    </div>

                    <div class="body-weather text-center pt-5 pb-5 pe-3 ps-2 ">

                        <img src="${forecastArr[1].day.condition.icon}" class="  " alt="">
                        <h1 class="temp2 pt-4">${forecastArr[1].day.maxtemp_c}<sup>O</sup>C</h1>
                        <p class="fs-5 mb-0">${forecastArr[1].day.mintemp_c}<sup>o</sup></p>
                        <p class="text-center text-info pt-4">${forecastArr[1].day.condition.text}</p>
                    </div>

                </div>
  




      <!--^ afterTomorrow -->
       <div id="afterTomorrow" class="col-md-4 text-white data-weather m-0 ">
                    <div class="head p-2 text-center">
                        <p>${handleDay(forecastArr[2].date)}</p>

                    </div>

                    <div class="body-weather text-center pt-5 pb-5 pe-3 ps-2 ">
                        <img src="${forecastArr[1].day.condition.icon}" class="  " alt="">
                        <h1 class="mt-4 mb-4">${forecastArr[2].day.maxtemp_c}<Sup>O</Sup>C</h1>
                         <p class="fs-5 mb-0">${forecastArr[2].day.mintemp_c}<sup>o</sup></p>
                        <p class="mt-4  text-info">${forecastArr[2].day.condition.text}</p>
                    </div>




                </div>





  `
    forecast.innerHTML = weatherContainer;
}


// &=============== EVENTS ===============


btnFind.addEventListener('click', (e) => {
    e.preventDefault();
    if (findInput.value) {
        searchLocation = findInput.value;
        displayWeather();
    }
});
findInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (findInput.value) {
        searchLocation = findInput.value;
        displayWeather();
    }
});