import { getRandomElement } from '@pokemon-game/utils/get-random-element';
import { Attack } from '@pokemon-game/models/attack';

import { BottomBar } from '../bottom-bar';
import { Button } from '../button';
import { CharacterBar } from '../character-bar';
import { BattleScreen } from '../../battle-screen';

import classes from './app.module.css';
import { appAudio } from '@pokemon-game/utils/app-audio';

function App(this: BattleScreen) {
  const handlePlayerAttack = (attack: Attack) => {
    this.currentAttack = attack;
    this.playerMonster.performAttack(this.enemyMonster, attack);
  };

  const handleEnemyAttack = () => {
    const newAttack = getRandomElement(this.enemyMonster.attacks);
    this.currentAttack = newAttack;
    this.enemyMonster.performAttack(this.playerMonster, newAttack);
  };

  const handleNext = () => {
    if (!this.currentAttack || !this.currentAttack.isFinished) return;

    if (this.currentAttack.attacker === this.playerMonster) {
      handleEnemyAttack();
    } else {
      this.currentAttack = null;
    }
  };

  const isVictory = this.enemyMonster.health <= 0;
  const isLoose = this.playerMonster.health <= 0;

  return (
    <>
      <BottomBar>
        {isVictory ? (
          <div className={classes.messageWrapper}>
            <p className={classes.message}>
              Congratulations, you have defeated {this.enemyMonster.displayName}
              !
            </p>
            <Button onClick={() => this.goToTown()}>Finish</Button>
          </div>
        ) : isLoose ? (
          <div className={classes.messageWrapper}>
            <p className={classes.message}>
              Oh no, you were defeated by {this.enemyMonster.displayName}!
            </p>
            <Button onClick={() => this.goToTown()}>Finish</Button>
          </div>
        ) : this.currentAttack ? (
          <div className={classes.messageWrapper}>
            <p className={classes.message}>
              {this.currentAttack.attacker.displayName} used{' '}
              {this.currentAttack.displayName}
            </p>
            {this.currentAttack.isFinished && (
              <Button onClick={handleNext}>Next &gt;</Button>
            )}
          </div>
        ) : (
          <>
            <div className={classes.info}>
              <p className={classes.title}>Boss Fight</p>
            </div>
            <div className={classes.buttons}>
              {this.playerMonster.attacks.map((attack) => {
                return (
                  <Button
                    key={attack.displayName}
                    onClick={() => handlePlayerAttack(attack)}
                    style={{
                      flexGrow: 1,
                    }}
                  >
                    {attack.displayName}
                  </Button>
                );
              })}
            </div>
          </>
        )}
      </BottomBar>
      <CharacterBar
        name={this.playerMonster.displayName}
        maxHealth={this.playerMonster.maxHealth}
        health={this.playerMonster.health}
        style={{
          top: this.playerMonster.sprite.y - 10,
          left:
            this.playerMonster.sprite.x +
            this.playerMonster.sprite.frameWidth / 2,
          transform: 'translate(-50%, -100%)',
        }}
      />
      <CharacterBar
        name={this.enemyMonster.displayName}
        maxHealth={this.enemyMonster.maxHealth}
        health={this.enemyMonster.health}
        style={{
          top: this.enemyMonster.sprite.y - 10,
          left:
            this.enemyMonster.sprite.x +
            this.enemyMonster.sprite.frameWidth / 2,
          transform: 'translate(-50%, -100%)',
        }}
      />
    </>
  );
}

export { App };
