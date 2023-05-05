import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@pokemon-game/constants/canvas';
import { InputHandler } from '@pokemon-game/utils/input-hanler';

import { Player } from '../player';

import townMapImg from '@pokemon-game/assets/images/town-map.png';
import { Sprite } from '../sprite';

const mapImage = new Image();
mapImage.src = townMapImg;

class Game {
  context: CanvasRenderingContext2D;
  height: number;
  width: number;
  player: Player;
  background: Sprite;
  input = new InputHandler();
  animationRequestId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    this.height = canvas.height;
    this.width = canvas.width;

    this.player = new Player(this);
    this.background = new Sprite({
      image: mapImage,
    });
  }

  render() {
    if (this.input.keys.has('w') && this.input.lastKey === 'w') {
      this.background.y += this.player.speed;
    } else if (this.input.keys.has('s') && this.input.lastKey === 's') {
      this.background.y -= this.player.speed;
    } else if (this.input.keys.has('a') && this.input.lastKey === 'a') {
      this.background.x += this.player.speed;
    } else if (this.input.keys.has('d') && this.input.lastKey === 'd') {
      this.background.x -= this.player.speed;
    }

    this.background.draw(this.context);
    this.player.draw(this.context);
  }

  destroy() {
    if (this.animationRequestId !== null) {
      cancelAnimationFrame(this.animationRequestId);
    }
  }

  private animate() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.render();
    this.animationRequestId = requestAnimationFrame(() => this.animate());
  }

  start() {
    this.animationRequestId = requestAnimationFrame(() => this.animate());
  }
}

export { Game };
