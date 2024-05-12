/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/post.js
class Post {
  constructor(element, data) {
    this.element = document.querySelector(element);
    this.data = data;
    this.time = new Date(Date.now()).toLocaleString("ru-RU");
    this.geolocation = undefined;
  }
  get postHTMLElement() {
    const el = document.createElement("div");
    const geoEl = document.createElement("p");
    geoEl.textContent = `[${this.geolocation.latitude}, ${this.geolocation.longitude}]`;
    geoEl.classList.add("geo");
    const date = document.createElement("p");
    date.textContent = this.time;
    date.classList.add("post-date");
    el.insertAdjacentElement("beforeend", date);
    el.insertAdjacentElement("beforeend", geoEl);
    el.classList.add("post");
    return {
      el: el,
      geoEl: geoEl
    };
  }
  render() {
    this.element.insertAdjacentElement("beforeend", this.postHTMLElement);
    console.log(this.postHTMLElement);
    // this.postHTMLElement.scrollIntoView();
  }
}
;// CONCATENATED MODULE: ./src/js/text-post.js

class TextPost extends Post {
  constructor(...args) {
    super(...args);
  }
  get postHTMLElement() {
    const {
      el,
      geoEl
    } = super.postHTMLElement;
    const textEl = document.createElement("p");
    textEl.classList.add("post-data");
    textEl.textContent = this.data;
    el.insertBefore(textEl, geoEl);
    return el;
  }
}
;// CONCATENATED MODULE: ./src/js/audio-post.js

class AudioPost extends Post {
  constructor(...args) {
    super(...args);
  }
  get postHTMLElement() {
    const {
      el,
      geoEl
    } = super.postHTMLElement;
    const audioEl = document.createElement("audio");
    audioEl.classList.add("audio-post");
    audioEl.controls = true;
    audioEl.src = URL.createObjectURL(this.data);
    el.insertBefore(audioEl, geoEl);
    return el;
  }
}
;// CONCATENATED MODULE: ./src/js/video-post.js

class VideoPost extends Post {
  constructor(...args) {
    super(...args);
  }
  get postHTMLElement() {
    const {
      el,
      geoEl
    } = super.postHTMLElement;
    const videoEl = document.createElement("video");
    videoEl.classList.add("video-post");
    videoEl.controls = true;
    videoEl.src = URL.createObjectURL(this.data);
    el.insertBefore(videoEl, geoEl);
    return el;
  }
}
;// CONCATENATED MODULE: ./src/js/form.js
class Form {
  constructor(element) {
    this.element = document.querySelector(element);
    this._formElement = this.formElement;
  }
  get formElement() {
    if (this._formElement) {
      return this._formElement;
    }
    this.pattern = "[\\[]?([0-9]+.[0-9]+),[\\s]?([\\-−]?[0-9]+.[0-9]+)[\\]]?";
    const form = document.createElement("form");
    form.noValidate = true;
    form.id = "not-geolocation";
    form.innerHTML = `
      <p>Что-то пошло не так</p>
      <p>Не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную</p>
      <p>Широта и дологота через запятую</p>
      <input name="input" form="not-geolocation" type="text" class="nongeo__input" pattern="${this.pattern}" required>
    `;
    this.element.insertAdjacentElement("beforeend", form);
    this._formElement = form;
    return form;
  }
  getValidatedData(data) {
    const d = data.match(new RegExp(this.pattern));
    return {
      latitude: d[1],
      longitude: d[2]
    };
  }
  get isValid() {
    const input = this.formElement.elements.input;
    if (!this.formElement.checkValidity()) {
      if (input.validity.valueMissing) {
        input.setCustomValidity("Координаты должны быть введены");
      } else if (input.validity.patternMismatch) {
        input.setCustomValidity("Координаты введены в неверном формате");
      }
      this.formElement.reportValidity();
      input.setCustomValidity("");
      return false;
    }
    return true;
  }
}
;// CONCATENATED MODULE: ./src/js/rec-media-ui.js
class RecMediaUI {
  constructor(element, mediaFormat) {
    this.element = document.querySelector(element);
    this.mediaFormat = mediaFormat;
    this._UIHTMLElement = undefined;
    this.media = undefined;
  }
  get UIHTMLElement() {
    if (this._UIHTMLElement) {
      return this._UIHTMLElement;
    }
    const el = document.createElement("div");
    el.classList.add("mediaui");
    el.innerHTML = `
      <div class="uicontrols">
        <i class="fa fa-play-circle" aria-hidden="true"></i>
        <span class="duration">00:00</span>
        <i class="fa fa-stop-circle" aria-hidden="true"></i>
      </div>
    `;
    this._UIHTMLElement = el;
    return this._UIHTMLElement;
  }
  render() {
    this.element.insertAdjacentElement("beforeend", this.UIHTMLElement);
    const recBtn = this.UIHTMLElement.querySelector(".fa-play-circle");
    const stopBtn = this.UIHTMLElement.querySelector(".fa-stop-circle");
    const durationHTMLElement = this.UIHTMLElement.querySelector(".duration");
    return {
      record: recBtn,
      stop: stopBtn,
      duration: durationHTMLElement
    };
  }
}
;// CONCATENATED MODULE: ./src/js/rec-video-ui.js

