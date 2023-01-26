//animation loops and event listeners

//clear multiple canvas elements starting at (0,0) ending at canvas width and height
function animate(){
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    frogger.draw();
    frogger.update();
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



