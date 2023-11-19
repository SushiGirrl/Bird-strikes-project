console.log(data)

// Josef har skrevet denne del
const barContext = document.querySelector("#bar-test")
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



const myChart = new Chart(barContext,
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
document.getElementById('searchInput').addEventListener('input', ()=>search(data));
document.getElementById('searchButton').addEventListener('click', ()=>updateData(myChart));
document.getElementById('clearButton').addEventListener('click', ()=>{clearSearch();updateData(myChart)});

//This part of the code is the plane visualisation
const canvas = document.querySelector(".plane-canvas");
const planeContext = canvas.getContext("2d");
const launch = document.querySelector(".missiles");
const birdPrice = 2644;
const dotColor = `#D61F22`;

let dotCount = 0;

console.log(dotCount);

//Lykke
// Defining airplane shape
const airplane = {
    x: 50,
    y: 50,
    width: 200,
    height: 100
};
//Lykke (drawAirplane())
// Draws airplane
function drawAirplane() {
    // Cockpit
    planeContext.beginPath();
    planeContext.arc(airplane.x + 100, airplane.y + 15, 24, 0, Math.PI * 2);
    planeContext.fillStyle = '#ACABB0'; // Red color
    planeContext.fill();

    // Left motor
    planeContext.beginPath();
    planeContext.arc(airplane.x + 55, airplane.y + 35, 10, 0, Math.PI * 2);
    planeContext.fillStyle = '#ACABB0'; // Red color
    planeContext.fill();

    // Right motor
    planeContext.beginPath();
    planeContext.arc(airplane.x + 145, airplane.y + 35, 10, 0, Math.PI * 2);
    planeContext.fillStyle = '#ACABB0'; // Red color
    planeContext.fill();

    // Wings
    planeContext.fillStyle = '#ACABB0'; // Yellow color
    planeContext.fillRect(airplane.x, airplane.y + 20, 200, 7);

    // Right wing-tip
    planeContext.beginPath();
    planeContext.moveTo(airplane.x + 200, airplane.y + 20);
    planeContext.lineTo(airplane.x + 250, airplane.y + 20);
    planeContext.lineTo(airplane.x + 200, airplane.y + 27);
    planeContext.fillStyle = '#ACABB0'; // Green color
    planeContext.fill();

    // Left wing-tip
    planeContext.beginPath();
    planeContext.moveTo(airplane.x - 50, airplane.y + 20);
    planeContext.lineTo(airplane.x, airplane.y + 20);
    planeContext.lineTo(airplane.x, airplane.y + 27);
    planeContext.fillStyle = "#ACABB0"; // Green color
    planeContext.fill();

    // tail middle
    planeContext.beginPath();
    planeContext.moveTo(airplane.x + 100, airplane.y - 40);
    planeContext.lineTo(airplane.x + 103, airplane.y - 9);
    planeContext.lineTo(airplane.x + 97, airplane.y - 9);
    planeContext.fillStyle = "#ACABB0"; // Green color
    planeContext.fill();

    // tail right
    planeContext.beginPath();
    planeContext.moveTo(airplane.x + 150, airplane.y + 3);
    planeContext.lineTo(airplane.x + 100, airplane.y + 8);
    planeContext.lineTo(airplane.x + 100, airplane.y + 15);
    planeContext.fillStyle = "#ACABB0"; // Green color
    planeContext.fill();

    // tail left
    planeContext.beginPath();
    planeContext.moveTo(airplane.x + 50, airplane.y + 3);
    planeContext.lineTo(airplane.x + 100, airplane.y + 8);
    planeContext.lineTo(airplane.x + 100, airplane.y + 15);
    planeContext.fillStyle = "#ACABB0"; // Green color
    planeContext.fill();
}

function drawDot(x, y, dotSize, dotColor) {
    planeContext.fillStyle = dotColor;
    planeContext.beginPath();
    planeContext.arc(x, y, dotSize, 0, Math.PI * 2);
    planeContext.fill();
    //Josef (dotCount)
    dotCount++;
    updateCostCounter(birdPrice * dotCount);
}

// Function to draw dots within the circular shape of the cockpit with a delay
function drawDotsInCockpitWithDelay() {
    const cockpitCenterX = airplane.x + 100;
    const cockpitCenterY = airplane.y + 15;
    const cockpitRadius = 24;

    let count = 0;

    function drawDotInCockpitWithDelay() {
        if (count < 4184) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * cockpitRadius;
            const dotX = cockpitCenterX + distance * Math.cos(angle);
            const dotY = cockpitCenterY + distance * Math.sin(angle);

            drawDot(dotX, dotY, 2, dotColor);
            count++;

            // Adjust the delay time (in milliseconds) based on your preference
            setTimeout(drawDotInCockpitWithDelay, 50);
        }
    }

    drawDotInCockpitWithDelay();
}

