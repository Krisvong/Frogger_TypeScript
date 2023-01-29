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
        ctx3.fillStyle = 'rgba(150, 150, 150,' + this.opacity + ')';
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx3.fill();
        ctx3.closePath();
    }
    update(){
        //run every frame to move particles along x and y axis based on values in directionX and directionY values.
        this.x += this.directionX;
        this.y += this.directionY;
        // decrease opacity by 0.9 each time the method is called, as long as the opacity is greater than 0.1.
        if (this.opacity > 0.1){
            this.opacity -= 0.9;
        }
        //shrink the particle over time by decreasing radius by 0.14 if radius is greater than 0.15
        if (this.radius > 0.15){
            this.radius -= 0.14;
        }
    }
    drawRipple(){
        //draw outline of shape
        ctx1.strokeStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx1.stroke();
        ctx1.closePath();
    }
    //cause the ripple to appear to expand and fade out over time.
    ripple(){
        if (this.radius < 50){
            this.radius += 0.7;
            this.x -= 0.03;
            this.y -= 0.03;
        }
        if (this.opacity > 0){
            this.opacity -= 0.002;
        }
    }
}
//dust particles
function handleParticles(){
    //iterate through the particles array, call update and draw methods on each particle. 
    for (let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
            particlesArray[i].draw();
    }        
    //if there are more than 300 particles, remove 30 particles using pop method
    if (particlesArray.length > maxParticles){
        for (let i = 0; i < 30; i++){
            particlesArray.pop();
        }
    }
    // Check if any of the arrow keys are being pressed and if frogger is on the road. If both true, add ten new particles to the beginning of the particle array using the unshfit method.
    if (((keys[37] || keys[38] || keys[39] || keys[40])) && frogger.y > 250 && particlesArray.length < maxParticles + 10){
        for (let i = 0; i < 10; i++){
            particlesArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
}
//water ripples
function handleRipples(){
    for (let i = 0; i < ripplesArray.length; i++){
        ripplesArray[i].ripple();
        ripplesArray[i].drawRipple();
    }
    if (ripplesArray.length > 20){
        for (let i = 0; i < 5; i++){
            ripplesArray.pop()
        }
    }
//If arrow keys are pressed and frogger is over river, add twenty new ripples to the array.
    if (((keys[37] || keys[38] || keys[39] || keys[40])) && frogger.y < 250 && frogger.y > 100){
         for (let i = 0; i < 20; i++){
            ripplesArray.unshift(new Particle(frogger.x, frogger.y));
       }
    }
}
    
