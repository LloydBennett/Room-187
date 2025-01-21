import Create from "../utils/create";

export default class Components {
  constructor({ elements }) {
    this.selectors = { ...elements }
    Components.prototype.create = Create
    this.create()
  }
}