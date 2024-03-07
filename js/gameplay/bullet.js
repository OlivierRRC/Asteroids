class Bullet extends GameObject {
  constructor(bounds, objects, pos, rot, screenShake) {
    super(bounds, 10);
    this.objects = objects;
    this.position = pos;
    this.rotation = rot;

    this.speed = 5;

    //time untill the bullet is removed
    this.lifetime = 3;
    this.timer = millis();

    this.screenShake = screenShake;
    //when the object is spawned in, it adds some screenshake
    this.screenShake.add(2);
  }

  //when collided with, add some screenshake and remove from objects array
  collide() {
    this.screenShake.add(5);
    let index = this.objects.indexOf(this);
    this.objects.splice(index, 1);
  }

  update() {
    push();
    this.transform();

    //figure out the direction vector and travel in that direction
    let x = 1 * cos(this.rotation - PI / 2);
    let y = 1 * sin(this.rotation - PI / 2);
    this.position.add(createVector(x, y).mult(this.speed));

    //draw point at bullets position
    strokeWeight(4);
    point(0, 0);

    pop();

    //if enough time has passed, destroy the bullet
    if (millis() - this.timer > this.lifetime * 1000) {
      let index = this.objects.indexOf(this);
      this.objects.splice(index, 1);
    }
  }
}
