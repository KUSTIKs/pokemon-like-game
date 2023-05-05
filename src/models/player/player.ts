import {
  PLAYER_COLLISION_RADIUS,
  PLAYER_SPRITES_COUNT,
  PLAYER_SPRITE_HEIGHT,
  PLAYER_SPRITE_WIDTH,
  PLAYER_VELOCITY,
} from '@pokemon-game/constants/sprites';
import { TILE_SIZE } from '@pokemon-game/constants/game';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@pokemon-game/constants/canvas';

import { Game } from '../game';

import playerDownSpriteImg from '@pokemon-game/assets/images/player-down.sprite.png';
import { Sprite } from '../sprite';
import { CollisionDetector } from '@pokemon-game/utils/collision-detector';

const playerDownSpriteImage = new Image();
playerDownSpriteImage.src = playerDownSpriteImg;

const DEFAULT_MAP_X = CANVAS_WIDTH - 26 * TILE_SIZE;
const DEFAULT_MAP_Y = CANVAS_HEIGHT - 19 * TILE_SIZE - TILE_SIZE / 2;

class Player {
  collisionX: number = 0;
  collisionY: number = 0;
  collisionRadius: number = PLAYER_COLLISION_RADIUS;
  velocity: number = PLAYER_VELOCITY;
  mapX: number = DEFAULT_MAP_X;
  mapY: number = DEFAULT_MAP_Y;
  sprite: Sprite;

  constructor(private readonly game: Game) {
    this.collisionX = game.width / 2;
    this.collisionY = game.height / 2;
    this.sprite = new Sprite({
      image: playerDownSpriteImage,
      framesCount: PLAYER_SPRITES_COUNT,
      x: game.width / 2 - PLAYER_SPRITE_WIDTH / 2,
      y: game.height / 2 - PLAYER_SPRITE_HEIGHT + PLAYER_SPRITE_WIDTH / 2,
    });
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprite.draw(context);

    // write current map position to the canvas
    context.font = '14px monospace';
    context.fillText(
      `Map X: ${this.mapX} Map Y: ${this.mapY}`,
      10,
      this.game.height - 10 - 14 * 2
    );
    context.fillText(
      `X: ${this.sprite.x} Y: ${this.sprite.y}`,
      10,
      this.game.height - 10 - 14 * 1
    );
    context.fillText(
      `Collision X: ${this.collisionX} Collision Y: ${this.collisionY}`,
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

    const distance = Math.round(this.velocity * deltaTime);

    if (input.lastKey === 'w') {
      this.collisionSafeMove({
        y: distance,
      });
    } else if (input.lastKey === 's') {
      this.collisionSafeMove({
        y: -distance,
      });
    } else if (input.lastKey === 'a') {
      this.collisionSafeMove({
        x: distance,
      });
    } else if (input.lastKey === 'd') {
      this.collisionSafeMove({
        x: -distance,
      });
    }
  }

  private collisionSafeMove({ x = 0, y = 0 }: { x?: number; y?: number }) {
    const { boundaries } = this.game.collisions;
    const isCollision = boundaries.some((boundary) => {
      return CollisionDetector.circleRect(
        this.collisionX,
        this.collisionY,
        this.collisionRadius,
        boundary.mapX + x,
        boundary.mapY + y,
        boundary.width,
        boundary.height
      );
    });

    if (isCollision) return;

    this.mapX += x;
    this.mapY += y;
  }
}

export { Player };
