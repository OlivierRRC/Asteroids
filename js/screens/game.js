class Game {
  constructor(states, bounds, gameOver) {
    this.player = new Ship(bounds);

    this.asteroids = [];
    for (let i = 0; i < 10; i++) {
      this.asteroids.push(new Asteroid(bounds));
    }

    this.states = states;
    this.bounds = bounds;
    this.gameOver = gameOver;
    this.start = true;
  }

  update() {
    this.player.update();
    for (let i = 0; i < 10; i++) {
      this.asteroids[i].update();
    }
    //esc for game over
    if (keyIsDown(27)) {
      this.gameOver.setup(floor(random(1000)));
      this.states.current = states.gameOver;
    }
  }
}
