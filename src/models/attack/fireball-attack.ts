import { gsap } from 'gsap';

import { Enemy } from '../enemy';
import { Sprite } from '../sprite';
import { Attack } from './attack';

import fireballSpriteImg from '@pokemon-game/assets/images/fireball.sprite.png';

const fireballSpriteImage = new Image();
fireballSpriteImage.src = fireballSpriteImg;

class FireballAttack extends Attack {
  static damage = 10;
  fireball: Sprite | null = null;

  constructor() {
    super({
      damage: FireballAttack.damage,
    });
  }

  perform(attacker: Enemy, target: Enemy) {
    attacker.addActiveAttack(this);

    const dx = attacker.sprite.x - target.sprite.x;
    const dy = attacker.sprite.y - target.sprite.y;

    const fireballAngle = Math.atan2(dy, dx) ** -1;

    this.fireball = new Sprite({
      spritesheet: fireballSpriteImage,
      fps: 4,
      framesCount: 4,
      x: attacker.sprite.x,
      y: attacker.sprite.y,
      isAnimating: true,
      rotation: fireballAngle,
    });

    gsap.to(this.fireball, {
      x: target.sprite.x,
      y: target.sprite.y,
      duration: 0.5,
      onComplete: () => {
        super.perform(attacker, target);

        this.fireball = null;

        gsap.to(target.sprite, {
          x: target.sprite.x + 10,
          opacity: 0.5,
          yoyo: true,
          repeat: 5,
          duration: 0.1,
          onComplete: () => {
            attacker.removeActiveAttack(this);
          },
        });
      },
    });
  }

  draw(context: CanvasRenderingContext2D) {
    this.fireball?.draw(context);
  }
}

export { FireballAttack };
