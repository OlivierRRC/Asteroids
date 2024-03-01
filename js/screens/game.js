class Game {
  constructor(states, bounds, gameOver) {
    this.player = new Ship(bounds);
    this.states = states;
    this.bounds = bounds;
    this.gameOver = gameOver;
  }

  update() {
    this.player.update();

    //esc for game over
    if (keyIsDown(27)) {
      this.gameOver.setup(floor(random(1000)));
      this.states.current = states.gameOver;
    }
  }
}
