let font;

let main;
let leaderBoard;
let gameOver;

let scroll = 0;

let states = {
  current: 0,
  main: 0,
  game: 1,
  leaderboard: 2,
  gameOver: 3,
};

let scores = [];

let play = function () {
  states.current = states.gameOver;
  gameOver.setup(floor(random(0, 10000)));
};

let leaderboard = function () {
  scroll = 0;
  leaderBoard.scroll(0);
  states.current = states.leaderboard;
};

function preload() {
  font = loadFont("Assets/NovaMono-Regular.ttf");
}

function setup() {
  //storeItem("scores", null);
  if (getItem("scores") != null) {
    scores = getItem("scores");
  }

  main = new MainMenu(transMouse);
  leaderBoard = new LeaderBoard(transMouse, states, scores);
  gameOver = new GameOver(transMouse, states, scores);

  createCanvas(640, 480);
  states.current = states.main;
}

function draw() {
  background(0);
  fill(255);
  stroke(255);

  textAlign(CENTER, CENTER);
  textFont(font);

  push();

  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = color(255);

  switch (states.current) {
    case states.main:
      main.draw();
      break;
    case states.game:
      text("game", width / 2, height / 2);
      break;
    case states.leaderboard:
      leaderBoard.draw();
      break;
    case states.gameOver:
      gameOver.draw();
      break;
  }
  pop();

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

function keyPressed() {
  if (states.current == states.gameOver) {
    gameOver.processKeyboard(keyCode);
  }
}

//get mouse wheel delta and save how far the mouse wheel should have scrolled
function mouseWheel(e) {
  scroll -= e.delta / 5;
  scroll = constrain(scroll, -constrain(scores.length - 2.5, 0, 99) * 50, 0);
  leaderBoard.scroll(scroll);
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
  //console.log(localCoord);
  return localCoord;
};
