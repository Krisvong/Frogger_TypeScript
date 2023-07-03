"use strict";
// Create a class to create instances of obstacles (cars, logs, and turtles) and update their properties (position and speed)
class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
        this.frameX = 0;
        this.frameY = 0;
        this.randomize = Math.floor(Math.random() * 30 + 30);
        this.carType = Math.floor(Math.random() * numberOfCars);
    }
    // Draw obstacle
    draw() {
        if (this.type === 'turtle') {
            if (frame % this.randomize === 0) {
                if (this.frameX >= 1)
                    this.frameX = 0;
                else
                    this.frameX++;
            }
            ctx1.drawImage(turtle, this.frameX * 70, this.frameY * 70, 70, 70, this.x, this.y, this.width, this.height);
        }
        else if (this.type === 'log') {
            ctx1.drawImage(log, this.x, this.y, this.width, this.height);
        }
        else {
            ctx2.drawImage(car, this.frameX * this.width, this.carType * this.height, grid * 2, grid, this.x, this.y, this.width, this.height);
        }
    }
    // Update position of obstacles
    update() {
        this.x += this.speed * gameSpeed;
        if (this.speed > 0) {
            if (this.x > canvas.width + this.width) {
                this.x = 0 - this.width;
                this.carType = Math.floor(Math.random() * numberOfCars);
            }
        }
        else {
            this.frameX = 1;
            if (this.x < 0 - this.width) {
                this.x = canvas.width + this.width;
                this.carType = Math.floor(Math.random() * numberOfCars);
            }
        }
    }
}
// Initialize obstacles
function initObstacles() {
    // Lane 1 to the right
    for (let i = 0; i < 2; i++) {
        const x = i * 350;
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, 'car'));
    }
    // Lane 2 to the left
    for (let i = 0; i < 2; i++) {
        const x = i * 300;
        carsArray.push(new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, 'car'));
    }
    // Lane 3 to the right
    for (let i = 0; i < 2; i++) {
        const x = i * 400;
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, 'car'));
    }
    // Logs and turtles
    // Lane 4 (logs) to the left
    for (let i = 0; i < 2; i++) {
        const x = i * 400;
        logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log'));
    }
    // Lane 5 (turtles) to the right
    for (let i = 0; i < 3; i++) {
        const x = i * 200;
        logsArray.push(new Obstacle(x, canvas.height - grid * 6 - 20, grid, grid, 1, 'turtle'));
    }
}
initObstacles();
// Handle obstacles
function handleObstacles() {
    for (let i = 0; i < carsArray.length; i++) {
        carsArray[i].update();
        carsArray[i].draw();
    }
    for (let i = 0; i < logsArray.length; i++) {
        logsArray[i].update();
        logsArray[i].draw();
    }
    // Collision with cars
    for (let i = 0; i < carsArray.length; i++) {
        if (collision(frogger, carsArray[i])) {
            ctx4.drawImage(collisions, 0, 100, 100, 100, frogger.x, frogger.y, 50, 50);
            resultDisplay.textContent = 'Watch out for cars!';
            splatSound.play();
            resetGame();
        }
    }
    // Collisions with logs/turtles
    if (frogger.y < 250 && frogger.y > 100) {
        safe = false;
        for (let i = 0; i < logsArray.length; i++) {
            if (collision(frogger, logsArray[i])) {
                frogger.x += logsArray[i].speed;
                safe = true;
            }
        }
        if (!safe) {
            for (let i = 0; i < 30; i++) {
                ripplesArray.unshift(new Particle(frogger.x, frogger.y));
                waterSound.play();
            }
            resultDisplay.textContent = 'This frog cannot swim!';
            resetGame();
        }
    }
}
