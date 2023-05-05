import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@pokemon-game/constants/canvas';
import { InputHandler } from '@pokemon-game/utils/input-hanler';

import { Player } from '../player';
import { Sprite } from '../sprite';
import { Collisions } from '../collisions';

import townMapImg from '@pokemon-game/assets/images/town-map.png';
import townMapForegroundImg from '@pokemon-game/assets/images/town-map-foreground.png';
import rawCollisions from '@pokemon-game/data/collisions.json';

const mapImage = new Image();
mapImage.src = townMapImg;

const mapForegroundImage = new Image();
mapForegroundImage.src = townMapForegroundImg;

class Game {
  context: CanvasRenderingContext2D;
  height: number;
  width: number;
  player: Player;
  map: Sprite;
  mapForeground: Sprite;
  collisions: Collisions;
  input = new InputHandler();
  animationRequestId: number | null = null;
  lastTime = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    this.height = canvas.height;
    this.width = canvas.width;

    this.player = new Player(this);
    this.map = new Sprite({
      image: mapImage,
    });
    this.mapForeground = new Sprite({
      image: mapForegroundImage,
    });
    this.collisions = new Collisions({
      rawCollisions,
      map: this.map,
    });
  }

  render() {
    this.map.draw(this.context);
    this.collisions.draw(this.context);
    this.player.draw(this.context);
    this.mapForeground.draw(this.context);
  }

  update(deltaTime: number) {
    this.player.update(deltaTime);
    this.updateMap();
    this.collisions.update(deltaTime);
  }

  updateMap() {
    const newMapX = this.player.mapX - this.width / 2;
    const newMapY = this.player.mapY - this.height / 2;

    this.map.x = newMapX;
    this.map.y = newMapY;
    this.mapForeground.x = newMapX;
    this.mapForeground.y = newMapY;
  }

  private animate: FrameRequestCallback = (time) => {
    this.context.clearRect(0, 0, this.width, this.height);

    const deltaTime = time - this.lastTime;
    this.update(deltaTime);
    this.render();
    this.lastTime = time;

    this.animationRequestId = requestAnimationFrame(this.animate);
  };

  start() {
    this.animationRequestId = requestAnimationFrame(this.animate);
  }

  destroy() {
    if (this.animationRequestId !== null) {
      cancelAnimationFrame(this.animationRequestId);
    }
  }
}

export { Game };
