const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");

const API_KEY = "YOUR_API_KEY";

searchBtn.addEventListener("click", () => {
    getWeather(cityInput.value.trim());
});

cityInput.addEventListener("keypress", e => {
    if(e.key==="Enter"){
        getWeather(cityInput.value.trim());
    }
});

async function getWeather(city){

    if(city===""){
        weatherCard.innerHTML="<p class='error'>Please enter a city.</p>";
        return;
    }

    loading.textContent="Loading...";

    weatherCard.innerHTML="";

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        renderWeather(data);

    }
    catch(error){

        weatherCard.innerHTML=`
        <p class="error">${error.message}</p>
        `;

    }
    finally{

        loading.textContent="";

    }

}

function renderWeather(data){

    weatherCard.innerHTML=`

    <h2>${data.name}, ${data.sys.country}</h2>

    <img
    src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
    alt="Weather Icon">

    <h3>${data.main.temp} °C</h3>

    <p><strong>Condition:</strong> ${data.weather[0].main}</p>

    <p><strong>Description:</strong> ${data.weather[0].description}</p>

    <p><strong>Feels Like:</strong> ${data.main.feels_like} °C</p>

    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>

    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>

    <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>

    <p><strong>Visibility:</strong> ${(data.visibility/1000).toFixed(1)} km</p>

    `;

}