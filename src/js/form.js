export default class Form {
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
      longitude: d[2],
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
