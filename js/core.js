let font;
//let mainButtons = [];

let main;
let leaderBoard;

let backButton;

let nextButton;

let scroll = 0;

let textPos = 0;
let initials = "";

let states = {
  current: 0,
  main: 0,
  game: 1,
  leaderboard: 2,
  gameOver: 3,
};

let score;

let scores = [];

let play = function () {
  initials = "";
  states.current = states.gameOver;
  score = floor(random(0, 10000));
};

let leaderboard = function () {
  scroll = 0;
  states.current = states.leaderboard;
};

let back = function () {
  states.current = states.main;
};

let next = function () {
  states.current = states.leaderboard;
  //save score and sort scores
  scores.push({
    name: initials,
    score: score,
  });
  scores = scores.sort(({ score: a }, { score: b }) => b - a);
  storeItem("scores", scores);
};

function preload() {
  font = loadFont("Assets/NovaMono-Regular.ttf");
}

function setup() {
  main = new MainMenu(transMouse);
  leaderBoard = new LeaderBoard(transMouse);

  createCanvas(640, 480);
  states.current = states.main;

  nextButton = new Button(0, 125, 40, "NEXT", next);

  //backButton = new Button(0, 0, 30, "BACK", back);
  /*
  mainButtons.push(new Button(0, -25, 50, "PLAY", play));
  mainButtons.push(new Button(0, 25, 50, "LEADERBOARD", leaderboard));
*/
  if (getItem("scores") != null) {
    scores = getItem("scores");
  }

  //generate test set of values for leaderboard page
  for (let i = 0; i < 0; i++) {
    scores.push({
      name: char(random(65, 91)) + char(random(65, 91)) + char(random(65, 91)),
      score: floor(random(0, 10000)),
    });
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
      gameOver();
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
  if (keyCode == 8) {
    initials = initials.slice(0, -1);
    textPos = constrain(textPos, 0, 2);
  } else if (keyCode >= 65 && keyCode <= 90) {
    initials += char(keyCode);
    initials = initials.slice(0, 3);
  }
}

function gameOver() {
  push();
  translate(width / 2, height / 3);
  textSize(100);
  text("GAME OVER", 0, 0);
  pop();

  push();
  translate(width / 2, (height / 7) * 4);
  textSize(50);
  text("SCORE:" + nf(score, 5), 0, 0);

  let t = "";

  for (let i = initials.length; i < 3; i++) {
    if (i == initials.length) {
      if (frameCount % 60 <= 30) {
        t += "_";
      } else {
        t += " ";
      }
    } else {
      t += "_";
    }
  }

  text((initials + "  ").slice(0, 3), 0, 50);
  text(("  " + t).slice(-3), 0, 50);

  if (initials.length == 3) {
    nextButton.processMouse(transMouse());
    nextButton.draw();
  }

  pop();
}

/*
function leaderBoard() {
  push();
  translate(0, scroll);
  push();
  translate(width / 2, height / 3);
  textSize(100);
  text("LEADERBOARD", 0, 0);
  pop();

  rectMode(CORNERS);
  translate(width / 2, (height / 3) * 2);
  textSize(50);
  //rect(-50,0,50,500);

  push();
  for (let i = 0; i < scores.length; i++) {
    textAlign(RIGHT);
    text(i + 1 + " " + scores[i].name, -75, 0);
    textAlign(LEFT);
    text(nf(scores[i].score, 5), 75, 0);
    translate(0, 50);
  }
  pop();

  pop();

  push();

  translate(40, height - 20);

  backButton.processMouse(transMouse());
  backButton.draw();

  pop();
}
*/
/*
function mainMenu() {
  push();
  translate(width / 2, height / 3);
  textSize(100);
  text("ASTEROIDS", 0, 0);
  pop();

  push();
  translate(width / 2, (height / 3) * 2);
  mainButtons.forEach(updatemainButtons);
  pop();
}
*/ /*
function updatemainButtons(b) {
  b.processMouse(transMouse());
  b.draw();
}
*/
function mouseWheel(e) {
  scroll -= e.delta / 5;
  scroll = constrain(scroll, -constrain(scores.length - 2.5, 0, 99) * 50, 0);
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
