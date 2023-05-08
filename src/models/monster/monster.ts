import { appAudio } from '@pokemon-game/utils/app-audio';
import { Attack } from '../attack';
import { Sprite } from '../sprite';

class Monster {
  maxHealth: number;
  health: number;
  sprite: Sprite;
  attacks: Attack[] = [];
  displayName = 'Monster';

  constructor({
    health = 100,
    sprite,
    maxHealth = health,
  }: {
    health?: number;
    sprite: Sprite;
    maxHealth?: number;
  }) {
    this.health = Math.min(health, maxHealth);
    this.sprite = sprite;
    this.maxHealth = maxHealth;
  }

  takeDamage(amount: number) {
    this.health = Math.max(0, this.health - amount);

    if (this.health === 0) {
      this.sprite.opacity = 0.25;
      this.sprite.stopMoving();
    }
  }

  performAttack(target: Monster, attack: Attack) {
    attack.perform(target);
  }

  draw(context: CanvasRenderingContext2D) {
    this.attacks.forEach((attack) => attack.draw(context));
    this.sprite.draw(context);
  }

  update(timeDelta: number) {
    this.sprite.update(timeDelta);
  }
}

export { Monster };
