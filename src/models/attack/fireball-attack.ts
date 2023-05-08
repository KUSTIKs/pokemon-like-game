import { gsap } from 'gsap';

import { appAudio } from '@pokemon-game/utils/app-audio';

import { Monster } from '../monster';
import { Sprite } from '../sprite';
import { Attack } from './attack';

import fireballSpriteImg from '@pokemon-game/assets/images/fireball.sprite.png';

const fireballSpriteImage = new Image();
fireballSpriteImage.src = fireballSpriteImg;

class FireballAttack extends Attack {
  static damage = 25;
  fireball: Sprite | null = null;
  displayName = 'Fireball';

  constructor(attacker: Monster) {
    super({
      damage: FireballAttack.damage,
      attacker,
    });
  }

  perform(target: Monster) {
    this.isFinished = false;

    const dx = this.attacker.sprite.x - target.sprite.x;
    const dy = this.attacker.sprite.y - target.sprite.y;

    const fireballAngle = Math.atan2(dy, dx) ** -1;

    this.fireball = new Sprite({
      spritesheet: fireballSpriteImage,
      fps: 4,
      framesCount: 4,
      x: this.attacker.sprite.x,
      y: this.attacker.sprite.y,
      isAnimating: true,
      rotation: fireballAngle,
    });

    appAudio.initFireball.play();

    gsap.to(this.fireball, {
      x: target.sprite.x,
      y: target.sprite.y,
      duration: 0.5,
      onComplete: () => {
        super.perform(target);

        this.fireball = null;
        appAudio.fireballHit.play();

        gsap.to(target.sprite, {
          x: target.sprite.x + 10,
          opacity: 0.5,
          yoyo: true,
          repeat: 5,
          duration: 0.1,
          onComplete: () => {
            this.isFinished = true;
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
