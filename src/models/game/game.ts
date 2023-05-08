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
  isStopped = false;

  constructor(public canvas: HTMLCanvasElement) {
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

  async setScreen(scene: ScreenName) {
    this.stop();
    this.screen.destroy();

    await this.fadeInCanvas();

    this.screenName = scene;
    const ScreenConstructor = ScreenNameToScreenMap[scene];
    this.screen = new ScreenConstructor(this);
    this.start();

    await this.fadeOutCanvas();
  }

  private fadeInCanvas() {
    const animation = this.canvas.animate(
      {
        opacity: 0,
      },
      {
        duration: 1000,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );

    return new Promise((resolve) => {
      animation.onfinish = resolve;
    });
  }

  private fadeOutCanvas() {
    const animation = this.canvas.animate(
      {
        opacity: 1,
      },
      {
        duration: 300,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );

    return new Promise((resolve) => {
      animation.onfinish = resolve;
    });
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

    if (!this.isStopped) {
      this.animationRequestId = requestAnimationFrame(this.animate);
    }
  };

  stop() {
    this.isStopped = true;
    if (this.animationRequestId !== null) {
      cancelAnimationFrame(this.animationRequestId);
    }
  }

  start() {
    this.isStopped = false;
    this.animationRequestId = requestAnimationFrame(this.animate);
  }

  destroy() {
    this.stop();
    this.screen.destroy();
    this.input.destroy();
  }
}

export { Game };
