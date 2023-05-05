class Collision {
  x: number;
  y: number;
  width: number;
  height: number;
  offsetX: number = 0;
  offsetY: number = 0;

  constructor({
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get mapX() {
    return this.x + this.offsetX;
  }
  get mapY() {
    return this.y + this.offsetY;
  }

  draw(context: CanvasRenderingContext2D) {
    this.drawDebugSquare(context);
    this.drawDebugInfo(context);
  }

  private drawDebugSquare(context: CanvasRenderingContext2D) {
    context.fillStyle = 'red';
    context.strokeStyle = 'red';

    context.save();
    context.globalAlpha = 0.5;
    context.fillRect(this.mapX, this.mapY, this.width, this.height);
    context.restore();

    context.strokeRect(this.mapX, this.mapY, this.width, this.height);
  }

  private drawDebugInfo(context: CanvasRenderingContext2D) {
    context.fillStyle = '#fff';
    context.font = '10px monospace';
    context.fillText(`x:${this.x}`, this.mapX + 5, this.mapY + 10);
    context.fillText(`y:${this.y}`, this.mapX + 5, this.mapY + 10 * 2);
    context.fillText(`mx:${this.mapX}`, this.mapX + 5, this.mapY + 10 * 3);
    context.fillText(`my:${this.mapY}`, this.mapX + 5, this.mapY + 10 * 4);
  }
}

export { Collision };
