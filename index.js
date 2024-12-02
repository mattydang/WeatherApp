const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "sample_key";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter a City!")
    }
});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    
    const response = await fetch(apiUrl);
    
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return  await response.json();
}


function displayWeatherInfo(data){
    const{name: city, 
        main: {temp, feels_like, humidity, pressure}, 
        weather: [{description, id}]} = data;


        card.textContent = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const feelsDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const pressureDisplay = document.createElement("p");
        const descripDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C` 
                                    + " / " + 
                                    `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
        feelsDisplay.textContent = `Feels Like: 
                                    ${(feels_like - 273.15).toFixed(1)}°C` 
                                    + " / " + 
                                    `${((feels_like - 273.15) * (9/5) + 32).toFixed(1)}°F`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        pressureDisplay.textContent = `Pressure: ${(pressure).toFixed(1)} hPa`
        descripDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);
        
        

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        feelsDisplay.classList.add("feelsDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        pressureDisplay.classList.add("pressureDisplay")
        descripDisplay.classList.add("descripDisplay");
        weatherEmoji.classList.add("weatherEmoji");

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(feelsDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(pressureDisplay);
        card.appendChild(descripDisplay);
        card.appendChild(weatherEmoji);

}
function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "☃️";
        case (weatherId >= 700 && weatherId < 800):
            return "😶‍🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "😱";
    }
}

function displayError(msg){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = msg;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}