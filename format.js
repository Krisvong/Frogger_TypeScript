//canvas set up
//global variables
//sprite references

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

const resultDisplay = document.querySelector('#result')
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
