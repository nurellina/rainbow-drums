class rainbowSound {
  constructor() {
    this.drums = document.querySelectorAll(".drum");
    this.playButton = document.querySelector(".play");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.volumeSlider = document.querySelector(".volume-slider");
    this.crashSound = new Audio("sounds/crash.mp3");
    this.kickBassSound = new Audio("sounds/kick-bass.mp3");
    this.snareSound = new Audio("sounds/snare.mp3");
    this.tom1Sound = new Audio("sounds/tom-1.mp3");
    this.tom2Sound = new Audio("sounds/tom-2.mp3");
    this.tom3Sound = new Audio("sounds/tom-3.mp3");
    this.tom4Sound = new Audio("sounds/tom-4.mp3");
    this.index = 0;
    this.bpm = 150;
    this.soundOn = false;
    this.volume = 0.2;
  }
  activeButton() {
    this.classList.toggle("pressed");
  }
  loop() {
    let step = this.index % 8;
    const buttonsPlaying = document.querySelectorAll(`.d${step}`);
    buttonsPlaying.forEach((button) => {
      button.style.animation = `soundPlaying 0.5s`;
      if (button.classList.contains("pressed")) {
        if (button.classList.contains("crash")) {
          this.crashSound.currentTime = 0;
          this.crashSound.volume = this.volume;
          this.crashSound.play();
        }
        if (button.classList.contains("kick-bass")) {
          this.kickBassSound.currentTime = 0;
          this.kickBassSound.volume = this.volume;
          this.kickBassSound.play();
        }
        if (button.classList.contains("snare")) {
          this.snareSound.currentTime = 0;
          this.snareSound.volume = this.volume;
          this.snareSound.play();
        }
        if (button.classList.contains("tom-1")) {
          this.tom1Sound.currentTime = 0;
          this.tom1Sound.volume = this.volume;
          this.tom1Sound.play();
        }
        if (button.classList.contains("tom-2")) {
          this.tom2Sound.currentTime = 0;
          this.tom2Sound.volume = this.volume;
          this.tom2Sound.play();
        }
        if (button.classList.contains("tom-3")) {
          this.tom3Sound.currentTime = 0;
          this.tom3Sound.volume = this.volume;
          this.tom3Sound.play();
        }
        if (button.classList.contains("tom-4")) {
          this.tom4Sound.currentTime = 0;
          this.tom4Sound.volume = this.volume;
          this.tom4Sound.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (this.soundOn) {
      clearInterval(this.soundOn);
      this.soundOn = false;
    } else {
      this.soundOn = setInterval(() => {
        this.loop();
      }, interval);
    }
  }
  updatePlayButton() {
    if (this.soundOn) {
      this.playButton.classList.remove("active");
      this.playButton.classList.remove("fa-pause-circle");
      this.playButton.classList.add("fa-play-circle");
    } else {
      this.playButton.classList.add("active");
      this.playButton.classList.remove("fa-play-circle");
      this.playButton.classList.add("fa-pause-circle");
    }
  }
  updateTempo(e) {
    const tempoText = document.querySelector(".tempo-value");

    tempoText.innerText = e.target.value;
  }
  updateVolume(e) {
    const tempoText = document.querySelector(".volume-value");

    tempoText.innerText = e.target.value * 100 + "%";
  }
  changeTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.soundOn);
    this.soundOn = false;
    const playButton = document.querySelector(".play");
    if (playButton.classList.contains("active")) {
      this.start();
    }
  }
  changeVolume(e) {
    this.volume = e.target.value;
    clearInterval(this.soundOn);
    this.soundOn = false;
    const playButton = document.querySelector(".play");
    if (playButton.classList.contains("active")) {
      this.start();
    }
  }
}
const drumKit = new rainbowSound();

drumKit.drums.forEach((drum) => {
  drum.addEventListener("click", drumKit.activeButton);
  drum.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
drumKit.playButton.addEventListener("click", function () {
  drumKit.updatePlayButton();
  drumKit.start();
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.updateTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.changeTempo(e);
});
drumKit.volumeSlider.addEventListener("input", function (e) {
  drumKit.updateVolume(e);
});
drumKit.volumeSlider.addEventListener("change", function (e) {
  drumKit.changeVolume(e);
});
