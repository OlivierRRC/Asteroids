class Game {
  constructor(states, bounds, gameOver) {
    this.states = states;
    this.bounds = bounds;
    this.gameOver = gameOver;

    this.screenShake = new ScreenShake();

    this.setup();
  }

  setup() {
    this.level = 0;
    this.objects = [];
    this.score = {
      score: 0,
    };
    this.player = new Ship(bounds, this.objects, this.screenShake);
    this.objects.push(this.player);
    this.populateAsteroids();

    this.collisions = new Collisions(
      this.objects,
      this.score,
      this.populateAsteroids
    );
    this.extraLives = 0;
  }

  populateAsteroids() {
    this.level += 1;
    for (let i = 0; i < this.level; i++) {
      this.objects.push(
        new Asteroid(
          bounds,
          this.objects,
          createVector(random(bounds.x), random(bounds.y)),
          random(TWO_PI),
          50,
          2
        )
      );
    }
  }

  update() {
    push();
    this.screenShake.update();
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
    }
    pop();
    this.collisions.check();

    this.extraLives = floor(this.score.score / 10000);

    this.drawScore();
    this.drawLives();

    //esc for game over
    if (this.player.lives + this.extraLives <= 0) {
      this.gameOver.setup(this.score.score);
      this.states.current = states.gameOver;
    }
  }

  drawLives() {
    push();

    textFont("Courier New");
    textSize(65);
    textAlign(LEFT);
    text("♥".repeat(this.player.lives + this.extraLives), 0 + 25, 35);
    pop();
  }

  drawScore() {
    textSize(50);
    textAlign(RIGHT);
    text(nf(this.score.score, 5), this.bounds.x - 25, 25);
  }
}
