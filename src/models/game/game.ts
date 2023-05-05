import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@pokemon-game/constants/canvas';
import { InputHandler } from '@pokemon-game/utils/input-hanler';
import { ScreenName } from '@pokemon-game/enums/screen-name';
import { Screen } from '@pokemon-game/utils/screen/screen';
import { ScreenNameToScreenMap } from '@pokemon-game/maps/screen-name-to-scene-map';

import { Player } from '../player';

class Game {
  context: CanvasRenderingContext2D;
  height: number;
  width: number;
  player: Player;
  input: InputHandler;
  screenName = ScreenName.TOWN;
  screen: Screen;
  animationRequestId: number | null = null;
  lastTime = 0;
  isDestroied = false;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    this.height = canvas.height;
    this.width = canvas.width;

    this.player = new Player(this);

    this.input = new InputHandler();

    const ScreenConstructor = ScreenNameToScreenMap[this.screenName];
    this.screen = new ScreenConstructor(this);
  }

  setScreen(scene: ScreenName) {
    this.screen.destroy();
    this.screenName = scene;
    const ScreenConstructor = ScreenNameToScreenMap[scene];
    this.screen = new ScreenConstructor(this);
  }

  render() {
    this.screen.render();
  }

  update(deltaTime: number) {
    this.screen.update(deltaTime);
  }

  private animate: FrameRequestCallback = (time) => {
    this.context.clearRect(0, 0, this.width, this.height);

    const deltaTime = time - this.lastTime;
    this.update(deltaTime);
    this.render();
    this.lastTime = time;

    if (!this.isDestroied) {
      this.animationRequestId = requestAnimationFrame(this.animate);
    }
  };

  start() {
    this.animationRequestId = requestAnimationFrame(this.animate);
  }

  destroy() {
    if (this.animationRequestId !== null) {
      cancelAnimationFrame(this.animationRequestId);
    }
    this.isDestroied = true;
    this.screen.destroy();
  }
}

export { Game };
