const form = document.querySelector('.form-container')
const input = document.querySelector('.search-bar')
const url = 'https://api.openweathermap.org/data/2.5/weather?q='
const params = '&appid=9d4491a7a424e69ea3741bb28cfa45b7&units=metric&lang=pt_br'


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = input.value
    fetch(url + city + params)
        .then(response => response.json())
        .then(data => {
            const city = data.name
            const country = data.sys.country
            const temp = data.main.temp
            const tempMin = data.main.temp_min
            const tempMax = data.main.temp_max
            const description = data.weather[0].description
            const icon = data.weather[0].icon
            const humidity = data.main.humidity
            const wind = data.wind.speed
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('pt-BR')
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('pt-BR')
            const weather = document.querySelector('.weather')
            form.innerHTML = `
            <div class="city">${city}, ${country}</div>
            <div class="temp">${temp}°C</div>
            <div class="description">${description}</div>
            <div class="temp-min-max">Mínima: ${tempMin}°C | Máxima: ${tempMax}°C</div>
            <div class="humidity">Umidade: ${humidity}%</div>
            <div class="wind">Vento: ${wind}m/s</div>
            <div class="sunrise">Nascer do sol: ${sunrise}</div>
            <div class="sunset">Pôr do sol: ${sunset}</div>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="icon">
            <button class="button-23" onclick="window.location.reload()">Nova busca</button>
            `
        })
        .catch(() => {
            const weather = document.querySelector('.weather')
            weather.innerHTML = `
            <div class="city">Cidade não encontrada</div>
            `
        })

})