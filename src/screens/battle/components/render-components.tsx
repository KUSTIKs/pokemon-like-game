import { AttackBar } from './attack-bar';
import { AttackButton } from './attack-button';
import { CharacterBar } from './character-bar';
import { BattleScreen } from '../battle-screen';
import { FireballAttack, TackleAttack } from '@pokemon-game/models/attack';

function renderComponents(this: BattleScreen) {
  const handleTackleAttack = () => {
    const tackleAttack = new TackleAttack();
    this.emby.performAttack(this.draggle, tackleAttack);
    // this.draggle.performAttack(this.emby, tackleAttack);
  };
  const handleFireballAttack = () => {
    const tackleAttack = new FireballAttack();
    this.emby.performAttack(this.draggle, tackleAttack);
    // this.draggle.performAttack(this.emby, tackleAttack);
  };

  return (
    <>
      <AttackBar
        buttons={
          <>
            <AttackButton label='Tackle' onClick={handleTackleAttack} />
            <AttackButton label='Fireball' onClick={handleFireballAttack} />
          </>
        }
      />
      <CharacterBar
        name='Emby'
        maxHealth={this.emby.maxHealth}
        health={this.emby.health}
        style={{
          top: this.emby.sprite.y - 10,
          left: this.emby.sprite.x + this.emby.sprite.frameWidth / 2,
          transform: 'translate(-50%, -100%)',
        }}
      />
      <CharacterBar
        name='Draggle'
        maxHealth={this.emby.maxHealth}
        health={this.draggle.health}
        style={{
          top: this.draggle.sprite.y - 10,
          left: this.draggle.sprite.x + this.draggle.sprite.frameWidth / 2,
          transform: 'translate(-50%, -100%)',
        }}
      />
    </>
  );
}

export { renderComponents };
