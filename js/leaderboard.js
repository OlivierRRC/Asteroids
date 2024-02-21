class LeaderBoard {
  constructor(mouse, states, scores) {
    this.mouse = mouse;

    this.states = states;
    this.scores = scores;
    this.b = new Button(0, 0, 30, "BACK", () => {
      this.states.current = this.states.main;
    });
  }

  draw() {
    push();

    translate(0, this.s);

    push();

    translate(width / 2, height / 3);
    textSize(100);
    text("LEADERBOARD", 0, 0);

    pop();

    translate(width / 2, (height / 3) * 2);
    textSize(50);

    push();

    for (let i = 0; i < this.scores.length; i++) {
      textAlign(RIGHT);
      text(i + 1 + " " + this.scores[i].name, -75, 0);
      textAlign(LEFT);
      text(nf(this.scores[i].score, 5), 75, 0);
      translate(0, 50);
    }
    pop();

    pop();

    push();

    translate(40, height - 20);

    this.b.processMouse(this.mouse());
    this.b.draw();

    pop();
  }

  scroll(s) {
    this.s = s;
  }
}
