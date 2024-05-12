import Post from "./post";

export default class AudioPost extends Post {
  constructor(...args) {
    super(...args);
  }

  get postHTMLElement() {
    const { el, geoEl } = super.postHTMLElement;
    const audioEl = document.createElement("audio");
    audioEl.classList.add("audio-post");
    audioEl.controls = true;
    audioEl.src = URL.createObjectURL(this.data);
    el.insertBefore(audioEl, geoEl);
    return el;
  }
}