// Function to draw dots within the circular shape of the motor with a delay
function drawDotsInMotorWithDelay(centerX, centerY) {
    const motorRadius = 10;
    let count = 0;

    function drawDotInMotorWithDelay() {
        if (count < 1142) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * motorRadius;
            const dotX = centerX + distance * Math.cos(angle);
            const dotY = centerY + distance * Math.sin(angle);

            drawDot(dotX, dotY, 2, dotColor);
            count++;

            // Adjust the delay time (in milliseconds) based on your preference
            setTimeout(drawDotInMotorWithDelay, 50);
        }
    }

    drawDotInMotorWithDelay();
}

// Function to draw dots within the rectangular shape of the wings with a delay
function drawDotsInWingsWithDelay() {
    const wingWidth = 200;
    const wingHeight = 7;
    let count = 0;

    function drawDotInWingsWithDelay() {
        if (count < 1500) {
            const dotX = Math.random() * wingWidth + airplane.x;
            const dotY = Math.random() * wingHeight + airplane.y + 20;

            drawDot(dotX, dotY, 2, dotColor);
            count++;

            // Adjust the delay time (in milliseconds) based on your preference
            setTimeout(drawDotInWingsWithDelay, 50);
        }
    }

    drawDotInWingsWithDelay();
}

// Function to draw dots within the triangular shape with a delay
function drawDotsInTriangleWithDelay(x1, y1, x2, y2, x3, y3) {
    let count = 0;

    function drawDotWithDelay() {
        if (count < 80) {
            const u = Math.random();
            const v = Math.random();

            const w1 = 1 - Math.sqrt(u);
            const w2 = (1 - v) * Math.sqrt(u);
            const w3 = v * Math.sqrt(u);

            const dotX = w1 * x1 + w2 * x2 + w3 * x3;
            const dotY = w1 * y1 + w2 * y2 + w3 * y3;

            drawDot(dotX, dotY, 2, dotColor);
            count++;

            // Adjust the delay time (in milliseconds) based on your preference
            setTimeout(drawDotWithDelay, 50);
        }
    }

    drawDotWithDelay();
}

function birdAttack() {
    planeContext.clearRect(0, 0, canvas.width, canvas.height);
    drawAirplane();
    launch.disabled = true


    // Draw dots within the circular shape of the cockpit with a delay
    drawDotsInCockpitWithDelay();

    // Draw dots within the circular shape of the left motor with a delay
    drawDotsInMotorWithDelay(airplane.x + 55, airplane.y + 35);

    // Draw dots within the circular shape of the right motor with a delay
    drawDotsInMotorWithDelay(airplane.x + 145, airplane.y + 35);

    // Draw dots within the rectangular shape of the wings with a delay
    drawDotsInWingsWithDelay();

    // Draw dots within the triangular shape of the right wing-tip with a delay
    drawDotsInTriangleWithDelay(
        airplane.x + 200, airplane.y + 20,
        airplane.x + 250, airplane.y + 20,
        airplane.x + 200, airplane.y + 27
    );

    // Draw dots within the triangular shape of the left wing-tip with a delay
    drawDotsInTriangleWithDelay(
        airplane.x - 50, airplane.y + 20,
        airplane.x, airplane.y + 20,
        airplane.x, airplane.y + 27
    );

    // Draw dots within the triangular shape of the tail middle with a delay
    drawDotsInTriangleWithDelay(
        airplane.x + 100, airplane.y - 40,
        airplane.x + 103, airplane.y - 9,
        airplane.x + 97, airplane.y - 9
    );

    // Draw dots within the triangular shape of the tail right with a delay
    drawDotsInTriangleWithDelay(
        airplane.x + 150, airplane.y + 3,
        airplane.x + 100, airplane.y + 8,
        airplane.x + 100, airplane.y + 15
    );

    // Draw dots within the triangular shape of the tail left with a delay
    drawDotsInTriangleWithDelay(
        airplane.x + 50, airplane.y + 3,
        airplane.x + 100, airplane.y + 8,
        airplane.x + 100, airplane.y + 15
    );

    setTimeout(()=>{console.log(dotCount)},50*300)
}

// Josef
function updateCostCounter(num){
    // Tag nummeret, opdater et nummer i HTML
    // id=cost-counter

    const costCountSpan = document.querySelector("#cost-counter")
    costCountSpan.textContent = `${num} $`

}

window.addEventListener("load", ()=>{
    planeContext.clearRect(0, 0, canvas.width, canvas.height);
    drawAirplane();
    clearSearch();
})
launch.addEventListener("click", () =>{
    dotCount = 0;
    birdAttack();
})

console.log(dotCount);
