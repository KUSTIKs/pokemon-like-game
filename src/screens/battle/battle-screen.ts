import ReactDOM from 'react-dom/client';

import { Game } from '@pokemon-game/models/game';
import { Screen } from '@pokemon-game/utils/screen/screen';
import { Sprite } from '@pokemon-game/models/sprite';

import { App } from './components/app';
import { Draggle, Emby } from './models';

import battleBackgroundImg from '@pokemon-game/assets/images/battle-background.png';
import embySpriteImg from '@pokemon-game/assets/images/emby.sprite.png';
import draggleSpriteImg from '@pokemon-game/assets/images/draggle.sprite.png';
import { Monster } from '@pokemon-game/models/monster';
import { Attack } from '@pokemon-game/models/attack';
import { ScreenName } from '@pokemon-game/enums/screen-name';
import { appAudio } from '@pokemon-game/utils/app-audio';

const mapImage = new Image();
mapImage.src = battleBackgroundImg;

const embySpriteImage = new Image();
embySpriteImage.src = embySpriteImg;

const draggleSpriteImage = new Image();
draggleSpriteImage.src = draggleSpriteImg;

const componentsRootElement = document.getElementById('game-components-root')!;

class BattleScreen implements Screen {
  map: Sprite;
  playerMonster: Monster;
  enemyMonster: Monster;
  currentAttack: Attack | null = null;
  componentsRoot: ReactDOM.Root;
  isDistroyed = false;

  constructor(public game: Game) {
    this.map = new Sprite({
      spritesheet: mapImage,
    });
    this.playerMonster = new Emby({
      x: 280,
      y: 325,
    });
    this.enemyMonster = new Draggle({
      x: 800,
      y: 100,
    });

    this.componentsRoot = ReactDOM.createRoot(componentsRootElement);

    this.init();
  }

  private init() {
    appAudio.initBattle.play();
    appAudio.battle.play();
  }

  renderComponents() {
    if (this.componentsRoot) this.componentsRoot.render(App.call(this));
  }

  goToTown() {
    this.game.player.resetPosition();
    this.game.setScreen(ScreenName.TOWN);
  }

  render() {
    const { context } = this.game;

    this.renderComponents();

    this.map.draw(context);
    this.playerMonster.draw(context);
    this.enemyMonster.draw(context);
  }

  update(deltaTime: number) {
    this.playerMonster.update(deltaTime);
    this.enemyMonster.update(deltaTime);
  }

  destroy() {
    this.componentsRoot.unmount();
    appAudio.battle.stop();
  }
}

export { BattleScreen };
