import Post from "./post";

export default class VideoPost extends Post {
  constructor(...args) {
    super(...args);
  }

  get postHTMLElement() {
    const { el, geoEl } = super.postHTMLElement;
    const videoEl = document.createElement("video");
    videoEl.classList.add("video-post");
    videoEl.controls = true;
    videoEl.src = URL.createObjectURL(this.data);
    el.insertBefore(videoEl, geoEl);
    return el;
  }
}
