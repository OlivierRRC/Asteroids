class LeaderBoard {
  constructor(mouse, states, bounds, scores) {
    this.mouse = mouse;
    this.bounds = bounds;
    this.scores = scores;

    //this is the amount the page should be scrolled
    this.s = 0;

    //button gets an anonymous arrow function to execute on click
    this.b = new Button(0, 0, 30, "BACK", () => {
      states.current = states.main;
    });
  }

  draw() {
    push();

    //translate down by scroll amount
    translate(0, this.s);

    push();

    //draw large title "LEADERBOARD"
    translate(this.bounds.x / 2, this.bounds.y / 3);
    textSize(100);
    text("LEADERBOARD", 0, 0);

    pop();

    //translate to where the scores should start being displayed
    translate(this.bounds.x / 2, (this.bounds.y / 3) * 2);
    textSize(50);

    push();

    //foreach score, draw it to the screen and then translate down to draw the next one
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

    //outside of push pop so its not affected by mouse
    translate(40, this.bounds.y - 20);

    this.b.processMouse(this.mouse());
    this.b.draw();

    pop();
  }

  //change the s variable acording to the scroll wheel
  scroll(s) {
    this.s -= s;

    this.s = constrain(
      this.s,
      -constrain(this.scores.length - 2.5, 0, 99) * 50,
      0
    );
  }
}
