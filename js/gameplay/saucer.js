class Saucer extends GameObject {
  constructor(bounds, objects, size, screenShake, sounds, score, demo) {
    super(bounds, size);
    this.objects = objects;
    this.position = createVector(-size / 2, random(bounds.y));
    this.screenShake = screenShake;
    this.target = objects[0];

    this.scoreThreshold = 3000;

    this.score = score;

    this.sounds = sounds;
    sounds.saucerEnter();

    this.shotTimer = millis() / 1000;
    this.shotCooldown = 2;

    this.demo = demo;
  }

  collide() {
    this.sounds.playSound("hit");
    this.sounds.saucerExit();
    let index = this.objects.indexOf(this);
    this.objects.splice(index, 1);
  }

  //set rotation to face towards target(player)
  faceTarget() {
    this.rotation = atan2(
      this.target.position.y - this.position.y,
      this.target.position.x - this.position.x
    );

    //if the score threshold is high enough, start factoring in target velocity
    if (this.score > this.scoreThreshold) {
      this.rotation = atan2(
        this.target.position.y + this.target.velocity.y * 20 - this.position.y,
        this.target.position.x + this.target.velocity.x * 20 - this.position.x
      );

      print(this.target.velocity);
    }

    //draw line to targeting point
    if (this.demo == true) {
      push();

      rotate(this.rotation);
      line(0, 0, this.position.dist(this.target.position), 0);

      pop();
    }
  }

  shoot() {
    if (millis() / 1000 > this.shotTimer + this.shotCooldown) {
      //get facing direction as a  vector in cartesian space
      let x = 1 * cos(this.rotation);
      let y = 1 * sin(this.rotation);
      let dir = createVector(x, y);

      //to be plugged into random
      let rotationRange;

      if (this.score == undefined) {
        //regular aim, based on the size of the saucer
        rotationRange = (TWO_PI / 360) * this.size;
      } else if (this.score <= this.scoreThreshold) {
        //aim gets better as score gets closer to the score threshold
        rotationRange =
          (TWO_PI / 360) * this.size * (1 - this.score / this.scoreThreshold);
      } else {
        //gives 1 degree of random rotation
        rotationRange = TWO_PI / 360;
      }

      let bulletRotation =
        this.rotation + PI / 2 + random(-rotationRange, rotationRange);

      this.objects.push(
        new Bullet(
          this.bounds,
          this.objects,
          this.position.copy().add(dir.copy().mult(this.size)),
          bulletRotation,
          this.screenShake,
          "saucer"
        )
      );
      this.shotTimer = millis() / 1000;
    }
  }

  update() {
    //regular behaviour
    if (this.demo == false || this.demo == undefined) {
      push();
      this.rotation = 0;
      this.transform();
      this.position.x += 1;
      this.faceTarget();
      this.shoot();
      this.draw();
      pop();
    } //debug behavior
    else {
      push();
      this.rotation = 0;
      this.transform();
      this.position.x = this.bounds.x / 2;
      this.position.y = this.bounds.y / 3;
      this.faceTarget();
      this.shoot();
      this.draw();
      pop();
    }
  }

  //a little bit complex
  draw() {
    push();

    strokeWeight(4);
    noFill();

    translate(0, this.size / 6);
    beginShape();
    //center line
    vertex(-this.size / 2 - 5, 0);
    vertex(this.size / 2 + 5, 0);

    //bottom hull
    vertex(this.size / 3, this.size / 3);
    vertex(-this.size / 3, this.size / 3);
    vertex(-this.size / 2 - 5, 0);

    //top hull
    vertex(-this.size / 3, -this.size / 3);
    vertex(-this.size / 4, -this.size / 3);

    vertex(-this.size / 7, (-this.size / 3) * 2);
    vertex(this.size / 7, (-this.size / 3) * 2);
    vertex(this.size / 4, -this.size / 3);

    vertex(-this.size / 4, -this.size / 3);
    vertex(this.size / 3, -this.size / 3);

    vertex(this.size / 2 + 5, 0);

    endShape(CLOSE);
    pop();
  }
}
