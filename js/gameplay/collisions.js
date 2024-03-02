class Collisions {
  constructor(objects, score) {
    this.objects = objects;
    this.score = score;
  }

  check() {
    for (let i = 0; i < this.objects.length; i++) {
      for (let j = 0; j < this.objects.length; j++) {
        if (this.objects[i] != this.objects[j]) {
          let a = this.objects[i];
          let b = this.objects[j];
          if (a != undefined && b != undefined) {
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

              if (a instanceof Bullet && b instanceof Asteroid) {
                this.addPoints(b);
              }
              if (a instanceof Asteroid && b instanceof Bullet) {
                this.addPoints(a);
              }

              a.collide();
              b.collide();

              //im removing an item uppon collision, this shifts the array thus invalidating the second collision
              //i can fix this by keeping a refference to the objects and removing based on indexOf instead of relying on index
            }
          }
        }
      }
    }
  }

  addPoints(asteroid) {
    switch (asteroid.generation) {
      case 2:
        this.score.score += 20;
        break;
      case 1:
        this.score.score += 50;
        break;
      case 0:
        this.score.score += 100;
        break;
    }
    print(asteroid.generation);
  }
}
