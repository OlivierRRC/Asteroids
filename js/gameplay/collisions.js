class Collisions {
  constructor(objects) {
    this.objects = objects;
  }

  check() {
    for (let i = 0; i < this.objects.length; i++) {
      for (let j = 0; j < this.objects.length; j++) {
        if (this.objects[i] != this.objects[j]) {
          let distance = this.objects[i].size / 2 + this.objects[j].size / 2;
          if (
            this.objects[i].position.dist(this.objects[j].position) < distance
          ) {
            let a = this.objects[i];
            let b = this.objects[j];

            if (a instanceof Asteroid && b instanceof Asteroid) {
              continue;
            }

            if (a instanceof Ship && b instanceof Bullet) {
              continue;
            }
            if (a instanceof Bullet && b instanceof Ship) {
              continue;
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
