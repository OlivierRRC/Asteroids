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
  gameOver.reset(floor(random(0, 10000)));
};

let leaderboard = function () {
  scroll = 0;
  leaderBoard.scroll(0);
  states.current = states.leaderboard;
};

let back = function () {
  states.current = states.main;
};

let next = function () {
  states.current = states.leaderboard;

  //save score and sort scores
  scores.push({
    name: gameOver.getInitials(),
    score: gameOver.getScore(),
  });

  scores = scores.sort(({ score: a }, { score: b }) => b - a);
  storeItem("scores", scores);
};

function preload() {
  font = loadFont("Assets/NovaMono-Regular.ttf");
}

function setup() {
  //storeItem("scores", null);
  main = new MainMenu(transMouse);
  leaderBoard = new LeaderBoard(transMouse);
  gameOver = new GameOver(transMouse);

  createCanvas(640, 480);
  states.current = states.main;

  if (getItem("scores") != null) {
    scores = getItem("scores");
  }
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
