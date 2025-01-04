class GameOver {
  constructor(mouse, states, bounds, scores) {
    this.mouse = mouse;
    this.bounds = bounds;
    this.scores = scores;

    //the current position of the initials being entered (0-2)
    this.textPos = 0;

    //button gets an anonymous arrow function to execute on click
    this.b = new Button(0, 125, 40, "NEXT", () => {
      //add the score to the scores array
      this.scores.push({
        name: this.initials,
        score: this.score,
      });

      //sort the scores
      this.scores = this.scores.sort(({ score: a }, { score: b }) => b - a);
      //store the scores in local storage
      storeItem("scores", this.scores);

      //change screen to the leaderboard
      states.current = states.leaderboard;
    });
  }

  //gets score from the game and sets the initials to an empty string
  setup(score) {
    this.initials = "";
    this.score = score;
  }

  processKeyboard(keyCode) {
    if (keyCode == 8) {
      //backspace removes a character
      this.initials = this.initials.slice(0, -1);
      this.textPos = constrain(this.textPos, 0, 2);
    } else if (keyCode >= 65 && keyCode <= 90) {
      //any alphabetical character is added to the string
      this.initials += char(keyCode);
      this.initials = this.initials.slice(0, 3);
    }
  }

  draw() {
    //big title "GAME OVER"
    push();
    translate(this.bounds.x / 2, this.bounds.y / 3);
    textSize(100);
    text("GAME OVER", 0, 0);
    pop();

    //draw the input prompt
    push();
    translate(this.bounds.x / 2, (this.bounds.y / 7) * 4);
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

    //t is a series of "_"
    //this.text is the text entered by the player
    //these have spaces added to them to ensure they remain centered at all times
   // text((this.initials + "  ").slice(0, 3), 0, 50);
   // text(("  " + t).slice(-3), 0, 50);

   print(this.initials + t)
   print(this.initials)
   text(this.initials + t, 0, 50);

    //draw the button if the initals have been entered
    if (this.initials.length == 3) {
      this.b.processMouse(this.mouse());
      this.b.draw();
    }

    pop();
  }
}
