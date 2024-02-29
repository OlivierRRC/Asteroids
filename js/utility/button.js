class Button {
  constructor(x, y, size, t, f) {
    this.f = f;
    this.x = x;
    this.y = y;
    this.t = t;

    this.h = size;
    this.lock = false;
  }

  draw() {
    textSize(this.h);
    this.w = textWidth(this.t); //for whatever reason I have to do this every frame

    text(this.t, this.x, this.y - 7);

    rectMode(CENTER);
    noFill();
    //rect(this.x, this.y, this.w, this.h);
  }

  processMouse(mPos) {
    fill(255);
    drawingContext.shadowColor = color(255);
    if (this.hovered(mPos)) {
      fill(170);
      drawingContext.shadowColor = color(170);
    }

    if (mouseIsPressed) {
      if (!this.hovered(mPos)) {
        this.lock = true;
      } else if (!this.lock) {
        this.f();
        this.lock = true;
      }
    } else {
      this.lock = false;
    }
  }

  hovered(mPos) {
    let xBounds = this.x + this.w / 2 > mPos.x && this.x - this.w / 2 < mPos.x;
    let yBounds = this.y + this.h / 2 > mPos.y && this.y - this.h / 2 < mPos.y;

    return xBounds && yBounds;
  }
}
