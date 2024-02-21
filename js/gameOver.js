class GameOver {
  constructor(mouse) {
    this.mouse = mouse;
    this.textPos = 0;

    this.b = new Button(0, 125, 40, "NEXT", next);
  }

  getInitials() {
    return this.initials;
  }

  getScore() {
    return this.score;
  }

  setup(score) {
    this.initials = "";
    this.score = score;
  }

  processKeyboard(keyCode) {
    if (keyCode == 8) {
      this.initials = this.initials.slice(0, -1);
      this.textPos = constrain(this.textPos, 0, 2);
    } else if (keyCode >= 65 && keyCode <= 90) {
      this.initials += char(keyCode);
      this.initials = this.initials.slice(0, 3);
    }
  }

  draw() {
    push();
    translate(width / 2, height / 3);
    textSize(100);
    text("GAME OVER", 0, 0);
    pop();

    push();
    translate(width / 2, (height / 7) * 4);
    textSize(50);
    text("SCORE:" + nf(this.score, 5), 0, 0);

    let t = "";

    for (let i = this.initials.length; i < 3; i++) {
      if (i == this.initials.length) {
        if (frameCount % 60 <= 30) {
          t += "_";
        } else {
          t += " ";
        }
      } else {
        t += "_";
      }
    }

    text((this.initials + "  ").slice(0, 3), 0, 50);
    text(("  " + t).slice(-3), 0, 50);

    if (this.initials.length == 3) {
      this.b.processMouse(this.mouse());
      this.b.draw();
    }

    pop();
  }
}
