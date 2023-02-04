//create class to create instances of obstacles (cars, logs, and turtles) and update their properties (position and speed)
class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type; /*car, log, or turtle*/
        this.frameX = 0; /*animation*/ 
        this.frameY = 0; /*animation*/ 
        this.randomize = Math.floor(Math.random() * 30 + 30); /*random integer between 30 and 60 rounded down to nearest integer*/
        this.carType = (Math.floor(Math.random() * numberOfCars)); /*choose random car image*/
    }
    //draw obstacle    
    draw(){
        //draw and animate turtle: turtle sprite sheet is 140px X 280px. One frame = 70px X 70px.
        if (this.type === 'turtle'){
            if (frame % this.randomize === 0){
                if (this.frameX >= 1) this.frameX = 0;
                else this.frameX++;
        }
            ctx1.drawImage(turtle, this.frameX * 70, this.frameY * 70, 70, 70, this.x, this.y, this.width, this.height);
        //draw log
        }else if (this.type === 'log'){
            ctx1.drawImage(log, this.x, this.y, this.width, this.height);
       //draw car and use carType to randomize car from rows of car images
        } else {
            ctx2.drawImage(car, this.frameX * this.width, this.carType * this.height, grid * 2, grid, this.x, this.y, this.width, this.height);
       }
    } 

     //update position of cars so they reappear on the left and right sides of the canvas choosing a different car image each time it reappears.
    update(){
        this.x += this.speed * gameSpeed; /*change x coordinate of object and move it horizontally*/
        if(this.speed > 0){ //moving right
            //makes car reappear from the left of the canvas after it goes off canvas from the right. Changes type of car being drawn.
           if (this.x > canvas.width + this.width){
               this.x = 0 - this.width;
               this.carType = (Math.floor(Math.random() * numberOfCars));
           }
        } else { //moves left
           this.frameX = 1; /*if car is going left, set the frameX to 1*/
           //makes car reappear from the right of the canvas after it goes off canvas from the left. Changes type of car being drawn.
           if (this.x < 0 - this.width){
               this.x = canvas.width + this.width;
               this.cartype = (Math.floor(Math.random() * numberOfCars));
           }
         }
       }   
    }
//inititialize obstacles: position horizontally along x-axis, create new instance of Obstacle class, position obstacles and push new instance into Array. 
function initObstacles(){
    //lane 1 to the right
    for(let i = 0; i < 2; i++){
        let x = i * 350;
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, 'car'));
    }
    //lane 2 to the left
    for (let i = 0; i < 2; i++){
        let x = i * 300;
        carsArray.push(new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, 'car'));
    }
    //lane 3 to the right
    for (let i = 0; i < 2; i++){
        let x = i * 400;
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, 'car'));
    }
    //logs and turtles
    //lane 4 (logs) to the left
    for (let i = 0; i < 2; i++){
        let x = i * 400;
        logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log'));
    }
    //lane 5 (turtles) to the right
    for (let i = 0; i < 3; i++){
        let x = i * 200;
        logsArray.push(new Obstacle(x, canvas.height - grid * 6 - 20, grid , grid, 1, 'turtle'));
    }
}
initObstacles();

//iterate through cars array, for each element, modify the properties of the car object
function handleObstacles(){
    for (let i = 0; i < carsArray.length; i++){
        carsArray[i].update();
        carsArray[i].draw();
    }
    for (let i = 0; i < logsArray.length; i++){    
        logsArray[i].update();
        logsArray[i].draw();
    }
    //collision with car: check for collision with cars, if collision is true, draw second image from collisions sprite sheet and scale it down to frogger size. Reset game.
    for (let i = 0; i < carsArray.length; i++){
        if(collision(frogger, carsArray[i])){
            ctx4.drawImage(collisions, 0, 100, 100, 100, frogger.x, frogger.y, 50, 50);
            resultDisplay.textContent = 'Watch out for cars!';
            splatSound.play();
            resetGame();
        }
    }
    //collisions with logs/turtles:
    //check to see if frogger is in river area
    if (frogger.y < 250 && frogger.y > 100) {
        //frogger is only safe if colliding with log or turtle
        safe = false;
        //check for a collision between frogger and elements in logs array, if frogger collides with element from array, update x-coordinate of frogger by the speed of current object in the logs array.
        for (let i = 0; i < logsArray.length; i++) {
            if (collision(frogger, logsArray[i])){
                frogger.x += logsArray[i].speed;
                safe = true;
            }
        }
        //check if frogger is in a safe position. If not safe, create 30 new particle objects with the x and y position of frogger. 
        if (!safe){
            for (let i = 0; i < 30; i++){
                ripplesArray.unshift(new Particle(frogger.x, frogger.y));
                waterSound.play()
            }
            resultDisplay.textContent = 'This frog cannot swim!';
            resetGame();
        }
    }
}

