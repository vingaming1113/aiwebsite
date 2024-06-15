// Global variables
let currentTime = new Date();
let travelSpeed = 1; // Speed factor, could be adjusted for more dynamic simulations
let map, marker;
let isMachineBroken = false;

// Initialize the Leaflet map
function initMap() {
    map = L.map('map').setView([0, 0], 3); // Increased initial zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Initialize marker with a default location (0, 0)
    marker = L.marker([0, 0]).addTo(map);

    // Attempt to get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = [latitude, longitude];
            map.setView(userLocation, 13);
            marker.setLatLng(userLocation);
            updateLocationDisplay(userLocation);
        }, () => {
            // Handle geolocation error
            alert('Error: The Geolocation service failed.');
        });
    } else {
        // Browser doesn't support Geolocation
        alert('Error: Your browser does not support geolocation.');
    }
}

// Update display elements with current time and speed
function updateDisplay() {
    document.getElementById('current-time').innerText = `Current simulated date and time: ${currentTime.toISOString().slice(0, 19).replace('T', ' ')}`;
    document.getElementById('travel-speed').innerText = `Current travel speed: ${travelSpeed}x`;
    addAnimation();
    updateSpeedometer();
}

// Update current location display
function updateLocationDisplay(location) {
    document.getElementById('current-location').innerText = `Current location: Lat ${location[0].toFixed(2)}, Lng ${location[1].toFixed(2)}`;
    marker.setLatLng(location);
}

// Add flash animation to current time display
function addAnimation() {
    const timeDisplay = document.getElementById('current-time');
    timeDisplay.classList.remove('flash');
    setTimeout(() => timeDisplay.classList.add('flash'), 10);
}

// Simulate time travel based on days
function simulateTimeTravel(days) {
    if (isMachineBroken) {
        alert("The time machine is broken! Please reset it.");
        return;
    }

    if (Math.random() < 0.02) { // Lowered chance of machine breaking (2%)
        alert("The time machine has broken!");
        isMachineBroken = true;
        return;
    }

    if (Math.random() < 0.05) { // Lowered chance of time travel failure (5%)
        alert("Time travel failed!");
        return;
    }

    const selectedSpeed = document.getElementById('speed').value;
    travelSpeed = parseFloat(selectedSpeed);

    warpAnimation(); // Trigger warp animation

    setTimeout(() => {
        currentTime.setDate(currentTime.getDate() + days);
        updateDisplay();

        const randomShift = () => (Math.random() - 0.5) * 0.02; // Small random shift in location
        const newLocation = [
            marker.getLatLng().lat + randomShift(),
            marker.getLatLng().lng + randomShift()
        ];
        updateLocationDisplay(newLocation);
    }, 2000); // Delay to simulate time warp effect
}

// Travel functions based on user input (days, weeks, months, years, specific date)
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

function travelToDestination() {
    const lat = parseFloat(document.getElementById('destination-lat').value);
    const lng = parseFloat(document.getElementById('destination-lng').value);
    
    if (isNaN(lat) || isNaN(lng)) {
        alert("Please enter valid latitude and longitude.");
        return;
    }

    if (isMachineBroken) {
        alert("The time machine is broken! Please reset it.");
        return;
    }

    if (Math.random() < 0.02) { // Lowered chance of machine breaking (2%)
        alert("The time machine has broken!");
        isMachineBroken = true;
        return;
    }

    if (Math.random() < 0.05) { // Lowered chance of time travel failure (5%)
        alert("Time travel failed!");
        return;
    }

    const selectedSpeed = document.getElementById('speed').value;
    travelSpeed = parseFloat(selectedSpeed);

    warpAnimation(); // Trigger warp animation

    setTimeout(() => {
        const newLocation = [lat, lng];
        map.setView(newLocation, 13);
        marker.setLatLng(newLocation);
        updateLocationDisplay(newLocation);

        currentTime = new Date(); // Reset time to current time after arrival
        updateDisplay();
    }, 2000); // Delay to simulate time warp effect
}

// Reset the time machine
function resetMachine() {
    isMachineBroken = false;
    alert("The time machine has been reset.");
}

// Warp animation effect
function warpAnimation() {
    const container = document.getElementById('container');
    container.classList.add('warp-animation');
    setTimeout(() => {
        container.classList.remove('warp-animation');
    }, 2000); // Same delay as simulateTimeTravel
}

// Initialize the application when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    updateDisplay();
    initMap();
});

// Update the speedometer display based on current speed
function updateSpeedometer() {
    const needle = document.getElementById('speedometer-needle');
    const valueDisplay = document.getElementById('speedometer-value');
    
    // Calculate rotation angle based on current speed
    const rotation = (travelSpeed - 1) * 60; // 1x speed is at 0 degrees, 2x speed is at 60 degrees, etc.
    needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

    // Display current speed value
    valueDisplay.textContent = `${travelSpeed.toFixed(2)}x`;
}
