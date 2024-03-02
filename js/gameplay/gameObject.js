class GameObject {
  constructor(bounds, size) {
    this.position = createVector(bounds.x / 2, bounds.y / 2);
    this.position = createVector(0, 0);
    this.rotation = 0;
    this.bounds = bounds;
    this.size = size;
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

  collide() {}

  wrapPos() {
    if (this.position.x > this.bounds.x + this.size) {
      this.position.x = 0 - this.size;
    } else if (this.position.x < 0 - this.size) {
      this.position.x = this.bounds.x + this.size;
    }

    if (this.position.y > this.bounds.y + this.size) {
      this.position.y = 0 - this.size;
    } else if (this.position.y < 0 - this.size) {
      this.position.y = this.bounds.y + this.size;
    }
  }
}
