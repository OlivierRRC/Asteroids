class MainMenu {
  constructor(mouse, states, bounds) {
    this.mouse = mouse;
    this.bounds = bounds;

    //create array of buttons
    //each button gets an anonymous arrow function to execute on click
    this.buttons = [];
    this.buttons.push(
      new Button(0, -25, 50, "PLAY", () => {
        states.current = states.game;
      })
    );
    this.buttons.push(
      new Button(0, 25, 50, "LEADERBOARD", () => {
        states.current = states.leaderboard;
      })
    );
  }

  draw() {
    //draw big title "ASTEROIDS"
    push();

    translate(this.bounds.x / 2, this.bounds.y / 3);
    textSize(100);
    text("ASTEROIDS", 0, 0);

    pop();

    //draw and process input for buttons
    push();

    translate(this.bounds.x / 2, (this.bounds.y / 3) * 2);
    this.buttons.forEach((b) => {
      b.processMouse(this.mouse());
      b.draw();
    });

    pop();
  }
}
