class Asteroid extends GameObject {
  constructor(bounds, objects, startPos, startRot, size, generation, sounds) {
    super(bounds, size);

    this.objects = objects;
    this.rotation = startRot;
    this.position = startPos;
    this.s = size;
    this.sounds = sounds;

    this.generation = generation; //generation starts at 2 and goes down to 0, numbers corespond to asteroid size

    this.resolution = 20; //how many segments the asteroid is drawn out of
    this.noiseScale = 3;

    this.points = [];
    this.generateShape();
  }

  //generate a roundish shape as an array of points offset by noise
  generateShape() {
    for (let i = 0; i < this.resolution; i++) {
      let x = 1 * cos((TWO_PI / this.resolution) * i);
      let y = 1 * sin((TWO_PI / this.resolution) * i);
      let n = noise(
        (x + 0.5) * this.noiseScale,
        (y + 0.5) * this.noiseScale,
        random(10)
      );
      n = map(n, 0, 1, 0.5, 1);
      this.points.push(createVector(x * this.s * n, y * this.s * n));
    }
  }

  //when collided with, create two asteroids of a smaller generation, unless this astroid is of generation 0
  //remove this asteroid from the objects array
  collide() {
    this.sounds.playSound("hit");
    if (this.generation != 0) {
      for (let i = 0; i < 2; i++) {
        this.objects.push(
          new Asteroid(
            this.bounds,
            this.objects,
            this.position.copy(),
            this.rotation + (PI / 4) * i,
            (this.s / 3) * 2,
            this.generation - 1,
            this.sounds
          )
        );
      }
    }
    let index = this.objects.indexOf(this);
    this.objects.splice(index, 1);
  }

  //add some amount to the position vector
  update() {
    push();
    this.transform();
    let x = 1 * cos(this.rotation);
    let y = 1 * sin(this.rotation);

    this.position.add(createVector(x, y).mult((1 - this.s / 100) * 2));
    this.draw();

    pop();
  }

  //draw the generated shape
  draw() {
    noFill();
    strokeWeight(4);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape(CLOSE);
  }
}
