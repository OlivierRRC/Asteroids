class Sounds {
  constructor(sfx) {
    this.sfxVolume = 0.2;
    this.musicVolume = 0.1;

    this.musicStart = sfx[0];
    this.musicLoop = sfx[1];

    this.hit = sfx[2];
    this.explosion = sfx[3];
    this.shoot = sfx[4];
    this.teleport = sfx[5];
    this.engine = sfx[6];
    this.saucer = sfx[7];

    this.musicStart.setVolume(this.musicVolume);
    this.musicLoop.setVolume(this.musicVolume);

    this.hit.setVolume(this.sfxVolume);
    this.explosion.setVolume(this.sfxVolume);
    this.shoot.setVolume(this.sfxVolume);
    this.teleport.setVolume(this.sfxVolume);
    this.engine.setVolume(this.sfxVolume);
    this.saucer.setVolume(0);
  }

  //plays the start of the track and switches over to playing the loop afterwards
  //also loops the saucer effect at 0 volume for later
  playMusic() {
    this.musicStart.setVolume(this.musicVolume);
    this.musicLoop.setVolume(this.musicVolume);
    this.saucer.loop();
    this.musicStart.addCue(this.musicStart.duration() - 0.01, () => {
      this.musicLoop.loop();
    });
    this.musicStart.play();
  }

  //stop playing the music when the game is over
  //stops other looping sounds if they happen to be playing
  stopMusic() {
    this.musicStart.stop();
    this.musicLoop.stop();
    this.engine.stop();
    this.saucer.stop();
  }

  //start looping the thruster noise
  //will only happen once
  startThrust() {
    if (!this.engine.isPlaying()) {
      this.engine.loop();
    }
  }

  //stop playing the thruster noise
  //will only happen once
  stopThrust() {
    if (this.engine.isPlaying()) {
      this.engine.pause();
    }
  }

  //fades out background music and fades in saucer sfx
  saucerEnter() {
    this.musicStart.setVolume(0, 1);
    this.musicLoop.setVolume(0, 1);

    this.saucer.setVolume(this.sfxVolume, 1);
  }

  //fades in background music and fades out saucer sfx
  saucerExit() {
    this.musicStart.setVolume(this.musicVolume, 1);
    this.musicLoop.setVolume(this.musicVolume, 1);

    this.saucer.setVolume(0, 1);
  }

  //could have probably made this individual functions
  //plays sounds based on a provided key
  playSound(s) {
    switch (s) {
      case "hit":
        this.explosion.play();
        this.hit.play();
        break;
      case "shoot":
        this.shoot.play();
        break;
      case "teleport":
        this.teleport.play();
        break;
    }
  }
}
