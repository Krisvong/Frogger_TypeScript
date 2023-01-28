//create dust trail on dry land
class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 20 + 1; //size of particle
        this.opacity = 1; //color fade
        this.directionX = Math.random() * 1 - 0.5; //particle spreads
        this.directionY = Math.random() * 1 - 0.5;
    }
    draw(){
        //draw circle particles under frogger
        ctx3.fillStyle = 'rgba(150, 150, 150, 1)';
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx3.fill();
        ctx3.closePath();
    }
    update(){
        //run every frame to move particles along x and y axis based on values in directionX and directionY values
        this.x += this.directionX;
        this.y += this.directionY;

    }
}

function handleParticles(){
//iterate through the particles array, call update and draw methods on each particle. 
    for (let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
            particlesArray[i].draw();
    }
 // Check if any of the arrow keys are being pressed and if frogger is on the road. If both true, add ten new particles to the beginning of the particle array using the unshfit method.
    if (((keys[37] || keys [38] || keys[39] || keys[40])) && frogger.y > 100 && particlesArray.length < 200){
        for (let i = 0; i < 10; i++){
            particlesArray.unshift(new Particle(frogger.x, frogger.y));
        }

    }
}
