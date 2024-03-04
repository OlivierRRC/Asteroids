class Ship extends GameObject {
  constructor(bounds, objects, screenShake) {
    super(bounds, 15);

    this.objects = objects;
    this.screenShake = screenShake;

    this.invincible = true;
    this.lives = 3;

    this.position = createVector(bounds.x / 2, bounds.y / 2);

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);

    this.rAcceleration = 0;
    this.rVelocity = 0;

    this.teleportCooldown = 3;
    this.teleportTimer = 0;

    this.shotCooldown = 0.5;
    this.shotTimer = 0;
  }

  //this is a test for when i implement flying saucers
  wrapPos() {
    if (super.wrapPos() == true) {
      print("aaa");
    }
  }

  //when collided with, return to center of the screen, enable invinciblity, and remove one life
  collide() {
    this.position.x = bounds.x / 2;
    this.position.y = bounds.y / 2;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.invincible = true;
    this.lives -= 1;
  }

  update() {
    push();
    strokeWeight(4);
    this.transform();
    this.thrust();
    this.turn();
    this.teleport();
    this.drawShip();
    this.shoot();
    pop();
  }

  //when space is pressed
  //if the you have waited for the cooldown
  //create a new bullet and add it to objects array
  //also add some backwards velocity
  shoot() {
    if (keyIsDown(32) && millis() / 1000 > this.shotTimer + this.shotCooldown) {
      let x = 1 * cos(this.rotation - PI / 2);
      let y = 1 * sin(this.rotation - PI / 2);
      let dir = createVector(x, y);
      this.objects.push(
        new Bullet(
          this.bounds,
          this.objects,
          this.position.copy().add(dir.copy().mult(20)),
          this.rotation,
          this.screenShake
        )
      );
      this.velocity.sub(dir);
      this.shotTimer = millis() / 1000;
      this.invincible = false;
    }
  }

  //when a or d is pressed
  //add rotation acceleration to teh rotation velocity
  //add the rotation velocity to the rotation of the object
  turn() {
    if (keyIsDown(65)) {
      this.rAcceleration -= (PI / 180) * 0.01;
      this.invincible = false;
    } else if (keyIsDown(68)) {
      this.rAcceleration += (PI / 180) * 0.01;
      this.invincible = false;
    } else {
      this.rAcceleration = 0;
    }
    this.rVelocity += this.rAcceleration;
    this.rVelocity += this.rVelocity * 0.04 * -1;
    this.rVelocity = constrain(this.rVelocity, -0.1, 0.1);
    this.rotation = this.rotation + this.rVelocity;
  }

  //when you press the w key
  //add acceleration to velocity
  //add velocity to position
  thrust() {
    //get input ('w' key)
    if (keyIsDown(87)) {
      let x = 1 * cos(this.rotation - PI / 2);
      let y = 1 * sin(this.rotation - PI / 2);
      this.acceleration.add(createVector(x, y).div(100));
      this.drawThruster();
      this.invincible = false;
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
    this.position = this.position.add(this.velocity);
  }

  //when shift is preseed, move the ship to a random position
  teleport() {
    if (
      keyIsDown(16) &&
      millis() / 1000 > this.teleportTimer + this.teleportCooldown
    ) {
      let pos = createVector(random(this.bounds.x), random(this.bounds.y));
      this.position = pos;
      this.teleportTimer = millis() / 1000;
      this.invincible = false;
    }
  }

  drawShip() {
    push();
    translate(0, -15);
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
