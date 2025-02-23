let container = document.getElementById('container');

if(localStorage.getItem('AlreadyLoggedIn') === 'true'){
    showStandardPage();

} else {
    container.innerHTML = `  <form id="userDataForm">
    <label for="userName">Name:</label>
    <input type="text" id="userName" name="userName" required>
    <label for="userAge">Age:</label>
    <input type="number" id="userAge" name="userAge" required>
    <button type="submit" onclick="saveData()">Ready to Race</button>
  </form>`
    const userName = document.getElementById('userName').value;
    const userAge = document.getElementById('userAge').value;



}

function saveData(){
    const userName = document.getElementById('userName').value;
    const userAge = document.getElementById('userAge').value;

    localStorage.setItem('userName', userName);
    localStorage.setItem('userAge', userAge);

    localStorage.setItem('AlreadyLoggedIn', true)
}

function showStandardPage() {
    let container = document.getElementById('container');
    container.innerHTML = `
        <button id="addTrackButton" class="track-button">+</button>
        <div id="tracksContainer"></div>
    `;

    document.getElementById('addTrackButton').addEventListener('click', showAddTrackForm);

    let tracksContainer = document.getElementById('tracksContainer');
    let tracks = JSON.parse(localStorage.getItem('tracks')) || [];
    tracks.forEach(track => {
        let trackButton = document.createElement('button');
        trackButton.className = 'track-button';
        trackButton.innerText = `${track.name} - ${track.distance} km - ${track.type}`;
        trackButton.addEventListener('click', () => {
            navigateToTrackPage(track);
        });
        tracksContainer.appendChild(trackButton);
    });
}

function navigateToTrackPage(track) {
    localStorage.setItem('currentTrack', JSON.stringify(track));
    window.location.href = './track/track.html';
}

function showAddTrackForm() {
    let container = document.getElementById('container');
    container.innerHTML = `
        <form id="trackForm" class="wide-form">
            <label for="trackName">Track Name:</label>
            <input type="text" id="trackName" name="trackName" required>
            <label for="trackDistance">Distance (km):</label>
            <input type="text" id="trackDistance" name="trackDistance" pattern="\\d+(\\.\\d{1,2})?" required>
            <label for="trackType">Track Type:</label>
            <select id="trackType" name="trackType" required>
                <option value="circuit">Circuit</option>
                <option value="uphill">Uphill</option>
                <option value="downhill">Downhill</option>
            </select>
            <button type="submit" class="save-button">Save</button>
        </form>
    `;

    document.getElementById('trackForm').addEventListener('submit', saveTrack);
}


function saveTrack(event) {
    event.preventDefault();
    const trackName = document.getElementById('trackName').value;
    const trackDistance = document.getElementById('trackDistance').value;
    const trackType = document.getElementById('trackType').value;

    const track = { name: trackName, distance: trackDistance, type: trackType };
    let tracks = JSON.parse(localStorage.getItem('tracks')) || [];
    tracks.push(track);
    localStorage.setItem('tracks', JSON.stringify(tracks));

    showStandardPage();
}

