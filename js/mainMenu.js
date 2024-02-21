class MainMenu {
  constructor(mouse) {
    this.mouse = mouse;

    this.buttons = [];
    this.buttons.push(new Button(0, -25, 50, "PLAY", play));
    this.buttons.push(
      new Button(0, 25, 50, "LEADERBOARD", () => {
        states.current = states.leaderboard;
      })
    );
  }

  draw() {
    //Big title "ASTEROIDS"
    push();

    translate(width / 2, height / 3);
    textSize(100);
    text("ASTEROIDS", 0, 0);

    pop();
    //Buttons
    push();

    translate(width / 2, (height / 3) * 2);
    this.buttons.forEach((b) => {
      b.processMouse(this.mouse());
      b.draw();
    });

    pop();
  }
}
