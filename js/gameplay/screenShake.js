class ScreenShake {
  constructor() {
    this.amplitude = 0;
    this.v = createVector(0, 0);
  }

  update() {
    if (this.amplitude > 0) {
      this.amplitude -= 0.1;
    } else {
      return;
    }

    this.v.x = random(-1, 1);
    this.v.y = random(-1, 1);
    this.v.setMag(this.amplitude);
    translate(this.v);
  }

  add(n) {
    this.amplitude += n;
  }
}
