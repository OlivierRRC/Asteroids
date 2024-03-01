class Asteroid extends GameObject {
  constructor(bounds) {
    super(bounds, 50);

    this.resolution = 20;
    this.noiseScale = 3;
    this.s = 50;
    this.points = [];
    this.generateShape();
    this.setRot(random(TWO_PI));
    this.setPos(createVector(random(bounds.x), random(bounds.y)));
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
