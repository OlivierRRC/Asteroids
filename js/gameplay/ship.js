class Ship extends GameObject {
  superconstructor() {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
  }

  draw() {
    this.transform();

    if (this.velocity == undefined) {
      this.velocity = createVector(0, 0);
    }

    //get input
    if (keyIsDown(87)) {
      let x = 1 * cos(this.rotation - PI / 2);
      let y = 1 * sin(this.rotation - PI / 2);
      this.acceleration.add(createVector(x, y).div(100));
    } else {
      this.acceleration = createVector(0, 0);
    }
    //accelerate
    this.velocity.add(this.acceleration);
    //friction
    this.velocity.add(this.velocity.copy().normalize().mult(-1).mult(0.01));
    //apply
    this.setPos(this.getPos().add(this.velocity));

    strokeWeight(4);
    noFill();
    beginShape();
    vertex(0, 0);
    vertex(10, 30);
    vertex(0, 25);
    vertex(-10, 30);
    vertex(0, 0);
    endShape();
  }
}
