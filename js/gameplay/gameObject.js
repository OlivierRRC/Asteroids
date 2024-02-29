class GameObject {
  constructor() {
    this.position = createVector(300, 200);
    this.rotation = 0;
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
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}
