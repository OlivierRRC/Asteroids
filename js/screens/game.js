class Game {
  constructor(states, bounds, gameOver) {
    this.objects = [];
    this.player = new Ship(bounds, this.objects);
    this.objects.push(this.player);
    //this.asteroids = [];
    for (let i = 0; i < 10; i++) {
      this.objects.push(
        new Asteroid(
          bounds,
          this.objects,
          createVector(random(bounds.x), random(bounds.y)),
          random(TWO_PI),
          50,
          2
        )
      );
    }

    this.collisions = new Collisions(this.objects);
    print(this.objects);

    this.states = states;
    this.bounds = bounds;
    this.gameOver = gameOver;
    this.start = true;
  }

  update() {
    //this.player.update();
    for (let i = 0; i < this.objects.length; i++) {
      //print(this.objects[i]);
      this.objects[i].update();
    }

    this.collisions.check();

    //esc for game over
    if (keyIsDown(27)) {
      this.gameOver.setup(floor(random(1000)));
      this.states.current = states.gameOver;
    }
  }
}
