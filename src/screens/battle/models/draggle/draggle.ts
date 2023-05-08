import { Monster } from '@pokemon-game/models/monster';
import { Sprite } from '@pokemon-game/models/sprite';

import draggleSpriteImg from '@pokemon-game/assets/images/draggle.sprite.png';
import { FireballAttack, TackleAttack } from '@pokemon-game/models/attack';

const draggleSpriteImage = new Image();
draggleSpriteImage.src = draggleSpriteImg;

class Draggle extends Monster {
  displayName = 'Draggle';

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

    this.attacks = [new TackleAttack(this), new FireballAttack(this)];
  }
}

export { Draggle };
