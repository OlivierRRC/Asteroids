let font;

let sounds;
let sfx = [];

//a variable for each of the screens that will be displayed
let main;
let leaderBoard;
let gameOver;
let game;

//this is basically an enum
let states = {
  current: 0,
  main: 0,
  game: 1,
  leaderboard: 2,
  gameOver: 3,
};

//array of scores for the leaderboard
let scores = [];

//will be assigned a vector that is x = width  and y = height
let bounds;

//load the font to be used for the text in the game
function preload() {
  font = loadFont("Assets/NovaMono-Regular.ttf");

  sfx.push(loadSound("Assets/MusicStart.wav"));
  sfx.push(loadSound("Assets/MusicLoop.wav"));

  sfx.push(loadSound("Assets/SFX/Hit.wav"));
  sfx.push(loadSound("Assets/SFX/Explosion.wav"));
  sfx.push(loadSound("Assets/SFX/Shoot.wav"));
  sfx.push(loadSound("Assets/SFX/Teleport.wav"));
  sfx.push(loadSound("Assets/SFX/Engine.wav"));
  sfx.push(loadSound("Assets/SFX/Saucer.wav"));
}

function setup() {
  //uncomment to clear the leaderboard
  //storeItem("scores", null);

  //if there are scores in the local storage, assign the scores variable to them
  if (getItem("scores") != null) {
    scores = getItem("scores");
  }

  bounds = createVector(640, 480);

  sounds = new Sounds(sfx);

  //create all the different screens
  leaderBoard = new LeaderBoard(transMouse, states, bounds, scores);
  gameOver = new GameOver(transMouse, states, bounds, scores);
  main = new MainMenu(transMouse, states, bounds, sounds);
  game = new Game(states, bounds, gameOver, sounds);

  createCanvas(bounds.x, bounds.y);
  //set the current game state to be showing the main menu
  states.current = states.main;
}

function draw() {
  background(0);
  fill(255);
  stroke(255);

  textAlign(CENTER, CENTER);
  textFont(font);

  //push pop context to contain the glow effect
  push();

  //these lines create the glow effect
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = color(255);

  //look through the enum and show the correct screen based on the value
  switch (states.current) {
    case states.main:
      main.draw();
      break;
    case states.game:
      game.update();
      break;
    case states.leaderboard:
      leaderBoard.draw();
      break;
    case states.gameOver:
      gameOver.draw();
      break;
  }
  pop();

  //crt grill outside of the push pop so that it dosent have glow
  crtGrill();
}

//adds crt grill effect to be rendered on top of the screen
function crtGrill() {
  stroke(0);
  strokeWeight(0.8);
  for (let i = 0; i < width / 4; i++) {
    line(i * 4, 0, i * 4, height);
  }
  for (let i = 0; i < height / 3; i++) {
    line(0, i * 3, width, i * 3);
  }
}

//send the keycodes to the gameover screen if it's active
function keyPressed() {
  if (states.current == states.gameOver) {
    gameOver.processKeyboard(keyCode);
  }
}

//get mouse wheel delta and save how far the mouse wheel should have scrolled on the leaderboard
function mouseWheel(e) {
  if (states.current == states.leaderboard) {
    leaderBoard.scroll(e.delta / 5);
  }
}

//Function that returns mouse coordinates relative to the current transformations
let transMouse = function () {
  //you can tell I borrowed it because it uses const instead of let
  const matrix = drawingContext.getTransform();
  const localCoord = matrix
    .inverse()
    .transformPoint(
      createVector(mouseX * pixelDensity(), mouseY * pixelDensity())
    );
  return localCoord;
};
