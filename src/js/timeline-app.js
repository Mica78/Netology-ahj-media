import TextPost from "./text-post";
import AudioPost from "./audio-post";
import VideoPost from "./video-post";
import Form from "./form";
import RecMediaUI from "./rec-media-ui";
import RecVideoUI from "./rec-video-ui";
import { secToStr, strToSec } from "./utils";

export default class Timeline {
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
    const { record, stop, duration } = recUI.render();
    record.addEventListener("click", async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        const chanks = [];
        const interval = setInterval(() => {
          duration.textContent = secToStr(strToSec(duration.textContent) + 1);
        }, 1000);
        recorder.addEventListener("start", () => {
          record.style.color = "red";
        });
        recorder.addEventListener("dataavailable", (e) => chanks.push(e.data));
        recorder.addEventListener("stop", () => {
          const blob = new Blob(chanks);
          const post = new AudioPost(".timeline-block", blob);
          this.createPost(post);
        });
        recorder.start();
        stop.addEventListener("click", () => {
          recorder.stop();
          stream.getTracks().forEach((track) => track.stop());
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
    const { record, stop, duration, video } = recUI.render();

    (async () => {
      console.log("run");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
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
        recorder.addEventListener("dataavailable", (e) => chanks.push(e.data));
        recorder.addEventListener("stop", () => {
          const blob = new Blob(chanks);
          const post = new VideoPost(".timeline-block", blob);
          this.createPost(post);
        });
        recorder.start();
        stop.addEventListener("click", () => {
          recorder.stop();
          stream.getTracks().forEach((track) => track.stop());
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
    window.navigator.geolocation.getCurrentPosition(
      (data) => {
        post.geolocation = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        };
        post.render();
      },
      // eslint-disable-next-line prettier/prettier
      () => this.onNotGeolocation(post)
    );
  }

  onNotGeolocation(post) {
    this.actionsElement.style.display = "none";
    const form = new Form("body");
    form.formElement.addEventListener("submit", (e) => {
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
