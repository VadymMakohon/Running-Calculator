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