class Saucer extends GameObject {
  constructor(bounds, objects, size, screenShake, sounds) {
    super(bounds, size);
    this.objects = objects;
    this.position = createVector(-size / 2, random(bounds.y));
    this.screenShake = screenShake;
    this.target = objects[0];

    this.sounds = sounds;
    sounds.saucerEnter();

    this.shotTimer = millis() / 1000;
    this.shotCooldown = 1;
  }

  collide() {
    this.sounds.saucerExit();
    let index = this.objects.indexOf(this);
    this.objects.splice(index, 1);
  }

  //this is a test for when i implement flying saucers
  wrapPos() {
    if (super.wrapPos() == true) {
      this.sounds.saucerExit();
      let index = this.objects.indexOf(this);
      this.objects.splice(index, 1);
    }
  }

  faceTarget() {
    this.rotation = atan2(
      this.target.position.y - this.position.y,
      this.target.position.x - this.position.x
    );
  }

  shoot() {
    if (millis() / 1000 > this.shotTimer + this.shotCooldown) {
      //this.sounds.playSound("shoot");
      let x = 1 * cos(this.rotation);
      let y = 1 * sin(this.rotation);
      let dir = createVector(x, y);
      this.objects.push(
        new Bullet(
          this.bounds,
          this.objects,
          this.position.copy().add(dir.copy().mult(this.size)),
          this.rotation + PI / 2 + random(-PI / 4, PI / 4),
          this.screenShake,
          "saucer"
        )
      );
      //this.velocity.sub(dir);
      this.shotTimer = millis() / 1000;
    }
  }

  update() {
    push();
    this.rotation = 0;
    this.transform();
    this.position.x += 1;
    this.faceTarget();
    this.shoot();
    this.draw();
    pop();
  }

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
