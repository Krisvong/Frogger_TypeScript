//create the frog object, set it's starting position and size and also the sprite sheet's parameters
class Frogger {
    constructor(){
        //width of one frame = sprite sheet is 500px wide with two columns
        this.spriteWidth = 250;
        //height of one frame = sprite sheet is 1000px high with four columns
        this.spriteHeight = 250;
        //make sprite 5 times smaller
        this.width = this.spriteWidth/5;
        this.height = this.spriteHeight/5;
        //where frog first appears at game load (bottom,center)
        this.x = canvas.width/2 - this.width/2;
        this.y = canvas.height - this.height - 40;
        //prevent frog from moving too fast across grid; one jump per key press
        this.moving = false;
        //control which frame of the sprite sheet is being used
        this.frameX = 0;
        this.frameY = 0;
    }

    update(){
        //if frogger not moving, when up arrow key is pressed, decrease y position (move up), change frameX to 1 and frame Y to 0 (first row)
        if (keys[38]) { //up
        if(this.moving === false){
            this.y -= grid;
            this.moving = true;
            this.frameX = 1;
            this.frameY = 0;
        }
    }
       //if frog is not moving, y position is less than canvas height minus twice it's own height, increase frogger's y position (move down) when down arrow key is pressed, change frame of sprite sheet to frame 3 (fourth row).
       if (keys[40]) { //down
            if(this.moving === false && /*prevent frogger from leaving screen*/ this.y < canvas.height - this.height * 2) {
                this.y += grid;
                this.moving = true;
                this.frameY = 3;
            }
        }
        //if frogger is not moving, x position is greater than width, decrease frogger's x position (move left) when left arrow key is pressed, change frame of sprite sheet to frame 2 (third row).
        if (keys[37]) { //left
            if(this.moving === false && this.x > this.width){
                this.x -= grid;
                this.moving = true;
                this.frameY = 2;
            }
        }
        //if frogger is not moving, x position is less than canvas width minus twice it's own width, increase frogger's x position (move right), change frame of sprite sheet to 1 (second row).
        if (keys[39]){ //right
            if (this.moving === false && this.x < canvas.width - this.width * 2) {
                this.x += grid;
                this.moving = true;
                this.frameY = 1;
            }
        }
        // if frogger reaches top of screen, call scored() to add point;
        if (this.y < 0) scored();
        }

    //draw frogger  
    draw(){
        ctx3.drawImage(froggerSprite, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 25, this.y - 25, this.width * 2, this.height * 2);
    }
    //change the frames of frogger depending on if jumping or not. If jumping, play the jump sound.
    jump(){
        if (this.moving === false) this.frameX = 1;
        else if (this.frameX === 1) this.frameX = 0;
        jumpSound.play();
    }
    }
//create instance of the Frogger class to control the object on the canvas
const frogger = new Frogger();


