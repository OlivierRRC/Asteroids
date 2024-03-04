class Bullet extends GameObject {
  constructor(bounds, objects, pos, rot, screenShake) {
    super(bounds, 8);
    this.position = pos;
    this.rotation = rot;
    this.objects = objects;

    this.lifetime = 3;
    this.timer = millis();
    this.screenShake = screenShake;
    this.screenShake.add(1);
  }

  collide() {
    this.screenShake.add(3);
    let index = this.objects.indexOf(this);
    this.objects.splice(index, 1);
  }

  update() {
    push();
    this.transform();
    let x = 1 * cos(this.rotation - PI / 2);
    let y = 1 * sin(this.rotation - PI / 2);

    this.position.add(createVector(x, y).mult(3));
    strokeWeight(4);
    point(0, 0);
    pop();

    if (millis() - this.timer > this.lifetime * 1000) {
      let index = this.objects.indexOf(this);
      this.objects.splice(index, 1);
    }
  }
}
