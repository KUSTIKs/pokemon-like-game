import { gsap } from 'gsap';

import { Monster } from '../monster';
import { Attack } from './attack';
import { appAudio } from '@pokemon-game/utils/app-audio';

class TackleAttack extends Attack {
  static damage = 10;
  displayName = 'Tackle';

  constructor(attacker: Monster) {
    super({
      damage: TackleAttack.damage,
      attacker,
    });
  }

  perform(target: Monster) {
    this.isFinished = false;

    const tl = gsap.timeline();
    const positionFactor = Math.sign(this.attacker.sprite.x - target.sprite.x);

    tl.to(this.attacker.sprite, {
      x: this.attacker.sprite.x + 20 * positionFactor,
      duration: 0.1,
    })
      .to(this.attacker.sprite, {
        x: this.attacker.sprite.x - 40 * positionFactor,
        duration: 0.1,
        onComplete: () => {
          super.perform(target);

          appAudio.tackleHit.play();

          gsap.to(target.sprite, {
            x: target.sprite.x - 10 * positionFactor,
            opacity: 0.5,
            yoyo: true,
            repeat: 5,
            duration: 0.1,
            onComplete: () => {
              this.isFinished = true;
            },
          });
        },
      })
      .to(this.attacker.sprite, {
        x: this.attacker.sprite.x,
      });
  }
}

export { TackleAttack };
