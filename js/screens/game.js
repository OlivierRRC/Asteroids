class Game {
  constructor(states, bounds, gameOver, sounds) {
    this.states = states;
    this.bounds = bounds;
    this.gameOver = gameOver;
    this.sounds = sounds;

    this.screenShake = new ScreenShake();
    this.setup();
  }

  setup() {
    this.level = 0;

    //score as an object so that i can pass it to another object to be updated
    this.score = {
      value: 0,
    };

    //array of all gameobjects
    this.objects = [];

    //add ship to the objects array
    this.ship = new Ship(bounds, this.objects, this.screenShake);
    this.objects.push(this.ship);

    //the amount of extra lives the player has
    this.extraLives = 0;

    //add asteroids
    this.populateAsteroids();

    //create collision object to handle collision for all objects
    this.collisions = new Collisions(
      this.objects,
      this.score,
      this.populateAsteroids
    );
  }

  //adds one more asteroid everytime its called
  populateAsteroids() {
    this.level += 1;
    //adds asteroids into objects array
    for (let i = 0; i < this.level; i++) {
      this.objects.push(
        new Asteroid(
          bounds,
          this.objects,
          createVector(random(bounds.x), random(bounds.y)),
          random(TWO_PI),
          50,
          2,
          this.sounds
        )
      );
    }
  }

  update() {
    //apply screenshake in push pop context so that it dosent affect the hud
    push();
    this.screenShake.update();
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
    }
    pop();

    //check if anything is colliding
    this.collisions.check();

    //you get one extra life for every 10,000 points earned
    this.extraLives = floor(this.score.value / 10000);

    this.drawScore();
    this.drawLives();

    //if the ship runs out of lives, pass the score to gamover, and switch to the gameover script
    //also re-setup the game to be played again
    if (this.ship.lives + this.extraLives <= 0) {
      this.sounds.stopMusic();
      this.gameOver.setup(this.score.value);
      this.setup();
      this.states.current = states.gameOver;
    }
  }

  //draw the player's lives on the screen
  drawLives() {
    push();

    textFont("Courier New");
    textSize(50);
    textAlign(LEFT);
    text("⛯".repeat(this.ship.lives + this.extraLives), 25, 40);
    pop();
  }

  //draw the player's score on the screen
  drawScore() {
    textSize(50);
    textAlign(RIGHT);
    text(nf(this.score.value, 5), this.bounds.x - 25, 25);
  }
}
