class GameObject {
  constructor(bounds, size) {
    this.position = createVector(0, 0);
    this.rotation = 0;
    this.bounds = bounds;
    this.size = size;
  }

  //transform the object acording to the rotation and postion
  transform() {
    translate(this.position);
    rotate(this.rotation);
    this.wrapPos();
  }

  collide() {}

  //wrap the position of the object over the edges of the screen
  wrapPos() {
    if (this.position.x > this.bounds.x + this.size) {
      this.position.x = 0 - this.size;
      return true;
    } else if (this.position.x < 0 - this.size) {
      this.position.x = this.bounds.x + this.size;
      return true;
    }

    if (this.position.y > this.bounds.y + this.size) {
      this.position.y = 0 - this.size;
      return true;
    } else if (this.position.y < 0 - this.size) {
      this.position.y = this.bounds.y + this.size;
      return true;
    }
    return false;
  }
}
