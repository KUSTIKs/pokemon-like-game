import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@pokemon-game/constants/canvas';

import { Player } from '../player';

import townMapImg from '@pokemon-game/assets/images/town-map.png';

class Game {
  context: CanvasRenderingContext2D;
  height: number;
  width: number;
  player: Player;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    this.height = canvas.height;
    this.width = canvas.width;

    this.player = new Player(this);

    this.init();
  }

  render() {
    this.player.draw(this.context);
  }

  private init() {
    const mapImage = new Image();
    mapImage.src = townMapImg;
    mapImage.onload = () => {
      this.context.drawImage(mapImage, 0, 0);
      this.player.draw(this.context);
    };
  }
}

export { Game };
