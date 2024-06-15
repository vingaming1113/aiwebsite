let currentTime = new Date();
let travelSpeed = 1; // Speed factor, could be adjusted for more dynamic simulations
let map, marker;
let isMachineBroken = false;

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

function updateDisplay() {
    document.getElementById('current-time').innerText = `Current simulated date and time: ${currentTime.toISOString().slice(0, 19).replace('T', ' ')}`;
    document.getElementById('travel-speed').innerText = `Current travel speed: ${travelSpeed}x`;
    addAnimation();
}

function updateLocationDisplay(location) {
    document.getElementById('current-location').innerText = `Current location: Lat ${location[0].toFixed(2)}, Lng ${location[1].toFixed(2)}`;
    marker.setLatLng(location);
}

function addAnimation() {
    const timeDisplay = document.getElementById('current-time');
    timeDisplay.classList.remove('flash');
    setTimeout(() => timeDisplay.classList.add('flash'), 10);
}

function simulateTimeTravel(days) {
    if (isMachineBroken) {
        alert("The time machine is broken! Please reset it.");
        return;
    }

    const speedFactor = parseFloat(document.getElementById('speed').value);
    travelSpeed = speedFactor.toFixed(2);

    if (Math.random() < (0.01 * speedFactor)) { // Increased chance of machine breaking with speed
        alert("The time machine has broken!");
        isMachineBroken = true;
        return;
    }

    if (Math.random() < 0.05) { // Lowered chance of time travel failure (5%)
        alert("Time travel failed!");
        return;
    }

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

    const speedFactor = parseFloat(document.getElementById('speed').value);
    travelSpeed = speedFactor.toFixed(2);

    if (Math.random() < (0.01 * speedFactor)) { // Increased chance of machine breaking with speed
        alert("The time machine has broken!");
        isMachineBroken = true;
        return;
    }

    if (Math.random() < 0.05) { // Lowered chance of time travel failure (5%)
        alert("Time travel failed!");
        return;
    }

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

function travelToRandomDate() {
    const randomDays = Math.floor(Math.random() * 10000) - 5000; // Randomly choose a day within ±5000 days
    simulateTimeTravel(randomDays);
}

function travelToPastEvent() {
    const pastEvents = [
        new Date('1969-07-20T20:17:00Z'), // Moon landing
        new Date('1776-07-04T00:00:00Z'), // American Independence
        new Date('1989-11-09T00:00:00Z') // Fall of the Berlin Wall
    ];
    const event = pastEvents[Math.floor(Math.random() * pastEvents.length)];
    currentTime = event;
    updateDisplay();
}

function travelToFutureEvent() {
    const futureEvents = [
        new Date('2030-01-01T00:00:00Z'), // Example future date
        new Date('2050-12-31T23:59:59Z'), // Example future date
        new Date('2100-01-01T00:00:00Z') // Example future date
    ];
    const event = futureEvents[Math.floor(Math.random() * futureEvents.length)];
    currentTime = event;
    updateDisplay();
}

function resetMachine() {
    isMachineBroken = false;
    alert("The time machine has been reset.");
}

function warpAnimation() {
    const container = document.getElementById('container');
    container.classList.add('warp-animation');
    setTimeout(() => {
        container.classList.remove('warp-animation');
    }, 2000); // Same delay as simulateTimeTravel
}

document.addEventListener("DOMContentLoaded", () => {
    updateDisplay();
    initMap();

    const speedSlider = document.getElementById('speed');
    const speedValue = document.getElementById('speed-value');
    speedSlider.addEventListener('input', (event) => {
        speedValue.textContent = `${event.target.value}x`;
    });
});
