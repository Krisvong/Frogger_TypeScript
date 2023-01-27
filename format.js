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
const ctx2 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

//global variables
const grid = 80;
let keys = [];
let score = 0;
let collisionsCount = 0;
let frame = 0;
let gameSpeed = 1;
let numberOfCars = [];

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

