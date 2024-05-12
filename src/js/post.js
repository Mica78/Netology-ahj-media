export default class Post {
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
    return { el: el, geoEl: geoEl };
  }

  render() {
    this.element.insertAdjacentElement("beforeend", this.postHTMLElement);
    console.log(this.postHTMLElement);
    // this.postHTMLElement.scrollIntoView();
  }
}
