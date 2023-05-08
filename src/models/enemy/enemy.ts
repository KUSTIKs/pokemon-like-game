import { Attack } from '../attack';
import { Sprite } from '../sprite';

class Enemy {
  maxHealth: number;
  health: number;
  sprite: Sprite;
  activeAttacks: Attack[] = [];

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
  }

  performAttack(target: Enemy, attack: Attack) {
    attack.perform(this, target);
  }

  addActiveAttack(attack: Attack) {
    this.activeAttacks.push(attack);
  }

  removeActiveAttack(attack: Attack) {
    this.activeAttacks = this.activeAttacks.filter(
      (activeAttack) => activeAttack !== attack
    );
  }

  draw(context: CanvasRenderingContext2D) {
    this.activeAttacks.forEach((attack) => attack.draw(context));
    this.sprite.draw(context);
  }

  update(timeDelta: number) {
    this.sprite.update(timeDelta);
  }
}

export { Enemy };
