import Post from "./post";

export default class TextPost extends Post {
  constructor(...args) {
    super(...args);
  }

  get postHTMLElement() {
    const { el, geoEl } = super.postHTMLElement;
    const textEl = document.createElement("p");
    textEl.classList.add("post-data");
    textEl.textContent = this.data;
    el.insertBefore(textEl, geoEl);
    return el;
  }
}
