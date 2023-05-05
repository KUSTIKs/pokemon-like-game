import { Position } from '@pokemon-game/types/common';

class Sprite {
  image: HTMLImageElement;
  x: number;
  y: number;

  constructor({
    image,
    x = 0,
    y = 0,
  }: {
    image: HTMLImageElement;
    x?: number;
    y?: number;
  }) {
    this.image = image;
    this.x = x;
    this.y = y;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y);
  }
}

export { Sprite };
