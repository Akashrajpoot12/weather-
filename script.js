// API Configuration
const API_KEY = '6a33cb200fca48e3f337787759f47b4c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const themeToggle = document.querySelector('.theme-toggle');
const cityName = document.getElementById('city-name');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');
const weatherIconContainer = document.querySelector('.weather-icon');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const forecastCards = document.getElementById('forecast-cards');
const loadingOverlay = document.getElementById('loading-overlay');
const cityTime = document.getElementById('city-time');
const aqi = document.getElementById('aqi');
const uvi = document.getElementById('uvi');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const alertsContainer = document.getElementById('alerts-container');
const favoritesList = document.getElementById('favorites-list');
const addFavoriteBtn = document.getElementById('add-favorite');
const recentList = document.getElementById('recent-list');
// --- FAVORITES & RECENT SEARCHES ---
const FAVORITES_KEY = 'weather_favorites';
const RECENT_KEY = 'weather_recent';
const MAX_RECENT = 5;

function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
}
function setFavorites(favs) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}
function getRecent() {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
}
function setRecent(list) {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
}

function updateFavoritesUI() {
    const favs = getFavorites();
    favoritesList.innerHTML = '';
    favs.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        favoritesList.appendChild(opt);
    });
}

function updateRecentUI() {
    const recents = getRecent();
    recentList.innerHTML = '';
    recents.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        recentList.appendChild(opt);
    });
}

function addToRecent(city) {
    if (!city) return;
    let recents = getRecent();
    recents = recents.filter(c => c.toLowerCase() !== city.toLowerCase());
    recents.unshift(city);
    if (recents.length > MAX_RECENT) recents = recents.slice(0, MAX_RECENT);
    setRecent(recents);
    updateRecentUI();
}

function addToFavorites(city) {
    if (!city) return;
    let favs = getFavorites();
    if (!favs.some(c => c.toLowerCase() === city.toLowerCase())) {
        favs.push(city);
        setFavorites(favs);
        updateFavoritesUI();
    }
}

// --- Event Listeners for Favorites/Recent ---
addFavoriteBtn.addEventListener('click', () => {
    const city = cityName.textContent;
    if (city && city !== '--') {
        addToFavorites(city);
    }
});

favoritesList.addEventListener('change', () => {
    const city = favoritesList.value;
    if (city) {
        cityInput.value = city;
        searchBtn.click();
    }
});

recentList.addEventListener('change', () => {
    const city = recentList.value;
    if (city) {
        cityInput.value = city;
        searchBtn.click();
    }
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.innerHTML = document.body.dataset.theme === 'dark' ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Initialize theme
document.body.dataset.theme = 'light';

// Get current date
function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date.textContent = new Date().toLocaleDateString('en-US', options);
}

// Get weather icon
function getWeatherIcon(iconCode) {
    // For fallback FontAwesome
    const iconMap = {
        '01d': 'fa-sun',
        '01n': 'fa-moon',
        '02d': 'fa-cloud-sun',
        '02n': 'fa-cloud-moon',
        '03d': 'fa-cloud',
        '03n': 'fa-cloud',
        '04d': 'fa-cloud',
        '04n': 'fa-cloud',
        '09d': 'fa-cloud-rain',
        '09n': 'fa-cloud-rain',
        '10d': 'fa-cloud-sun-rain',
        '10n': 'fa-cloud-moon-rain',
        '11d': 'fa-bolt',
        '11n': 'fa-bolt',
        '13d': 'fa-snowflake',
        '13n': 'fa-snowflake',
        '50d': 'fa-smog',
        '50n': 'fa-smog'
    };
    return iconMap[iconCode] || 'fa-cloud';
}

// Animated SVG/GIF icon map
const animatedIconMap = {
    '01d': 'https://basmilius.github.io/weather-icons/production/fill/svg/clear-day.svg',
    '01n': 'https://basmilius.github.io/weather-icons/production/fill/svg/clear-night.svg',
    '02d': 'https://basmilius.github.io/weather-icons/production/fill/svg/partly-cloudy-day.svg',
    '02n': 'https://basmilius.github.io/weather-icons/production/fill/svg/partly-cloudy-night.svg',
    '03d': 'https://basmilius.github.io/weather-icons/production/fill/svg/cloudy.svg',
    '03n': 'https://basmilius.github.io/weather-icons/production/fill/svg/cloudy.svg',
    '04d': 'https://basmilius.github.io/weather-icons/production/fill/svg/overcast.svg',
    '04n': 'https://basmilius.github.io/weather-icons/production/fill/svg/overcast.svg',
    '09d': 'https://basmilius.github.io/weather-icons/production/fill/svg/rain.svg',
    '09n': 'https://basmilius.github.io/weather-icons/production/fill/svg/rain.svg',
    '10d': 'https://basmilius.github.io/weather-icons/production/fill/svg/rain.svg',
    '10n': 'https://basmilius.github.io/weather-icons/production/fill/svg/rain.svg',
    '11d': 'https://basmilius.github.io/weather-icons/production/fill/svg/thunderstorms.svg',
    '11n': 'https://basmilius.github.io/weather-icons/production/fill/svg/thunderstorms.svg',
    '13d': 'https://basmilius.github.io/weather-icons/production/fill/svg/snow.svg',
    '13n': 'https://basmilius.github.io/weather-icons/production/fill/svg/snow.svg',
    '50d': 'https://basmilius.github.io/weather-icons/production/fill/svg/fog.svg',
    '50n': 'https://basmilius.github.io/weather-icons/production/fill/svg/fog.svg'
};

// Show loading overlay
function showLoading() {
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.opacity = '1';
}

// Hide loading overlay
function hideLoading() {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
    }, 300);
}

