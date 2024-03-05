class Sounds {
  constructor() {
    this.musicStart = loadSound("Assets/MusicStart.wav");
    this.musicLoop = loadSound("Assets/MusicLoop.wav");

    this.destruction = loadSound("Assets/Destruction.wav");

    this.musicStart.setVolume(0.4);
    this.musicLoop.setVolume(0.4);
  }

  playMusic() {
    let time = this.musicStart.duration();
    this.musicStart.addCue(time - 0.01, () => {
      this.musicLoop.loop();
    });
    this.musicStart.play();
  }

  stopMusic() {
    print("hello");
    this.musicStart.stop();
    this.musicLoop.stop();
  }

  playSound(s) {
    switch (s) {
      case 0:
        this.destruction.play();
        break;
    }
  }
}
