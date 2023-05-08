import { Enemy } from '../enemy';

class Attack {
  damage: number;

  constructor({ damage }: { damage: number }) {
    this.damage = damage;
  }

  perform(attacker: Enemy, target: Enemy) {
    target.takeDamage(this.damage);
  }

  draw(context: CanvasRenderingContext2D) {}
}

export { Attack };
