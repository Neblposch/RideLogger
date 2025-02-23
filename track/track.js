document.addEventListener('DOMContentLoaded', () => {
    const track = JSON.parse(localStorage.getItem('currentTrack'));
    const previousRunsContainer = document.getElementById('previousRunsContainer');

    // Clear previous runs container
    previousRunsContainer.innerHTML = '';

    // Display previous runs
    let previousRuns = JSON.parse(localStorage.getItem('runs')) || [];
    previousRuns.forEach(run => {
        if (run.track.name === track.name) {
            let runElement = document.createElement('div');
            runElement.innerText = `Run: ${run.time}`;
            previousRunsContainer.appendChild(runElement);
        }
    });
});

function goBack() {
    window.location.href = '../index.html';
}

function startTimer() {
    window.location.href = './Timer/timer.html';
}