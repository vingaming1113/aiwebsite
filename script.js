let currentTime = new Date();
let travelSpeed = 1; // Speed factor, could be adjusted for more dynamic simulations
let map, marker;

function initMap() {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = { lat: latitude, lng: longitude };

        map = new google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 8
        });

        marker = new google.maps.Marker({
            position: userLocation,
            map: map
        });

        updateLocationDisplay(userLocation);
    });
}

function updateDisplay() {
    document.getElementById('current-time').innerText = `Current simulated date and time: ${currentTime.toISOString().slice(0, 19).replace('T', ' ')}`;
    document.getElementById('travel-speed').innerText = `Current travel speed: ${travelSpeed}x`;
    addAnimation();
}

function updateLocationDisplay(location) {
    document.getElementById('current-location').innerText = `Current location: Lat ${location.lat.toFixed(2)}, Lng ${location.lng.toFixed(2)}`;
    marker.setPosition(location);
    map.setCenter(location);
}

function addAnimation() {
    const timeDisplay = document.getElementById('current-time');
    timeDisplay.classList.remove('flash');
    setTimeout(() => timeDisplay.classList.add('flash'), 10);
}

function simulateTimeTravel(days) {
    if (Math.random() < 0.1) { // 10% chance of time travel failure
        alert("Time travel failed!");
        return;
    }

    const speedFactor = Math.random() * 2 + 1; // Random speed factor between 1 and 3
    travelSpeed = speedFactor.toFixed(2);

    currentTime.setDate(currentTime.getDate() + days);
    updateDisplay();

    const randomShift = () => (Math.random() - 0.5) * 0.02; // Small random shift in location
    const newLocation = {
        lat: marker.getPosition().lat() + randomShift(),
        lng: marker.getPosition().lng() + randomShift()
    };
    updateLocationDisplay(newLocation);
}

function travelDays() {
    const days = parseInt(document.getElementById('days').value);
    if (!isNaN(days)) {
        simulateTimeTravel(days);
    } else {
        alert("Please enter a valid number of days.");
    }
}

function travelWeeks() {
    const weeks = parseInt(document.getElementById('weeks').value);
    if (!isNaN(weeks)) {
        simulateTimeTravel(weeks * 7);
    } else {
        alert("Please enter a valid number of weeks.");
    }
}

function travelMonths() {
    const months = parseInt(document.getElementById('months').value);
    if (!isNaN(months)) {
        simulateTimeTravel(months * 30);
    } else {
        alert("Please enter a valid number of months.");
    }
}

function travelYears() {
    const years = parseInt(document.getElementById('years').value);
    if (!isNaN(years)) {
        simulateTimeTravel(years * 365);
    } else {
        alert("Please enter a valid number of years.");
    }
}

function travelToSpecificDate() {
    const dateStr = document.getElementById('specific-date').value;
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
        currentTime = date;
        updateDisplay();
    } else {
        alert("Please enter a valid date in YYYY-MM-DD format.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateDisplay();
    initMap();
});
