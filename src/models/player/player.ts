import {
  PLAYER_SPRITE_HEIGHT,
  PLAYER_SPRITE_WIDTH,
  PLAYER_SPEED,
} from '@pokemon-game/constants/sprites';

import { Game } from '../game';

import playerDownSpriteImg from '@pokemon-game/assets/images/player-down.sprite.png';

const playerDownSpriteImage = new Image();
playerDownSpriteImage.src = playerDownSpriteImg;

class Player {
  collisionX: number = 0;
  collisionY: number = 0;
  frameX: number = 0;
  collisionRadius: number = PLAYER_SPRITE_WIDTH / 2;
  spriteWidth: number = PLAYER_SPRITE_WIDTH;
  spriteHeight: number = PLAYER_SPRITE_HEIGHT;
  speed: number = PLAYER_SPEED;

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
}

export { Player };
