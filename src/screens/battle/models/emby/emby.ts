import { Enemy } from '@pokemon-game/models/enemy';
import { Sprite } from '@pokemon-game/models/sprite';

import embySpriteImg from '@pokemon-game/assets/images/emby.sprite.png';

const embySpriteImage = new Image();
embySpriteImage.src = embySpriteImg;

class Emby extends Enemy {
  constructor({ x, y }: { x: number; y: number }) {
    const sprite = new Sprite({
      spritesheet: embySpriteImage,
      fps: 4,
      framesCount: 4,
      x,
      y,
      isAnimating: true,
    });

    super({
      sprite,
    });
  }
}

export { Emby };
