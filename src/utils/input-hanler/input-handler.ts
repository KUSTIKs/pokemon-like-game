class InputHandler {
  keys = new Set<string>();
  lastKey: string | null = null;

  constructor(private element = window) {
    this.init();
  }

  private handleKeydown = (event: KeyboardEvent) => {
    this.keys.add(event.key);
    this.lastKey = event.key;
  };
  private handleKeyup = (event: KeyboardEvent) => {
    this.keys.delete(event.key);
  };

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