// Get weather by coordinates
async function getWeatherByCoords(lat, lon) {
    showLoading();
    try {
        const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        
        if (data.cod === 401) {
            throw new Error('API key is invalid or not activated yet. Please wait a few hours for the key to activate, or check if the key is correct.');
        }
        
        if (data.cod && data.cod !== 200) {
            throw new Error(data.message || 'Location not found');
        }

        updateWeatherUI(data);
        await Promise.all([
            fetchForecastByCoords(lat, lon),
            fetchAirQuality(lat, lon),
            fetchOneCall(lat, lon),
            fetchAlerts(lat, lon, data.name)
        ]);
    } catch (error) {
        console.error('Weather API Error:', error);
        alert('Error fetching weather data: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Get weather by city name
async function getWeatherByCity(city) {
    showLoading();
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        
        if (data.cod === 401) {
            throw new Error('API key is invalid or not activated yet. Please wait a few hours for the key to activate, or check if the key is correct.');
        }
        
        if (data.cod && data.cod !== 200) {
            throw new Error(data.message || 'City not found');
        }

        updateWeatherUI(data);
        // Get coordinates for AQI, UVI, alerts
        const { lon, lat } = data.coord;
        await Promise.all([
            fetchForecast(city),
            fetchAirQuality(lat, lon),
            fetchOneCall(lat, lon),
            fetchAlerts(lat, lon, data.name)
        ]);

        // Add to recent searches
        addToRecent(data.name);
    } catch (error) {
        console.error('Weather API Error:', error);
        alert('Error fetching weather data: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Update weather UI
function updateWeatherUI(data) {
    cityName.style.animation = 'none';
    cityName.offsetHeight; // Trigger reflow
    cityName.style.animation = 'fadeIn 0.5s ease-in';


    cityName.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;

    // Animated icon (always keep #weather-icon for JS reference)
    const iconCode = data.weather[0].icon;
    const animatedUrl = animatedIconMap[iconCode];
    // Remove all animated icons before adding new
    weatherIconContainer.querySelectorAll('img.animated-weather-icon').forEach(img => img.remove());
    if (animatedUrl) {
        // Create and insert animated icon
        const img = document.createElement('img');
        img.className = 'animated-weather-icon';
        img.style.width = '70px';
        img.style.height = '70px';
        img.src = animatedUrl;
        img.alt = 'weather icon';
        img.onerror = function() {
            // If SVG fails to load, show fallback icon
            img.remove();
            weatherIcon.style.display = '';
            weatherIcon.className = `fas ${getWeatherIcon(iconCode)}`;
        };
        weatherIconContainer.appendChild(img);
        weatherIcon.style.display = 'none';
    } else {
        weatherIcon.style.display = '';
        weatherIcon.className = `fas ${getWeatherIcon(iconCode)}`;
    }

    wind.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    pressure.textContent = `${data.main.pressure} hPa`;

    updateBackgroundImage(data.weather[0].main, iconCode);

    // Show real-time clock for city
    if (typeof data.timezone === 'number') {
        startCityClock(data.timezone);
    } else {
        cityTime.textContent = '--:--';
    }

    // Sunrise/Sunset
    if (data.sys) {
        sunrise.textContent = unixToTime(data.sys.sunrise, data.timezone);
        sunset.textContent = unixToTime(data.sys.sunset, data.timezone);
    } else {
        sunrise.textContent = '--:--';
        sunset.textContent = '--:--';
    }
    // Reset AQI, UVI, Alerts
    aqi.textContent = '--';
    uvi.textContent = '--';
    alertsContainer.innerHTML = '';
}
// Convert unix timestamp to local time string
function unixToTime(unix, tzOffset) {
    if (!unix || typeof tzOffset !== 'number') return '--:--';
    const date = new Date((unix + tzOffset) * 1000 - (new Date().getTimezoneOffset() * 60000));
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Fetch Air Quality Index
async function fetchAirQuality(lat, lon) {
    try {
        const res = await fetch(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await res.json();
        if (data && data.list && data.list[0]) {
            const aqiVal = data.list[0].main.aqi;
            const aqiText = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
            aqi.textContent = `${aqiVal} (${aqiText[aqiVal-1]})`;
        } else {
            aqi.textContent = '--';
        }
    } catch {
        aqi.textContent = '--';
    }
}

// Fetch UVI (and optionally more) from OneCall API
async function fetchOneCall(lat, lon) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`);
        const data = await res.json();
        if (data && typeof data.current.uvi !== 'undefined') {
            uvi.textContent = data.current.uvi;
        } else {
            uvi.textContent = '--';
        }
    } catch {
        uvi.textContent = '--';
    }
}

// Fetch Weather Alerts (from OneCall API)
async function fetchAlerts(lat, lon, city) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await res.json();
        if (data && data.alerts && data.alerts.length > 0) {
            alertsContainer.innerHTML = `<h4>Weather Alerts for ${city}:</h4>` + data.alerts.map(alert =>
                `<div style="background:#ffe0e0;padding:10px;margin:5px 0;border-radius:8px;"><b>${alert.event}</b><br>${alert.description}</div>`
            ).join('');
        } else {
            alertsContainer.innerHTML = '';
        }
    } catch {
        alertsContainer.innerHTML = '';
    }
}

let cityClockInterval;
function startCityClock(timezoneOffset) {
    if (cityClockInterval) clearInterval(cityClockInterval);
    function updateClock() {
        const nowUTC = new Date(Date.now() + new Date().getTimezoneOffset() * 60000);
        const cityDate = new Date(nowUTC.getTime() + timezoneOffset * 1000);
        cityTime.textContent = cityDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    updateClock();
    cityClockInterval = setInterval(updateClock, 1000);
}

// Fetch forecast by coordinates
async function fetchForecastByCoords(lat, lon) {
    try {
        const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        updateForecastUI(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Fetch forecast by city
async function fetchForecast(city) {
    try {
        const response = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        updateForecastUI(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Update forecast UI
function updateForecastUI(data) {
    forecastCards.innerHTML = '';
    const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);

    dailyForecasts.forEach((forecast, index) => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.style.animation = `slideIn 0.5s ease-out ${index * 0.1}s forwards`;
        card.style.opacity = '0';
        const iconCode = forecast.weather[0].icon;
        const animatedUrl = animatedIconMap[iconCode];
        let iconHtml = '';
        if (animatedUrl) {
            // Use a unique id for fallback
            const fallbackId = `forecast-fallback-${index}`;
            iconHtml = `<img src="${animatedUrl}" alt="weather icon" style="width:40px;height:40px;display:block;margin:0 auto;" onerror="this.style.display='none';document.getElementById('${fallbackId}').style.display='block';">
                <i id="${fallbackId}" class="fas ${getWeatherIcon(iconCode)}" style="display:none;font-size:40px;text-align:center;width:40px;"></i>`;
        } else {
            iconHtml = `<i class="fas ${getWeatherIcon(iconCode)}" style="font-size:40px;text-align:center;width:40px;"></i>`;
        }
        card.innerHTML = `
            <h4>${new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h4>
            ${iconHtml}
            <p>${Math.round(forecast.main.temp)}°C</p>
        `;
        forecastCards.appendChild(card);
    });
}

// Update background based on weather (with images)
function updateBackgroundImage(weatherCondition, iconCode) {
    const body = document.body;
    // Day/night backgrounds for each weather condition
    const bgMap = {
        'Clear': {
            day: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)',
            night: 'url(https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1200&q=80)'
        },
        'Clouds': {
            day: 'url(https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80)',
            night: 'url(https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80)'
        },
        'Rain': {
            day: 'url(https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80)',
            night: 'url(https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80)'
        },
        'Snow': {
            day: 'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80)',
            night: 'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80)'
        },
        'Thunderstorm': {
            day: 'url(https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80)',
            night: 'url(https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80)'
        },
        'Drizzle': {
            day: 'url(https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80)',
            night: 'url(https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80)'
        },
        'Mist': {
            day: 'url(https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1200&q=80)',
            night: 'url(https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1200&q=80)'
        }
    };
    // Determine if it's night or day from iconCode
    const isNight = iconCode && iconCode.endsWith('n');
    const condition = bgMap[weatherCondition] ? weatherCondition : 'Clear';
    const bgUrl = isNight ? bgMap[condition].night : bgMap[condition].day;
    body.style.background = `${bgUrl} center/cover no-repeat fixed`;

    // Auto theme: dark at night, light at day
    if (isNight) {
        document.body.dataset.theme = 'dark';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.dataset.theme = 'light';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                hideLoading();
                console.error('Geolocation error:', error);
                alert('Unable to get your location. Please enter a city name manually.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser. Please enter a city name manually.');
    }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    }
});

locationBtn.addEventListener('click', getUserLocation);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Initialize
updateDate();
updateFavoritesUI();
updateRecentUI();
getUserLocation(); // Get weather for user's location by default 
