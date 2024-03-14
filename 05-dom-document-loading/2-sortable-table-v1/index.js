export default class SortableTable {
  element;
  headerConfig;
  data;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
  }

  get header() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerConfig.map((item) => this.getHeaderRow(item)).join("")}
      </div>
    `;
  }

  get body() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.data.map((item) => this.getRow(item)).join("")}
      </div>
    `;
  }

  get template() {
    return `
      <div class="sortable-table">
        ${this.header}
        ${this.body}
      </div>
    `;
  }

  getHeaderRow({ id, title, sortable }) {
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="">
        <span>${title}</span>
      </div>
    `;
  }

  getRow(item) {
    return `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${this.headerConfig
          .map(({ id, template }) => {
            return template
              ? template(item[id])
              : `<div class="sortable-table__cell">${item[id]}</div>`;
          })
          .join("")}
      </a>
    `;
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll("[data-element]");

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll(
      ".sortable-table__cell[data-id]"
    );

    for (const column of allColumns) {
      column.dataset.order = "";
    }

    this.subElements.body.innerHTML = sortedData
      .map((item) => this.getRow(item))
      .join("");
  }

  sortData(field, order) {
    const sortType = this.headerConfig.find(
      (item) => item.id === field
    ).sortType;
    const direction = order === "asc" ? 1 : -1;

    return this.data.sort((a, b) => {
      if (sortType === "number") {
        return direction * (a[field] - b[field]);
      }

      return direction * a[field].localeCompare(b[field], "ru");
    });
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
