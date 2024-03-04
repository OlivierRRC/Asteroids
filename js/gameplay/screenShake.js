class ScreenShake {
  constructor() {
    this.amplitude = 0;
    this.v = createVector(0, 0);
  }

  update() {
    //makes the amplitude smaller every frame
    if (this.amplitude > 0) {
      this.amplitude -= 0.1;
    } else {
      return; //if the amplitude is smaller than or = 0 do nothing
    }

    //create a random vector every frame
    this.v.x = random(-1, 1);
    this.v.y = random(-1, 1);
    //set the magnitude of the random vector to the desired amplitude
    this.v.setMag(this.amplitude);
    //translate based on the vector
    translate(this.v);
  }

  add(n) {
    //adds to the amplitude
    this.amplitude += n;
  }
}
