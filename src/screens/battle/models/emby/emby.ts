import { Monster } from '@pokemon-game/models/monster';
import { Sprite } from '@pokemon-game/models/sprite';

import embySpriteImg from '@pokemon-game/assets/images/emby.sprite.png';
import { FireballAttack, TackleAttack } from '@pokemon-game/models/attack';

const embySpriteImage = new Image();
embySpriteImage.src = embySpriteImg;

class Emby extends Monster {
  displayName = 'Emby';

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

    this.attacks = [new TackleAttack(this), new FireballAttack(this)];
  }
}

export { Emby };
