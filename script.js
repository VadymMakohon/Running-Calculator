document.getElementById('calculator-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    let distance = parseFloat(document.getElementById('distance').value);
    const timeInput = document.getElementById('time').value;
    const isMiles = document.getElementById('unit-toggle').checked;

    if (!distance || !timeInput || !weight) {
        alert("Please fill in all fields correctly.");
        return;
    }

    if (isMiles) {
        distance *= 1.60934;
    }

    const caloriesBurned = (weight * distance * 1.036).toFixed(2);
    document.getElementById('calories').textContent = `Calories Burned: ${caloriesBurned} kcal`;

    const timeParts = timeInput.split(":").map(Number);
    const hours = timeParts[0] || 0;
    const minutes = timeParts[1] || 0;
    const seconds = timeParts[2] || 0;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const totalMinutes = totalSeconds / 60;

    const pacePerKm = totalSeconds / distance; // Pace per km in seconds
    const pacePerMile = totalSeconds / (distance * 0.621371); // Pace per mile in seconds

    const formatPace = (pace) => {
        const min = Math.floor(pace / 60);
        const sec = Math.round(pace % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    document.getElementById('pace-km').textContent = `Pace per km: ${formatPace(pacePerKm)}`;
    document.getElementById('pace-mile').textContent = `Pace per mile: ${formatPace(pacePerMile)}`;
    document.getElementById('pace-min').textContent = `Total time in minutes: ${totalMinutes.toFixed(2)}`;

    saveHistory(distance, timeInput, formatPace(pacePerKm), formatPace(pacePerMile), caloriesBurned);
});

function saveHistory(distance, time, pacePerKm, pacePerMile, calories) {
    let history = JSON.parse(localStorage.getItem('runningHistory')) || [];

    history.push({
        distance,
        time,
        pacePerKm,
        pacePerMile,
        calories,
        date: new Date().toLocaleString()
    });

    localStorage.setItem('runningHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    let history = JSON.parse(localStorage.getItem('runningHistory')) || [];

    history.forEach(entry => {
        let li = document.createElement('li');
        li.textContent = `${entry.date}: ${entry.distance} km - Pace: ${entry.pacePerKm} min/km - ${entry.calories} kcal`;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem('runningHistory');
    displayHistory();
}

document.getElementById('unit-toggle').addEventListener('change', function () {
    let isMiles = this.checked;
    let distanceInput = document.getElementById('distance');

    if (isMiles) {
        distanceInput.placeholder = "Enter distance in miles";
    } else {
        distanceInput.placeholder = "Enter distance in kilometers";
    }
});

const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    let isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

window.onload = function () {
    if (localStorage.getItem('darkMode') === "true") {
        document.body.classList.add('dark-mode');
    }
    displayHistory(); // Load history on page load
};