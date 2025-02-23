const timerElement = document.getElementById('timer');
let startTime;
let timerInterval;
let saveButton; // Store reference to the save button
let timerContainer = document.getElementById('timerContainer');
let timerStopped = false; // Flag to track if the timer has been stopped

const updateTimer = () => {
    let elapsedTime = Date.now() - startTime;
    let hours = Math.floor(elapsedTime / 3600000);
    let minutes = Math.floor((elapsedTime % 3600000) / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    timerElement.innerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const startTimer = () => {
    startTime = Date.now(); // Initialize start time
    timerInterval = setInterval(updateTimer, 1000); // Start the interval to update the timer every second
    timerStopped = false; // Reset the flag when the timer starts
};

const stopTimer = () => {
    if (timerStopped) return; // Check if the timer has already been stopped

    clearInterval(timerInterval);
    const elapsedTime = timerElement.innerText;
    const currentTrack = JSON.parse(localStorage.getItem('currentTrack'));

    let runs = JSON.parse(localStorage.getItem('runs')) || [];
    runs.push({ track: currentTrack, time: elapsedTime });
    localStorage.setItem('runs', JSON.stringify(runs));

    // Remove any existing save button before adding a new one
    if (saveButton) {
        saveButton.remove();
    }

    saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.onclick = () => {
        window.location.href = 'track.html';
    };

    if (timerContainer) { // Ensure timerContainer exists before appending
        timerContainer.appendChild(saveButton);
    }

    timerStopped = true; // Set the flag to indicate the timer has been stopped
    console.log('Timer stopped');
};

// Start the timer when the page loads
startTimer();