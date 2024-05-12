import RecMediaUI from "./rec-media-ui";

export default class RecVideoUI extends RecMediaUI {
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
    const mutedVideoHTMLElement =
      this.UIHTMLElement.querySelector(".video-stream");
    return {
      record: recBtn,
      stop: stopBtn,
      duration: durationHTMLElement,
      video: mutedVideoHTMLElement,
    };
  }
}