class RecVideoUI extends RecMediaUI {
  constructor(...args) {
    super(...args);
  }
  get UIHTMLElement() {
    if (this._UIHTMLElement) {
      return this._UIHTMLElement;
    }
    const el = document.createElement("div");
    el.classList.add("videoui");
    el.innerHTML = `
      <video class="video-stream" muted></video>
      <div class="uicontrols">
        <i class="fa fa-play-circle" aria-hidden="true"></i>
        <span class="duration">00:00</span>
        <i class="fa fa-stop-circle" aria-hidden="true"></i>
      </div>
    `;
    this._UIHTMLElement = el;
    return this._UIHTMLElement;
  }
  render() {
    this.element.insertAdjacentElement("beforeend", this.UIHTMLElement);
    const recBtn = this.UIHTMLElement.querySelector(".fa-play-circle");
    const stopBtn = this.UIHTMLElement.querySelector(".fa-stop-circle");
    const durationHTMLElement = this.UIHTMLElement.querySelector(".duration");
    const mutedVideoHTMLElement = this.UIHTMLElement.querySelector(".video-stream");
    return {
      record: recBtn,
      stop: stopBtn,
      duration: durationHTMLElement,
      video: mutedVideoHTMLElement
    };
  }
}
;// CONCATENATED MODULE: ./src/js/utils.js
function secToStr(s) {
  let m = Math.trunc(s / 60) + "";
  s = s % 60 + "";
  return m.padStart(2, 0) + ":" + s.padStart(2, 0);
}
function strToSec(str) {
  const arr = str.split(":");
  const m = parseInt(arr[0]);
  const s = parseInt(arr[1]);
  return m * 60 + s;
}
;// CONCATENATED MODULE: ./src/js/timeline-app.js







