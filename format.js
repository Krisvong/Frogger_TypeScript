//canvas set up
//global variables
//sprite references
//sound effects

//create five canvas elements, get each one by its id(canvas1-canvas5).
//get the 2D rendering context of the canvas element and set the width and height of each canvas element to 600 X 600 pixels.
const canvas = document.getElementById('canvas1');
const ctx1 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = 600;
canvas2.height = 600;

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
canvas3.width = 600;
canvas3.height = 600;

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
canvas4.width = 600;
canvas4.height = 600;

const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas5.getContext('2d');
canvas5.width = 600;
canvas5.height = 600;

//global variables
const grid = 80;
let keys = [];
let score = 0;
let collisionsCount = 0;
let frame = 0;
let gameSpeed = 1;
let safe = false;

//typewriter text variables
const textDisplay = document.getElementById('text');
const phrases = ['We \u2665 Frogger!', 'Ribbit Ribbit', 'Go Frogger!', 'Look at Frogger Go!','\u2665 \u2665 \u2665 \u2665'];
let i = 0; /*keep track of which phrase in the 'phrases' array is currently being displayed(first phrase will be displayed*/
let j = 0; /*keep track of which letter in the current phrase is being displayed(animation will start with first letter of first phrase)*/
let currentPhrase = [];
let isDeleting = false; /*animation will start by adding letters to the current phrase*/
let isEnd = false; 
const spedUp = Math.random() * (80 - 50) + 50; /* random number between 50 and 80 used to set the speed of animation when it is deleting letters from the current phrase*/
const normalSpeed = Math.random() * (300 - 200) + 200; /*random number between 200 and 300 used to set the speed of the animation when it is adding letters to the current phrase*/
const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed; /*sets the speed of animation: isEnd=true then time = 2000. isDeleting = true then time = spedUp. If neither true time is constant.*/


const resultDisplay = document.querySelector('#result');
//array to hold all particles objects for dust effects
const particlesArray = [];
//variable to limit amout of Particles to prevent performance issues
const maxParticles = 300;
//array to hold all ripple objects for water ripple effects
const ripplesArray = [];
//array to hold randomized cars
const carsArray = [];
//array to hold logs and turtles
const logsArray = [];

//images
const background_lvl2 = new Image();
background_lvl2.src = '/assets/images/Frogger/background_lvl2.png';

const grass = new Image();
grass.src = '/assets/images/Frogger/grass.png';

const collisions = new Image();
collisions.src = '/assets/images/Frogger/collisions.png';

const turtle = new Image();
turtle.src = '/assets/images/Frogger/turtles.png';

const log = new Image();
log.src = '/assets/images/Frogger/log.png';

const car = new Image();
car.src = '/assets/images/Frogger/cars.png';
let numberOfCars = 3;

const froggerSprite = new Image();
froggerSprite.src = '/assets/images/Frogger/frog_spritesheet.png';

const jumpSound = document.createElement('audio');
jumpSound.src = '/assets/images/sounds/jump_sound.ogg';

const waterSound = document.createElement('audio');
waterSound.src = '/assets/images/sounds/cannon_miss.ogg';

const coinSound = document.createElement('audio');
coinSound.src = '/assets/images/sounds/sound-frogger-coin-in.wav';

const splatSound = document.createElement('audio');
splatSound.src = '/assets/images/sounds/cartoon-splat-6086.mp3';

const winSound = document.createElement('audio');
winSound.src = '/assets/images/sounds/winfretless.ogg';