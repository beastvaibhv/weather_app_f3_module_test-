// Get DOM elements
const fetchDataBtn = document.getElementById('fetchDataBtn');
const weatherDetails = document.getElementById('weatherDetails');
const landingPage = document.querySelector('.landing-page');


// Event listener for Fetch Data button click
fetchDataBtn.addEventListener('click', () => {
    console.log("hello i am clicked");
    landingPage.innerHTML=" Welcome To The Weather app";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherData, showError);
    } else {
        weatherDetails.innerHTML = 'Geolocation is not supported by this browser.';
    }
});

// Function to fetch weather data using latitude and longitude

async function fetchWeatherData(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    displayMap(latitude, longitude);
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = 'b1ea740c71ba688bf21b1c8a800b9284';
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl , { mode: 'no-cors'});
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        
        const data = await response.json();
        console.log(typeof data);
        displayWeatherData(data);
       
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle error - Display a message or take necessary actions
    }
}

function displayMap(latitude, longitude) {
    const mapApiKey='AIzaSyDZZXYwbbcNDrORLcYJDhwccxIhr2Lxla8';
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = `
        <iframe width="600" height="450" frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=${mapApiKey}" allowfullscreen>
        </iframe>
    `;
   

}
// Function to display weather details
function displayWeatherData(data) {
    
}

// Function to handle geolocation errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            weatherDetails.innerHTML = 'User denied the request for Geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            weatherDetails.innerHTML = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            weatherDetails.innerHTML = 'The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            weatherDetails.innerHTML = 'An unknown error occurred.';
            break;
    }
}
