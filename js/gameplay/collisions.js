class Collisions {
  constructor(objects, score, rePopulate, sounds) {
    this.objects = objects;
    this.score = score;
    this.rePopulate = rePopulate; //populate asteroids from game.js
    this.level = 1;
    this.sounds = sounds;
  }

  check() {
    this.asteroids = false;

    for (let i = 0; i < this.objects.length; i++) {
      //check if there are any asteroids in the array
      if (this.objects[i] instanceof Asteroid) {
        this.asteroids = true;
      }
      for (let j = 0; j < this.objects.length; j++) {
        if (this.objects[i] != this.objects[j]) {
          //assign the objects to variables so that if the array length changes, the refferences remain in tact
          let a = this.objects[i];
          let b = this.objects[j];
          if (a != undefined && b != undefined) {
            //this is the distance between two circles that is concidered them touching
            let distance = a.size / 2 + b.size / 2;
            if (a.position.dist(b.position) < distance) {
              //diable collision for these interactions
              if (a instanceof Asteroid && b instanceof Asteroid) {
                continue;
              }
              if (a instanceof Ship && b instanceof Bullet) {
                continue;
              }
              if (a instanceof Bullet && b instanceof Ship) {
                continue;
              }
              if (a instanceof Bullet && b instanceof Bullet) {
                continue;
              }

              //if the ship is being collided with, check if it's invincible
              //if it is, ignore collision
              if (a instanceof Ship) {
                if (a.invincible == true) {
                  continue;
                }
              }
              if (b instanceof Ship) {
                if ((b.invincible = true)) {
                  continue;
                }
              }

              //if a bullet hits an asteroid, add points to the score
              if (a instanceof Bullet && b instanceof Asteroid) {
                this.addPoints(b);
              }
              if (a instanceof Asteroid && b instanceof Bullet) {
                this.addPoints(a);
              }

              //have both the a and b objects run their collide methods
              a.collide();
              b.collide();
            }
          }
        }
      }
    }

    //if there are no asteroids in the array, repopulate it
    if (this.asteroids == false) {
      this.rePopulate();
    }
  }

  //add points depending on the generation of the asteroid (smaller number = smaller asteroid);
  addPoints(asteroid) {
    switch (asteroid.generation) {
      case 2:
        this.score.value += 20;
        break;
      case 1:
        this.score.value += 50;
        break;
      case 0:
        this.score.value += 100;
        break;
    }
  }
}
