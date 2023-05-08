import ReactDOM from 'react-dom/client';

import { Game } from '@pokemon-game/models/game';
import { Screen } from '@pokemon-game/utils/screen/screen';
import { Sprite } from '@pokemon-game/models/sprite';

import { renderComponents } from './components/render-components';
import { Draggle, Emby } from './models';

import battleBackgroundImg from '@pokemon-game/assets/images/battle-background.png';
import embySpriteImg from '@pokemon-game/assets/images/emby.sprite.png';
import draggleSpriteImg from '@pokemon-game/assets/images/draggle.sprite.png';

const mapImage = new Image();
mapImage.src = battleBackgroundImg;

const embySpriteImage = new Image();
embySpriteImage.src = embySpriteImg;

const draggleSpriteImage = new Image();
draggleSpriteImage.src = draggleSpriteImg;

const componentsRootElement = document.getElementById('game-components-root')!;
const componentsRoot = ReactDOM.createRoot(componentsRootElement);

class BattleScreen implements Screen {
  map: Sprite;
  emby: Emby;
  draggle: Draggle;

  constructor(public game: Game) {
    this.map = new Sprite({
      spritesheet: mapImage,
    });
    this.emby = new Emby({
      x: 280,
      y: 325,
    });
    this.draggle = new Draggle({
      x: 800,
      y: 100,
    });
  }

  renderComponents() {
    componentsRoot.render(renderComponents.call(this));
  }

  render() {
    const { context } = this.game;

    this.renderComponents();

    this.map.draw(context);
    this.draggle.draw(context);
    this.emby.draw(context);
  }

  update(deltaTime: number) {
    this.draggle.update(deltaTime);
    this.emby.update(deltaTime);
  }

  destroy() {
    componentsRoot.unmount();
  }
}

export { BattleScreen };
