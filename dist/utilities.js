"use strict";
//animation loops, functions and event listeners
//clear multiple canvas elements starting at (0,0) ending at canvas width and height
function animate() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    ctx4.clearRect(0, 0, canvas.width, canvas.height);
    ctx5.clearRect(0, 0, canvas.width, canvas.height);
    handleRipples();
    ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
    handleParticles();
    frogger.draw();
    frogger.update();
    handleObstacles();
    handleScoreBoard();
    ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);
    frame++;
    //recursion
    requestAnimationFrame(animate);
}
animate();
//event listeners
window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
    // access the element of the keys array at the index of the keycode. if any of the arrow keys are pressed, call jump method.
    if (keys[37] || keys[38] || keys[39] || keys[40]) {
        frogger.jump();
    }
});
//when key is released, reset the moving property to false and frameX to 0, so that the animation stops and frameX is set back to default.
window.addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
    frogger.moving = false;
    frogger.frameX = 0;
});
//when frogger reaches top of screen: update score, increase game speed, reset frogger position.
function scored() {
    score++;
    gameSpeed += 0.05;
    frogger.x = canvas.width / 2 - frogger.width / 2;
    frogger.y = canvas.height - frogger.height - 40;
    resultDisplay.textContent = 'Woo Hoo! Keep Going!';
    winSound.play();
}
//create the score board centered on the x and y axis on canvas  4.
function handleScoreBoard() {
    ctx4.fillStyle = 'black';
    ctx4.strokeStyle = 'black';
    ctx4.font = '15px Verdana';
    ctx4.strokeText('Score', 265, 15);
    ctx4.font = '60px Verdana';
    ctx4.fillText(score.toString(), 270, 65);
    ctx4.font = '15px Verdana';
    ctx4.strokeText('Collisions: ' + collisionsCount, 10, 175);
    ctx4.strokeText('Game Speed: ' + gameSpeed.toFixed(1), 10, 195);
}
//collision detection: reusable function that takes two arguments to check if frogger collides with cars. Returns true if none of these conditions is true, meaning that first and second objects are colliding.
function collision(first, second) {
    return !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y);
}
//function that resets the game sending frogger back to the starting position, resets score to zero, increases collision by one each time frogger collides, resets the speed to one and plays the arcade coin sound.
function resetGame() {
    frogger.x = canvas.width / 2 - frogger.width / 2;
    frogger.y = canvas.height - frogger.height - 40;
    score = 0;
    collisionsCount++;
    gameSpeed = 1;
    coinSound.play();
}
//function that implements the typewriter effect. Displays phrases in HTML element textDisplay. Loops through phrases adding characters to currrentPhrase variable until the full phrase is displayed, then deletes the characters until the phrase is empty.
function typewriter() {
    isEnd = false;
    textDisplay.innerHTML = currentPhrase.join('');
    //check if all phrases have been displayed by checking if the index i is less than the length of the phrases list.
    if (i < phrases.length) {
        //if the current phrase is not being deleted and the index j is less than or equal to the length of the current phrase, add a character to currentPhrase array, increment j and display the updated currentPhrase in the textDisplay element.
        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]);
            j++;
            textDisplay.innerHTML = currentPhrase.join('');
        }
        //if the current phrase is being deleted and the index j is less than or equal to the length of the current phrase, remove a character from the currentPhrase, decrement j, and display updated currentPhrase in textDisplay element.
        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop();
            j--;
            textDisplay.innerHTML = currentPhrase.join('');
        }
        //if j is equal to the length of the current phrase, enter deletion phase.
        if (j === phrases[i].length) {
            isEnd = true;
            isDeleting = true;
        }
        //if the current phrase is being deleted and j is zero, reset the currentPhrase array, end the deletion phase and increment index i to move onto the next phrase. If i is equal to the length of the phrases list, reset i to zero and start over with the first phrase.
        if (isDeleting && j === 0) {
            currentPhrase = [];
            isDeleting = false;
            i++;
            if (i === phrases.length) {
                i = 0;
            }
        }
    }
    //call typewriter function after a delay of three hundred milliseconds.
    setTimeout(typewriter, 300);
}
typewriter();
