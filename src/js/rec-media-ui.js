export default class RecMediaUI {
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
      duration: durationHTMLElement,
    };
  }
}
