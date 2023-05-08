import { Enemy } from '@pokemon-game/models/enemy';
import { Sprite } from '@pokemon-game/models/sprite';

import draggleSpriteImg from '@pokemon-game/assets/images/draggle.sprite.png';

const draggleSpriteImage = new Image();
draggleSpriteImage.src = draggleSpriteImg;

class Draggle extends Enemy {
  constructor({ x, y }: { x: number; y: number }) {
    const sprite = new Sprite({
      spritesheet: draggleSpriteImage,
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

export { Draggle };
