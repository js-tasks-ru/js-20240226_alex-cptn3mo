import { default as SortableTableV1 } from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableV1 {
  defaultSortField = "title";
  defaultOrder = "asc";

  constructor(headersConfig, { data = [], sorted = {} } = {}) {
    super(headersConfig, data);

    this.sorted = sorted;

    this.createEvenListeners();
    this.sort(this.defaultSortField, this.defaultOrder);
  }

  onHeaderPointerDown = (e) => {
    const columnElement = e.target.closest("[data-sortable='true']");

    if (!columnElement) {
      return;
    }

    const orderValue = columnElement.dataset.order === "desc" ? "asc" : "desc";
    const columnId = columnElement.dataset.id;

    super.sort(columnId, orderValue);
  };

  createEvenListeners() {
    this.subElements.header.addEventListener(
      "pointerdown",
      this.onHeaderPointerDown
    );
  }

  destroyEventListeners() {
    this.subElements.header.removeEventListener(
      "pointerdown",
      this.onHeaderPointerDown
    );
  }

  destroy() {
    super.destroy();
    this.destroyEventListeners();
  }
}
