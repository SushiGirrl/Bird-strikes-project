const canvas = document.querySelector("canvas");
const ctx= canvas.getContext("2d");

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
    ctx.beginPath();
    ctx.arc(airplane.x + 100, airplane.y + 15, 24, 0, Math.PI * 2);
    ctx.fillStyle = '#7C9498FF'; // Red color
    ctx.fill();

    // Left motor
    ctx.beginPath();
    ctx.arc(airplane.x + 55, airplane.y + 35, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#7C9498FF'; // Red color
    ctx.fill();

    // Right motor
    ctx.beginPath();
    ctx.arc(airplane.x + 145, airplane.y + 35, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#7C9498FF'; // Red color
    ctx.fill();

    // Wings
    ctx.fillStyle = '#7C9498FF'; // Yellow color
    ctx.fillRect(airplane.x, airplane.y + 20, 200, 7);

    // Right wing-tip
    ctx.beginPath();
    ctx.moveTo(airplane.x + 200, airplane.y + 20);
    ctx.lineTo(airplane.x + 250, airplane.y + 20);
    ctx.lineTo(airplane.x + 200, airplane.y + 27);
    ctx.fillStyle = '#7C9498FF'; // Green color
    ctx.fill();

    // Left wing-tip
    ctx.beginPath();
    ctx.moveTo(airplane.x - 50, airplane.y + 20);
    ctx.lineTo(airplane.x, airplane.y + 20);
    ctx.lineTo(airplane.x, airplane.y + 27);
    ctx.fillStyle = "#7C9498FF"; // Green color
    ctx.fill();

    // tail middle
    ctx.beginPath();
    ctx.moveTo(airplane.x + 100, airplane.y - 40);
    ctx.lineTo(airplane.x + 103, airplane.y - 9);
    ctx.lineTo(airplane.x + 97, airplane.y - 9);
    ctx.fillStyle = "#7C9498FF"; // Green color
    ctx.fill();

    // tail right
    ctx.beginPath();
    ctx.moveTo(airplane.x + 150, airplane.y + 3);
    ctx.lineTo(airplane.x + 100, airplane.y + 8);
    ctx.lineTo(airplane.x + 100, airplane.y + 15);
    ctx.fillStyle = "#7C9498FF"; // Green color
    ctx.fill();

    // tail left
    ctx.beginPath();
    ctx.moveTo(airplane.x + 50, airplane.y + 3);
    ctx.lineTo(airplane.x + 100, airplane.y + 8);
    ctx.lineTo(airplane.x + 100, airplane.y + 15);
    ctx.fillStyle = "#7C9498FF"; // Green color
    ctx.fill();
}
drawAirplane();