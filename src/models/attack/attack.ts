import { Monster } from '../monster';

class Attack {
  displayName = 'Attack';
  damage: number;
  isFinished = true;
  attacker: Monster;

  constructor({ damage, attacker }: { damage: number; attacker: Monster }) {
    this.damage = damage;
    this.attacker = attacker;
  }

  perform(target: Monster) {
    target.takeDamage(this.damage);
  }

  draw(context: CanvasRenderingContext2D) {}
}

export { Attack };
