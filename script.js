let currentTime = new Date();
updateDisplay();

function updateDisplay() {
    document.getElementById('current-time').innerText = `Current simulated date and time: ${currentTime.toISOString().slice(0, 19).replace('T', ' ')}`;
    addAnimation();
}

function addAnimation() {
    const timeDisplay = document.getElementById('current-time');
    timeDisplay.classList.remove('flash');
    setTimeout(() => timeDisplay.classList.add('flash'), 10);
}

function travelDays() {
    const days = parseInt(document.getElementById('days').value);
    if (!isNaN(days)) {
        currentTime.setDate(currentTime.getDate() + days);
        updateDisplay();
    } else {
        alert("Please enter a valid number of days.");
    }
}

function travelWeeks() {
    const weeks = parseInt(document.getElementById('weeks').value);
    if (!isNaN(weeks)) {
        currentTime.setDate(currentTime.getDate() + (weeks * 7));
        updateDisplay();
    } else {
        alert("Please enter a valid number of weeks.");
    }
}

function travelMonths() {
    const months = parseInt(document.getElementById('months').value);
    if (!isNaN(months)) {
        currentTime.setMonth(currentTime.getMonth() + months);
        updateDisplay();
    } else {
        alert("Please enter a valid number of months.");
    }
}

function travelYears() {
    const years = parseInt(document.getElementById('years').value);
    if (!isNaN(years)) {
        currentTime.setFullYear(currentTime.getFullYear() + years);
        updateDisplay();
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
