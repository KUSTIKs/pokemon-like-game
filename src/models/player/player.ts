import {
  PLAYER_SPRITE_HEIGHT,
  PLAYER_SPRITE_WIDTH,
  PLAYER_SPEED,
} from '@pokemon-game/constants/sprites';
import { MAP_HEIGHT, MAP_WIDTH, TILE_SIZE } from '@pokemon-game/constants/game';

import { Game } from '../game';

import playerDownSpriteImg from '@pokemon-game/assets/images/player-down.sprite.png';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@pokemon-game/constants/canvas';

const playerDownSpriteImage = new Image();
playerDownSpriteImage.src = playerDownSpriteImg;

const DEFAULT_MAP_X = CANVAS_WIDTH - 26 * TILE_SIZE;
const DEFAULT_MAP_Y = CANVAS_HEIGHT - 19 * TILE_SIZE - TILE_SIZE / 2;

console.log(
  ((25 + 26) / 2) * TILE_SIZE,
  19 * TILE_SIZE,
  DEFAULT_MAP_X,
  DEFAULT_MAP_Y
);

class Player {
  collisionX: number = 0;
  collisionY: number = 0;
  frameX: number = 0;
  collisionRadius: number = PLAYER_SPRITE_WIDTH / 2;
  spriteWidth: number = PLAYER_SPRITE_WIDTH;
  spriteHeight: number = PLAYER_SPRITE_HEIGHT;
  speed: number = PLAYER_SPEED;
  mapX: number = DEFAULT_MAP_X;
  mapY: number = DEFAULT_MAP_Y;

  constructor(private readonly game: Game) {
    this.collisionX = game.width / 2;
    this.collisionY = game.height / 2;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      playerDownSpriteImage,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.collisionX - this.spriteWidth / 2,
      this.collisionY - this.spriteHeight + this.spriteWidth / 2,
      this.spriteWidth,
      this.spriteHeight
    );

    // write current map position to  the canvas
    context.font = '20px Arial';
    context.fillText(
      `Map X: ${this.mapX} Map Y: ${this.mapY}`,
      10,
      this.game.height - 10
    );

    context.fillStyle = '#fff';
    context.strokeStyle = '#fff';

    context.beginPath();
    context.arc(
      this.collisionX,
      this.collisionY,
      this.collisionRadius,
      0,
      Math.PI * 2
    );

    context.save();
    context.globalAlpha = 0.5;
    context.fill();
    context.restore();

    context.stroke();
  }

  update(deltaTime: number) {
    const { input } = this.game;

    if (input.lastKey === 'w') {
      this.mapY += this.speed;
    } else if (input.lastKey === 's') {
      this.mapY -= this.speed;
    } else if (input.lastKey === 'a') {
      this.mapX += this.speed;
    } else if (input.lastKey === 'd') {
      this.mapX -= this.speed;
    }
  }
}

export { Player };
