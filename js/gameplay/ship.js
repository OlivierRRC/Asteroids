class Ship extends GameObject {
  constructor(bounds, objects, screenShake, sounds) {
    super(bounds, 15);

    this.objects = objects;
    this.screenShake = screenShake;
    this.sounds = sounds;

    this.invincible = true;
    this.lives = 3;

    this.position = createVector(bounds.x / 2, bounds.y / 2);

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);

    this.rAcceleration = 0;
    this.rVelocity = 0;

    this.teleportCooldown = 2;
    this.teleportTimer = 0;

    this.shotCooldown = 0.4;
    this.shotTimer = 0;
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
      this.sounds.playSound("shoot");
      let x = 1 * cos(this.rotation - PI / 2);
      let y = 1 * sin(this.rotation - PI / 2);
      let dir = createVector(x, y);
      this.objects.push(
        new Bullet(
          this.bounds,
          this.objects,
          this.position.copy().add(dir.copy().mult(20)),
          this.rotation,
          this.screenShake,
          "ship"
        )
      );
      this.velocity.sub(dir);
      this.shotTimer = millis() / 1000;
      this.invincible = false;
    }
  }

  //when a or d is pressed
  //add rotation acceleration to the rotation velocity
  //add the rotation velocity to the rotation of the object
  turn() {
    if (keyIsDown(65)) {
      this.rAcceleration -= (PI / 180) * 0.07;
      this.invincible = false;
    } else if (keyIsDown(68)) {
      this.rAcceleration += (PI / 180) * 0.07;
      this.invincible = false;
    } else {
      this.rAcceleration = 0;
    }

    //accelerate
    this.rVelocity += this.rAcceleration;
    //friction
    this.rVelocity += this.rVelocity * 0.07 * -1;
    //limit
    this.rVelocity = constrain(this.rVelocity, -0.07, 0.07);
    //apply
    this.rotation = this.rotation + this.rVelocity;
  }

  //when you press the w key
  //add acceleration to velocity
  //add velocity to position
  thrust() {
    //get input ('w' key)
    if (keyIsDown(87)) {
      this.sounds.startThrust();
      let x = 1 * cos(this.rotation - PI / 2);
      let y = 1 * sin(this.rotation - PI / 2);
      this.acceleration.add(createVector(x, y).div(100));
      this.drawThruster();
      this.invincible = false;
    } else {
      this.sounds.stopThrust();
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

  //when shift is pressed, move the ship to a random position
  teleport() {
    if (
      keyIsDown(16) &&
      millis() / 1000 > this.teleportTimer + this.teleportCooldown
    ) {
      this.sounds.playSound("teleport");
      let newPos = createVector(random(this.bounds.x), random(this.bounds.y));
      let lastPos = this.position.copy();

      //trail effect to keep track of where the ship is better
      push();
      rotate(-this.rotation);
      line(0, 0, newPos.x - lastPos.x, newPos.y - lastPos.y);
      pop();

      this.position = newPos;

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
