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