class Bullet extends GameObject {
  constructor(bounds, objects, pos, rot) {
    super(bounds, 8);
    this.position = pos;
    this.rotation = rot;
    this.objects = objects;
  }

  collide() {
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
  }
}
