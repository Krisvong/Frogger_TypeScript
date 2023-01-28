//animation loops and event listeners

//clear multiple canvas elements starting at (0,0) ending at canvas width and height
function animate(){
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    
    handleRipples()
    ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
    handleParticles();
    frogger.draw();
    frogger.update();
    
// handleObstacles();
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

//when frogger reaches top of screen: update score, increase game speed, reset frogger position
function scored(){
    score++;
    gameSpeed += 0.05;
    frogger.x = canvas.width/2 - frogger.width/2;
    frogger.y = canvas.height - frogger.height - 40;
}



