import { gsap } from 'gsap';

import { Enemy } from '../enemy';
import { Attack } from './attack';

class TackleAttack extends Attack {
  static damage = 10;

  constructor() {
    super({
      damage: TackleAttack.damage,
    });
  }

  perform(attacker: Enemy, target: Enemy) {
    const tl = gsap.timeline();
    const positionFactor = Math.sign(attacker.sprite.x - target.sprite.x);

    tl.to(attacker.sprite, {
      x: attacker.sprite.x + 20 * positionFactor,
      duration: 0.1,
    })
      .to(attacker.sprite, {
        x: attacker.sprite.x - 40 * positionFactor,
        duration: 0.1,
        onComplete: () => {
          super.perform(attacker, target);

          gsap.to(target.sprite, {
            x: target.sprite.x - 10 * positionFactor,
            opacity: 0.5,
            yoyo: true,
            repeat: 5,
            duration: 0.1,
          });
        },
      })
      .to(attacker.sprite, {
        x: attacker.sprite.x,
      });
  }
}

export { TackleAttack };
