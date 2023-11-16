async function getData() {
    try {
        const response = await fetch('data.json');
        const textData = await response.text();
        return JSON.parse(textData);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function displayResults(matchingAirports) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (matchingAirports.length === 0) {
        resultsContainer.innerHTML = 'No results found. Sorry!';
    } else {
        matchingAirports.forEach(airport => {
            const airportElement = document.createElement('div');
            airportElement.textContent = airport.Airport;
            resultsContainer.appendChild(airportElement);
        });
    }
}

function search() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    let matchingAirports;

    if (searchTerm.length === 1) {
        matchingAirports = airports.filter(airport =>
            airport.Airport.toLowerCase().startsWith(searchTerm)
        );
    } else {
        matchingAirports = airports.filter(airport =>
            airport.Airport.toLowerCase().includes(searchTerm)
        );
    }

    displayResults(matchingAirports);
}


function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}

let airports = []; // Define the variable for airports

getData().then(data => {
    airports = data;
}).catch(error => {
    console.error('Error fetching data:', error);
});

// Attach event listeners
document.getElementById('searchInput').addEventListener('input', search);
document.getElementById('searchButton').addEventListener('click', search);
document.getElementById('clearButton').addEventListener('click', clearSearch);
