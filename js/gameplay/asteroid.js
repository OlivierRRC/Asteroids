class Asteroid extends GameObject {
  constructor(bounds, objects, startPos, startRot, size, generation) {
    super(bounds, size);

    this.generation = generation;
    this.objects = objects;
    this.resolution = 20;
    this.noiseScale = 3;
    this.s = size;
    this.points = [];
    this.generateShape();
    this.setRot(startRot);
    this.setPos(startPos);
  }

  collide() {
    if (this.generation != 0) {
      for (let i = 0; i < 2; i++) {
        this.objects.push(
          new Asteroid(
            this.bounds,
            this.objects,
            this.position.copy(),
            this.rotation + (PI / 4) * i,
            (this.s / 3) * 2,
            this.generation - 1
          )
        );
      }
    }
    let index = this.objects.indexOf(this);
    this.objects.splice(index, 1);
  }

  update() {
    push();
    this.transform();
    let x = 1 * cos(this.rotation);
    let y = 1 * sin(this.rotation);

    this.position.add(createVector(x, y).mult((1 - this.s / 100) * 2));
    this.draw();

    pop();
  }

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

  draw() {
    noFill();
    strokeWeight(4);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape(CLOSE);
    //circle(0, 0, this.s);
  }
}
