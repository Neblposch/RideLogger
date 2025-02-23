document.addEventListener('DOMContentLoaded', () => {
    const track = JSON.parse(localStorage.getItem('currentTrack'));
    const previousRunsContainer = document.getElementById('previousRunsContainer');

    // Clear previous runs container
    previousRunsContainer.innerHTML = '';

    // Display previous runs
    let previousRuns = JSON.parse(localStorage.getItem('runs')) || [];
    previousRuns.forEach(run => {
        if (run.track.name === track.name) {
            let runButton = document.createElement('button');
            runButton.className = 'run-button';
            runButton.innerText = `Run: ${run.time}`;
            runButton.addEventListener('click', () => {
                // Add your desired functionality here
                alert(`Run time: ${run.time}`);
            });
            previousRunsContainer.appendChild(runButton);
        }
    });
});

function goBack() {
    window.location.href = '../index.html';
}

function startTimer() {
    window.location.href = './Timer/timer.html';
}