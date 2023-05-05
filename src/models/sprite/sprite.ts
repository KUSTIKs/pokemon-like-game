class Sprite {
  image: HTMLImageElement;
  x: number;
  y: number;
  framesCount: number;

  constructor({
    image,
    x = 0,
    y = 0,
    framesCount = 1,
  }: {
    image: HTMLImageElement;
    x?: number;
    y?: number;
    framesCount?: number;
  }) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.framesCount = framesCount;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.framesCount,
      this.image.height,
      this.x,
      this.y,
      this.image.width / this.framesCount,
      this.image.height
    );
  }
}

export { Sprite };
