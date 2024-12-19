class Button {
  constructor(x, y, size, t, f) {
    this.f = f; //function
    this.x = x;
    this.y = y;
    this.t = t; //string to be displayed

    this.h = size; //height
    this.lock = false;

    //need to do this to get the proper value from the textSize function
    textSize(size); //sets text size so that the characters are a specific height
    this.w = textWidth(this.t);

  }

  draw() {
    textSize(this.h); //sets text size so that the characters are a specific height

    //offset the text by -7 in its height to center it on the bounding box
    text(this.t, this.x, this.y - 7);

    //uncomment to see bounding box
    /*
    rectMode(CENTER);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    */
  }

  processMouse(mPos) {
    fill(255);
    drawingContext.shadowColor = color(255); //change the color of the glow to match the color of the text
    if (this.hovered(mPos)) {
      fill(170);
      drawingContext.shadowColor = color(170); //change the color of the glow to match the color of the text
    }

    if (mouseIsPressed) {
      if (!this.hovered(mPos)) {
        this.lock = true;
      } else if (!this.lock) {
        this.f(); //execute funcion when the button is clicked
        this.lock = true;
      }
    } else {
      this.lock = false;
    }
  }

  hovered(mPos) {
    let xBounds = this.x + this.w / 2 > mPos.x && this.x - this.w / 2 < mPos.x;
    let yBounds = this.y + this.h / 2 > mPos.y && this.y - this.h / 2 < mPos.y;

    return xBounds && yBounds; //return true if the mouse is within the button's bounding box
  }
}
