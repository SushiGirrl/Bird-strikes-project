console.log(data)

// Josef har skrevet denne del
const ctx = document.querySelector("#bar-test")
const yLabels = data.map((row)=>row.Airport)
const bgColorArray = [];

data.forEach((obj,index)=> {
    obj.Airport[0] === "UNKNOWN" ? bgColorArray[index]="grey" : bgColorArray[index]="#8C0383"
})

const listOfAirports = data.map((row)=>row.Airport)

// Josef har skrevet denne del
/*
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

 */
/*
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
}*/


/*
function search(airports) {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    let matchingAirports;

    if (searchTerm.length === 1) {
        matchingAirports = airports.filter(airport =>
            airport.toLowerCase().startsWith(searchTerm)
        );
    } else {
        matchingAirports = airports.filter(airport =>
            airport.toLowerCase().includes(searchTerm)
        );
    }


   // displayResults(matchingAirports);
    console.log(matchingAirports)
}*/
function search(airports) {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    let matchingAirports;

    if (searchTerm.length === 1) {
        matchingAirports = airports.filter(obj =>
            obj.Airport.toLowerCase().startsWith(searchTerm)
        );
    } else {
        matchingAirports = airports.filter(obj =>
            obj.Airport.toLowerCase().includes(searchTerm)
        );
    }


    // displayResults(matchingAirports);
        console.log(matchingAirports)
    return matchingAirports
}


function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';


}





const myChart = new Chart(ctx,
    {
        type:'bar',
        data:{
            labels:yLabels,
            datasets:[
                {
                    label:'Total cost per Airport per year',
                    data: data.map(row=>row.totalPerYear),
                    backgroundColor: bgColorArray,
                }
            ]
        },
        options:{
            animation: false,
            maintainAspectRatio: false,
            indexAxis:"y",
            plugins:{
                title:{
                    display:true,
                    text:"The Cost",
                    font:{
                        size:22,
                        weight: "bold",
                    }
                }
            },
            scales:{
                y:{

                },
                x:{

                },
            },
        }
});

function updateData(chart){
    let newData = search(data)
    chart.data.labels = newData.map(row=>row.Airport);
    chart.data.datasets[0].data = newData.map(row=>row.totalPerYear);
    chart.canvas.parentNode.style.height = '500px';

    chart.update();
}

let airports = []; // Define the variable for airports

/*
getData().then(data => {
    airports = data;
}).catch(error => {
    console.error('Error fetching data:', error);
});*/

// Attach event listeners
document.getElementById('searchInput').addEventListener('input', ()=>search(data));
document.getElementById('searchButton').addEventListener('click', ()=>updateData(myChart));
document.getElementById('clearButton').addEventListener('click', ()=>{clearSearch();updateData(myChart)});