class Timeline {
  constructor(element) {
    this.element = document.querySelector(element);
    this.element.innerHTML = `
    <div class="timeline-block"></div>
    <div class="actions">
      <form id="input">
        <input name="input" form="input" type="text" class="input__text" required>
      </form>
        <i class="fa fa-microphone" aria-hidden="true"></i>
        <i class="fa fa-video-camera" aria-hidden="true"></i>
    </div>

    `;
    this.actionsElement = this.element.querySelector(".actions");
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.actionsElement.addEventListener("submit", this.onSubmit);
    this.actionsElement.addEventListener("click", this.onClick);
  }
  onSubmit(e) {
    e.preventDefault();
    const form = this.actionsElement.querySelector("#input");
    const formData = new FormData(form);
    const data = formData.get("input");
    const post = new TextPost(".timeline-block", data);
    this.createPost(post);
    form.reset();
  }
  onClick(e) {
    const audioBtn = this.actionsElement.querySelector(".fa-microphone");
    const videoBtn = this.actionsElement.querySelector(".fa-video-camera");
    if (e.target === audioBtn) {
      this.onClickAudioBtn();
    } else if (e.target === videoBtn) {
      this.onClickVideoBtn();
    }
  }
  onClickAudioBtn() {
    if (!navigator.mediaDevices) {
      alert("Ваш браузер не поддерживает данный функционал");
    }
    //* немного не по ТЗ, но так интереснее
    this.element.style.display = "none";
    const recUI = new RecMediaUI("body");
    const {
      record,
      stop,
      duration
    } = recUI.render();
    record.addEventListener("click", async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        });
        const recorder = new MediaRecorder(stream);
        const chanks = [];
        const interval = setInterval(() => {
          duration.textContent = secToStr(strToSec(duration.textContent) + 1);
        }, 1000);
        recorder.addEventListener("start", () => {
          record.style.color = "red";
        });
        recorder.addEventListener("dataavailable", e => chanks.push(e.data));
        recorder.addEventListener("stop", () => {
          const blob = new Blob(chanks);
          const post = new AudioPost(".timeline-block", blob);
          this.createPost(post);
        });
        recorder.start();
        stop.addEventListener("click", () => {
          recorder.stop();
          stream.getTracks().forEach(track => track.stop());
          clearInterval(interval);
          recUI.UIHTMLElement.remove();
          this.element.style.display = "block";
        });
      } catch (e) {
        alert("Нет прав на доступ к микрофону");
      }
    });
    stop.addEventListener("click", () => {
      recUI.UIHTMLElement.remove();
      this.element.style.display = "block";
    });
  }
  onClickVideoBtn() {
    if (!navigator.mediaDevices) {
      alert("Ваш браузер не поддерживает данный функционал");
    }
    this.element.style.display = "none";
    const recUI = new RecVideoUI("body");
    const {
      record,
      stop,
      duration,
      video
    } = recUI.render();
    (async () => {
      console.log("run");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      video.srcObject = stream;
      video.addEventListener("canplay", () => {
        video.play();
      });
      record.addEventListener("click", async () => {
        const recorder = new MediaRecorder(stream);
        const chanks = [];
        const interval = setInterval(() => {
          duration.textContent = secToStr(strToSec(duration.textContent) + 1);
        }, 1000);
        recorder.addEventListener("start", () => {
          record.style.color = "red";
        });
        recorder.addEventListener("dataavailable", e => chanks.push(e.data));
        recorder.addEventListener("stop", () => {
          const blob = new Blob(chanks);
          const post = new VideoPost(".timeline-block", blob);
          this.createPost(post);
        });
        recorder.start();
        stop.addEventListener("click", () => {
          recorder.stop();
          stream.getTracks().forEach(track => track.stop());
          clearInterval(interval);
          recUI.UIHTMLElement.remove();
          this.element.style.display = "block";
        });
      });
      stop.addEventListener("click", () => {
        recUI.UIHTMLElement.remove();
        this.element.style.display = "block";
      });
    })();
  }
  createPost(post) {
    if (!navigator.geolocation) {
      this.onNotGeolocation(post);
      return;
    }
    window.navigator.geolocation.getCurrentPosition(data => {
      post.geolocation = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      };
      post.render();
    },
    // eslint-disable-next-line prettier/prettier
    () => this.onNotGeolocation(post));
  }
  onNotGeolocation(post) {
    this.actionsElement.style.display = "none";
    const form = new Form("body");
    form.formElement.addEventListener("submit", e => {
      e.preventDefault();
      if (form.isValid) {
        const input = form.formElement.elements.input;
        const settedGeolocation = form.getValidatedData(input.value);
        post.geolocation = settedGeolocation;
        form.formElement.remove();
        post.render();
        this.actionsElement.style.display = "flex";
      }
    });
  }
  run() {
    this.actionsElement.addEventListener("submit", this.onSubmit);
    this.actionsElement.addEventListener("click", this.onClick);
  }
}
;// CONCATENATED MODULE: ./src/index.js


new Timeline(".timeline").run();
/******/ })()
;