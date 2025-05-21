const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResults");

const API_KEY = '84e6b321c878c85f16d6be356ca20601';

form.addEventListener("submit", async(event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        weatherResult.innerHTML = '<p>Veuillez entrer le nom de la ville</p>';
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if(!response.ok) {
            throw Error ('Ville non trouvée')
        }

        const data = await response.json();

        weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div class="results">
            <div class="weatherResult">
            <i class="fa-solid fa-temperature-three-quarters"></i>
            <p> Temperature: ${data.main.temp}°C</p>
        </div>

        
        <div class="weatherResult">
                <i class="fa-solid fa-temperature-full"></i>
                <p>Ressenti: ${(data.main.feels_like)}°C</p>
            </div>


        <div class="weatherResult">
                <i class="fa-solid fa-droplet"></i>
                <p>Humidité: ${data.main.humidity}%</p>
            </div>  



        `

    } catch (error){
        weatherResult.innerHTML = `<p>Error: ${error.message}</p>`

    }
})

