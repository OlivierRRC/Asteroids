class Collisions {
  constructor(objects) {
    this.objects = objects;
  }

  check() {
    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < this.objects.length; j++) {
        if (this.objects[i] != this.objects[j]) {
          let distance = this.objects[i].size / 2 + this.objects[j].size / 2;
          if (
            this.objects[i].position.dist(this.objects[j].position) < distance
          ) {
            this.objects[i].collide(i);
            this.objects[j].collide(j);
          }
        }
      }
    }
  }
}
