class GameObject {
  constructor() {
    this.position = createVector(300, 200);
    this.rotation = 0;
  }

  transform() {
    translate(this.position);
    rotate(this.rotation);
  }

  setPos(pos) {
    this.position = pos;
  }
  setRot(rot) {
    this.rotation = rot;
  }

  getPos() {
    return this.position;
  }
  getRot() {
    return this.rotation;
  }
}
