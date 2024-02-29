class Game {
  constructor() {
    this.player = new Ship();
  }

  update() {
    this.player.draw();
  }
}
