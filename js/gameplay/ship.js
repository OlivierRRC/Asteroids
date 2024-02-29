class Ship extends GameObject {
  superconstructor() {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);

    this.rAcceleration = 0;
    this.rVelocity = 0;
  }

  update() {
    this.transform();
    strokeWeight(4);
    this.thrust();
    this.drawShip();
    this.turn();
  }

  turn() {
    if (this.rVelocity == undefined) {
      this.rVelocity = 0;
    }

    if (keyIsDown(65)) {
      this.rAcceleration -= (PI / 180) * 0.01;
    } else if (keyIsDown(68)) {
      this.rAcceleration += (PI / 180) * 0.01;
    } else {
      this.rAcceleration = 0;
    }
    this.rVelocity += this.rAcceleration;
    this.rVelocity += this.rVelocity * 0.01 * -1;
    this.rVelocity = constrain(this.rVelocity, -0.1, 0.1);
    this.setRot(this.getRot() + this.rVelocity);
  }

  thrust() {
    if (this.velocity == undefined) {
      this.velocity = createVector(0, 0);
    }

    //get input
    if (keyIsDown(87)) {
      let x = 1 * cos(this.rotation - PI / 2);
      let y = 1 * sin(this.rotation - PI / 2);
      this.acceleration.add(createVector(x, y).div(100));
      this.drawThruster();
    } else {
      this.acceleration = createVector(0, 0);
    }
    //accelerate
    this.velocity.add(this.acceleration);
    //friction
    this.velocity.add(this.velocity.copy().normalize().mult(-1).mult(0.01));
    //apply
    this.setPos(this.getPos().add(this.velocity));
  }

  drawShip() {
    noFill();
    beginShape();
    vertex(0, 0);
    vertex(10, 30);
    vertex(0, 25);
    vertex(-10, 30);
    vertex(0, 0);
    endShape();
  }

  drawThruster() {
    fill(255);
    beginShape();
    vertex(0, 25);
    vertex(5, 30);
    vertex(0, 35);
    vertex(-5, 30);
    vertex(0, 25);
    endShape();
  }
}
