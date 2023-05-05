class Boundary {
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

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'red';
    context.strokeStyle = 'red';

    context.save();
    context.globalAlpha = 0.5;
    context.fillRect(
      this.x + this.offsetX,
      this.y + this.offsetY,
      this.width,
      this.height
    );
    context.restore();

    context.strokeRect(
      this.x + this.offsetX,
      this.y + this.offsetY,
      this.width,
      this.height
    );
  }
}

export { Boundary };
