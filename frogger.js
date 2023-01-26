// create and handle player character
//create the frog object, set it's starting position and size , and also the sprite sheet's parameters
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
        this.frameX = 0;
        this.frameY = 0;
    }
    update(){
        console.log('update');
        }
      
    draw(){
        ctx3.fillStyle = 'green';
        ctx3.fillRect(this.x, this.y, this.width, this.height);
    }
    jump(){
        console.log('jump')
    }
    }

const frogger = new Frogger();


