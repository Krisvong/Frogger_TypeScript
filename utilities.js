//animation loops and event listeners

//clear multiple canvas elements starting at (0,0) ending at canvas width and height
function animate(){
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    ctx4.clearRect(0, 0, canvas.width, canvas.height);
    ctx5.clearRect(0, 0, canvas.width, canvas.height);
    
    handleRipples()
    ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
    handleParticles();
    frogger.draw();
    frogger.update();
    
    handleObstacles();
    handleScoreBoard();
    ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);    
 //recursion
    requestAnimationFrame(animate);
}
animate();

//event listeners
window.addEventListener('keydown', function(e){
    keys = [];
    // access the element of the keys array at the index of the keycode. if any of the arrow keys are pressed, call jump method.
    keys[e.keyCode] = true;
    if(keys[37] || keys[38] || keys[39] || keys[40]){
        frogger.jump();
    }
});

//when key is released, reset the moving property to false and frameX to 0, so that the animation stops and frameX is set back to default.
window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
    frogger.moving = false;
    frogger.frameX = 0;
});

//when frogger reaches top of screen: update score, increase game speed, reset frogger position.
function scored(){
    score++;
    gameSpeed += 0.05;
    frogger.x = canvas.width/2 - frogger.width/2;
    frogger.y = canvas.height - frogger.height - 40;
}

//create the score board centered on the x and y axis on canvas  4.
function handleScoreBoard(){
    ctx4.fillStyle = 'black';
    ctx4.strokeStyle = 'black';
    ctx4.font = '15px Verdana';
    ctx4.strokeText('Score', 265, 15);
    ctx4.font = '60px Verdana';
    ctx4.fillText(score, 270, 65);
    ctx4.font = '15px Verdana';
    ctx4.strokeText('Collisions: ' + collisionsCount, 10, 175);
    ctx4.strokeText('Game Speed: ' + gameSpeed.toFixed(1), 10, 195)
}

//collision detection: reusable function that takes two arguments to check if frogger collides with cars. Returns true if none of these conditions is true, meaning that first and second objects are colliding.
function collision(first, second){
    return !(first.x > second.x + second.width || 
              first.x + first.width < second.x ||
              first.y > second.y + second.height ||
              first.y + first.height < second.y);
}



