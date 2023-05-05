class InputHandler {
  keys: string[] = [];

  constructor(private element = window) {
    this.init();
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (this.keys.includes(event.key)) return;
    this.keys.push(event.key);
  };
  private handleKeyup = (event: KeyboardEvent) => {
    if (!this.keys.includes(event.key)) return;
    this.keys.splice(this.keys.indexOf(event.key), 1);
  };

  get lastKey() {
    return this.keys.at(-1) ?? null;
  }

  private init() {
    this.element.addEventListener('keydown', this.handleKeydown);
    this.element.addEventListener('keyup', this.handleKeyup);
  }

  destroy() {
    this.element.removeEventListener('keydown', this.handleKeydown);
    this.element.removeEventListener('keyup', this.handleKeyup);
  }
}

export { InputHandler };
