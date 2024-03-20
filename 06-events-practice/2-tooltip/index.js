class Tooltip {
  static instance;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;

    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createTemplate() {
    return `<div class="tooltip"></div>`;
  }

  initialize() {
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("pointerover", this.onPointerOver);
    document.addEventListener("pointerout", this.onPointerOut);
  }

  onPointerOver = (event) => {
    const element = event.target.closest("[data-tooltip]");

    if (element) {
      this.render(element.dataset.tooltip);
      this.moveTooltip(event);
      document.addEventListener("pointermove", this.onPointerMove);
    }
  };

  onPointerMove = (event) => {
    this.moveTooltip(event);
  };

  onPointerOut = () => {
    this.removeTooltip();
  };

  render(tooltip) {
    this.element.innerHTML = tooltip;
    document.body.append(this.element);
  }

  moveTooltip(event) {
    const shift = 10;

    this.element.style.left = event.clientX + shift + "px";
    this.element.style.top = event.clientY + shift + "px";
  }

  removeTooltip() {
    this.element.remove();
    document.removeEventListener("pointermove", this.onPointerMove);
  }

  destroyEventListeners() {
    document.removeEventListener("pointerover", this.onPointerOver);
    document.removeEventListener("pointerout", this.onPointerOut);
  }

  destroy() {
    this.removeTooltip();
    this.destroyEventListeners();
    Tooltip.instance = null;
  }
}

export default Tooltip;
