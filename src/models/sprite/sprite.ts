class Sprite {
  spritesheet: HTMLImageElement;
  x: number;
  y: number;
  framesCount: number;
  frameIndex: number = 0;
  frameUpdateDelta: number = 0;
  isAnimating: boolean;
  fps: number;
  opacity: number;
  rotation: number;

  constructor({
    spritesheet,
    x = 0,
    y = 0,
    framesCount = 1,
    fps = 0,
    isAnimating = false,
    opacity = 1,
    rotation = 0,
  }: {
    spritesheet: HTMLImageElement;
    x?: number;
    y?: number;
    framesCount?: number;
    fps?: number;
    isAnimating?: boolean;
    opacity?: number;
    rotation?: number;
  }) {
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.framesCount = framesCount;
    this.fps = fps;
    this.isAnimating = isAnimating;
    this.opacity = opacity;
    this.rotation = rotation;
  }

  get frameWidth() {
    return this.spritesheet.width / this.framesCount;
  }

  draw(context: CanvasRenderingContext2D) {
    const spriteCenterX = this.x + this.frameWidth / 2;
    const spriteCenterY = this.y + this.spritesheet.height / 2;

    context.save();
    context.translate(spriteCenterX, spriteCenterY);
    context.rotate(this.rotation);
    context.translate(-spriteCenterX, -spriteCenterY);
    context.globalAlpha = this.opacity;
    context.drawImage(
      this.spritesheet,
      this.frameIndex * this.frameWidth,
      0,
      this.frameWidth,
      this.spritesheet.height,
      this.x,
      this.y,
      this.frameWidth,
      this.spritesheet.height
    );
    context.restore();
  }

  update(timeDelta: number) {
    if (!this.isAnimating) return;

    this.frameUpdateDelta += timeDelta;

    if (this.frameUpdateDelta > 1000 / this.fps) {
      this.frameIndex = (this.frameIndex + 1) % this.framesCount;
      this.frameUpdateDelta = 0;
    }
  }

  public startMoving() {
    this.isAnimating = true;
  }

  public stopMoving() {
    this.isAnimating = false;

    this.frameIndex = 0;
    this.frameUpdateDelta = 0;
  }

  public setSpritesheet(spritesheet: HTMLImageElement) {
    if (spritesheet === this.spritesheet) return;

    this.spritesheet = spritesheet;

    this.frameIndex = 0;
    this.frameUpdateDelta = 0;
  }
}

export { Sprite };
