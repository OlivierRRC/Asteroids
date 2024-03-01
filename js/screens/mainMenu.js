class MainMenu {
  constructor(mouse, states, bounds) {
    this.mouse = mouse;
    this.bounds = bounds;

    this.buttons = [];
    this.buttons.push(
      new Button(0, -25, 50, "PLAY", () => {
        states.current = states.game;
        //gameOver.setup(floor(random(0, 10000)));
      })
    );
    this.buttons.push(
      new Button(0, 25, 50, "LEADERBOARD", () => {
        states.current = states.leaderboard;
      })
    );
  }

  draw() {
    //Big title "ASTEROIDS"
    push();

    translate(this.bounds.x / 2, this.bounds.y / 3);
    textSize(100);
    text("ASTEROIDS", 0, 0);

    pop();
    //Buttons
    push();

    translate(this.bounds.x / 2, (this.bounds.y / 3) * 2);
    this.buttons.forEach((b) => {
      b.processMouse(this.mouse());
      b.draw();
    });

    pop();
  }
}
