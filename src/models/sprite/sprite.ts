class Sprite {
  spritesheet: HTMLImageElement;
  x: number;
  y: number;
  framesCount: number;
  frameIndex: number = 0;
  frameUpdateDelta: number = 0;
  isMoving: boolean = false;
  fps: number;

  constructor({
    spritesheet,
    x = 0,
    y = 0,
    framesCount = 1,
    fps = 0,
  }: {
    spritesheet: HTMLImageElement;
    x?: number;
    y?: number;
    framesCount?: number;
    fps?: number;
  }) {
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.framesCount = framesCount;
    this.fps = fps;
  }

  get frameSize() {
    return this.spritesheet.width / this.framesCount;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.spritesheet,
      this.frameIndex * this.frameSize,
      0,
      this.frameSize,
      this.spritesheet.height,
      this.x,
      this.y,
      this.frameSize,
      this.spritesheet.height
    );
  }

  update(timeDelta: number) {
    if (!this.isMoving) return;

    this.frameUpdateDelta += timeDelta;

    if (this.frameUpdateDelta > 1000 / this.fps) {
      this.frameIndex = (this.frameIndex + 1) % this.framesCount;
      this.frameUpdateDelta = 0;
    }
  }

  public startMoving() {
    this.isMoving = true;
  }

  public stopMoving() {
    this.isMoving = false;

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
