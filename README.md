
# Real-Time Weather Tracker 🌦️

A modern, feature-rich, and responsive weather application that provides real-time weather information, 5-day forecasts, air quality, UV index, and weather alerts for any city worldwide. Built with HTML, CSS, and JavaScript, it features animated weather icons, dynamic backgrounds, favorites, recent searches, and city/time-based themes for a beautiful and interactive user experience.


## ✨ Features

- 🌡️ **Real-time weather data** (current conditions, temperature, humidity, wind, pressure)
- 📅 **5-day weather forecast** with animated icons
- 🕒 **Real-time city clock** (shows local time for searched city)
- 🌫️ **Air Quality Index (AQI)** and 🟣 **UV Index (UVI)**
- ⚠️ **Weather alerts** (if available for the city)
- 🌅 **Sunrise/Sunset times**
- ⭐ **Favorites** and 🕑 **Recent searches** (persistent)
- 🔄 **Unit toggle** (Celsius/Fahrenheit)
- 🎬 **Animated weather icons** (SVG, with fallback)
- 🖼️ **Dynamic backgrounds** (day/night, weather, city-specific)
- 🎨 **Auto theme switching** (light/dark, based on time/weather)
- 🌓 **Manual theme toggle**
- 💾 **LocalStorage** for persistent user preferences
- 📱 **Fully responsive design**
- ⚡ **Smooth animations and transitions**


## 🛠️ Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, CSS Variables)
- JavaScript (ES6+)
- OpenWeatherMap API (weather, forecast, air_pollution, onecall)
- Font Awesome & Animated SVG Weather Icons


## 🚀 Getting Started

### Prerequisites

- A modern web browser
- An OpenWeatherMap API key ([get one for free](https://openweathermap.org/api))

### Installation

1. **Clone the repository:**
   ```bash
   git clone [your-repository-url]
   ```
2. **Navigate to the project directory:**
   ```bash
   cd -Real-Time-Weather-Tracker--main
   ```
3. **Open `index.html` in your web browser**

### API Key Setup

1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/)
2. Get your API key from your account dashboard.
3. Replace the `API_KEY` value in `script.js` with your key.


## 🧑‍💻 Usage

1. Open the application in your web browser.
2. The app will automatically show weather for your current location (if allowed), or Jaipur by default.
3. Enter any city name in the search box and press Enter or click the search button.
4. Add cities to favorites for quick access, or use the recent searches dropdown.
5. Toggle between dark and light mode using the theme button, or let the app auto-switch based on city time.
6. Click the location button to get weather for your current location.
7. View AQI, UVI, sunrise/sunset, and weather alerts (if available).


## 🔍 Features in Detail

### Current Weather Display
- City name, current date, and real-time local clock
- Temperature (°C/°F)
- Weather description and animated icon
- Wind speed, humidity, pressure
- Air Quality Index (AQI) and UV Index (UVI)
- Sunrise and sunset times
- Weather alerts (if available)

### 5-Day Forecast
- Daily weather predictions
- Animated weather icons (SVG, with fallback)
- Temperature for each day
- Day of the week

### UI & Experience
- Smooth animations for all elements
- Responsive design for all screen sizes
- Dark/Light mode with smooth transitions
- Weather-based and city/time-based background themes (day/night images)
- Favorites and recent searches (persistent)
- Interactive elements with hover effects


## 🗂️ Code Structure

```
-Real-Time-Weather-Tracker--main/
├── index.html    # Main HTML structure
├── styles.css    # Styling, themes, and animations
└── script.js     # Weather API integration, UI logic, and features
```

### Key Components & Feature Mapping

1. **HTML Structure** (`index.html`)
    - Search, favorites, and recent search containers (Favorites/Recents UI)
    - Current weather display (Weather, AQI, UVI, alerts, sunrise/sunset)
    - Forecast container (5-day forecast, animated icons)
    - Theme toggle and location button (Theme switching, geolocation)

2. **CSS Features** (`styles.css`)
    - CSS Variables for theming (Light/Dark/Auto theme)
    - Grid and Flexbox layouts (Responsive design)
    - Responsive design for all screen sizes
    - Animations and transitions (Smooth UI, icon animation)
    - Weather and time-based backgrounds (Dynamic backgrounds: day/night, weather, city)

3. **JavaScript Functionality** (`script.js`)
    - API integration (weather, forecast, AQI, UVI, alerts)
    - Data fetching and processing (All OpenWeatherMap endpoints)
    - DOM manipulation and UI updates (All features)
    - Animated icon logic and fallback (Animated SVGs, FontAwesome fallback)
    - Favorites, recents, and localStorage (Persistent user data)
    - Theme and background switching (Auto/manual, city/time-based)
    - Real-time city clock (Timezone logic)
    - Unit toggle (Celsius/Fahrenheit)
    - Error handling (API/network/UI errors)
    - Weather alerts display (if available)


## 🌐 API Integration

The app uses the OpenWeatherMap API with the following endpoints:
- **Current Weather:** `/weather`
- **5-Day Forecast:** `/forecast`
- **Air Quality Index:** `/air_pollution`
- **UV Index & Alerts:** `/onecall`


## 🛡️ Error Handling

The application includes comprehensive error handling for:
- Invalid API keys
- City not found
- Network errors
- Invalid responses


## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.


## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API
- [Font Awesome](https://fontawesome.com/) and [Basmilius Weather Icons](https://github.com/basmilius/weather-icons) for the icons
- [Unsplash](https://unsplash.com/) for background images
- All contributors who have helped improve this project


## 📬 Contact

Lavi Bansal - (bansallavi37@gmail.com)
Project Link: [https://github.com/Lavibansal/-Real-Time-Weather-Tracker-](https://github.com/Lavibansal/-Real-Time-Weather-Tracker-)
