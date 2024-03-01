class GameObject {
  constructor(bounds) {
    this.position = createVector(300, 200);
    this.rotation = 0;
    this.bounds = bounds;
  }

  transform() {
    translate(this.position);
    rotate(this.rotation);
    this.wrapPos();
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

  wrapPos() {
    if (this.position.x > this.bounds.x) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = this.bounds.x;
    }

    if (this.position.y > this.bounds.y) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = this.bounds.y;
    }
  }
}
