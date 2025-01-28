document.getElementById('calculator-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const distance = parseFloat(document.getElementById('distance').value);
    const time = document.getElementById('time').value;

    const timeParts = time.split(':');
    if (timeParts.length !== 3) {
        alert('Please enter time in hh:mm:ss format.');
        return;
    }

    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const totalMinutes = totalSeconds / 60;

    const pacePerKm = totalSeconds / distance; // Pace per km in seconds
    const pacePerMile = totalSeconds / (distance * 0.621371); // Pace per mile in seconds

    const formatPace = (pace) => {
        const min = Math.floor(pace / 60);
        const sec = Math.round(pace % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    // Update results
    document.getElementById('pace-km').textContent = `Pace per km: ${formatPace(pacePerKm)}`;
    document.getElementById('pace-mile').textContent = `Pace per mile: ${formatPace(pacePerMile)}`;
    document.getElementById('pace-min').textContent = `Total time in minutes: ${totalMinutes.toFixed(2)}`;
});