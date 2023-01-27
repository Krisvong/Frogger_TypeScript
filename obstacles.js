//create class to create instances of obstacles (cars, logs, and turtles) and update their properties (position and speed)
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
        this.carType = (Math.floor(Math.random() * numberOfCars));
    }
//draw obstacle    
    draw(){
        ctx1.fillStyle = 'blue';
        ctx1.fillRect(this.x, this.y, this.width, this.height);
       } 
//update the position of the obstacle on the canvas. Increase x-coordinate by its speed multiplied by game speed    

    update(){
//update position of cars so they reappears on the left and right sides of the canvas
        this.x += this.speed * gameSpeed;
        if(this.speed > 0){
           if (this.x > canvas.width + this.width){
               this.x = 0 - this.width;
           }
        } else {
        if (this.x < 0 - this.width){
            this.x = canvas.width + this.width;
          }
         }
       }   
    }
//inititialize obstacles: position horizontally along x-axis, create new instance of Obstacle class, position obstacles and push new instance into Array. 
function initObstacles(){
    //lane 1 to the right
    for(let i = 0; i < 2; i++){
        let x = i * 350;
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, 'car')
        );
    }
    //lane 2 to the left
    for (let i = 0; i < 2; i++){
        let x = i * 300;
        carsArray.push(new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, 'car')
        );
    }
    //lane 3 to the right
    for (let i = 0; i < 2; i++){
        let x = i * 400;
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, 'car')
        );
    }
    //logs and turtles
    //lane 4 (logs) to the left
    for (let i = 0; i < 2; i++){
        let x = i * 400;
        logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log')
        );
    }
    //lane 5 (turtles) to the right
    for (let i = 0; i < 3; i++){
        let x = i * 200;
        logsArray.push(new Obstacle(x, canvas.height - grid * 6 - 20, grid , grid, 1, 'turtle') )
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
}

