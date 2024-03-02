class Ship extends GameObject {
  constructor(bounds) {
    super(bounds, 15);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);

    this.rAcceleration = 0;
    this.rVelocity = 0;

    this.teleportCooldown = 3;
    this.teleportTimer = 0;

    this.shotCooldown = 0.5;
    this.shotTimer = 0;

    this.setPos(createVector(bounds.x / 2, bounds.y / 2));
  }

  collide(index) {
    super.collide(index);
    this.position.x = bounds.x / 2;
    this.position.y = bounds.y / 2;
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  update() {
    push();
    this.transform();
    strokeWeight(4);
    this.thrust();
    this.turn();
    this.teleport();
    this.shoot();
    this.drawShip();
    pop();
  }

  shoot() {
    if (keyIsDown(32) && millis() / 1000 > this.shotTimer + this.shotCooldown) {
      print("bang");
      this.shotTimer = millis() / 1000;
    }
  }

  turn() {
    if (keyIsDown(65)) {
      this.rAcceleration -= (PI / 180) * 0.01;
    } else if (keyIsDown(68)) {
      this.rAcceleration += (PI / 180) * 0.01;
    } else {
      this.rAcceleration = 0;
    }
    this.rVelocity += this.rAcceleration;
    this.rVelocity += this.rVelocity * 0.04 * -1;
    this.rVelocity = constrain(this.rVelocity, -0.1, 0.1);
    this.setRot(this.getRot() + this.rVelocity);
  }

  thrust() {
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
    this.velocity.add(this.velocity.copy().normalize().mult(-1).mult(0.04));
    //limit
    this.velocity.limit(5);
    //apply
    this.setPos(this.getPos().add(this.velocity));
  }

  teleport() {
    //print();

    if (
      keyIsDown(16) &&
      millis() / 1000 > this.teleportTimer + this.teleportCooldown
    ) {
      let pos = createVector(random(width), random(height));
      this.setPos(pos);
      this.teleportTimer = millis() / 1000;
    }
  }

  drawShip() {
    push();
    translate(0, -15);
    point(0, -10, 10);
    noFill();
    beginShape();
    vertex(0, 0);
    vertex(10, 30);
    vertex(0, 25);
    vertex(-10, 30);
    vertex(0, 0);
    endShape();
    pop();
  }

  drawThruster() {
    push();
    translate(0, -15);
    fill(255);
    beginShape();
    vertex(0, 25);
    vertex(5, 30);
    vertex(0, 35);
    vertex(-5, 30);
    vertex(0, 25);
    endShape();
    pop();
  }
}
