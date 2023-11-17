console.log(data)

// Josef har skrevet denne del
const ctx = document.querySelector("#bar-test")
const yLabels = getYLabels(data)
const bgColorArray = [];

//data.forEach((obj)=>obj.Airport = obj.Airport.split(/[\s?=/]+/))

function getYLabels(d){
    return d.map((row)=>row.Airport.split(/[\s?=/]+/))
}

data.forEach((obj,index)=> {
    obj.Airport === "UNKNOWN" ? bgColorArray[index]="grey" : bgColorArray[index]="#8C0383"
})


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
    chart.data.labels = getYLabels(newData)
    chart.data.datasets[0].data = newData.map(row=>row.totalPerYear);

    const chartHeightPx = 160*newData.length;
    chart.canvas.parentNode.style.height = `${chartHeightPx}px`;

    chart.update();
}

// Attach event listeners
window.addEventListener("load", ()=>{clearSearch()})
document.getElementById('searchInput').addEventListener('input', ()=>search(data));
document.getElementById('searchButton').addEventListener('click', ()=>updateData(myChart));
document.getElementById('clearButton').addEventListener('click', ()=>{clearSearch();updateData(myChart)});
