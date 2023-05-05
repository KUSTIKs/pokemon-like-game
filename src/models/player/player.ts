import {
  PLAYER_COLLISION_RADIUS,
  PLAYER_VELOCITY,
} from '@pokemon-game/constants/sprites';
import { TILE_SIZE } from '@pokemon-game/constants/game';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@pokemon-game/constants/canvas';
import { gameKeysMap } from '@pokemon-game/maps/game-keys';

import { Game } from '../game';
import { Sprite } from '../sprite';
import { PlayerSprite } from './player-sprite';

const DEFAULT_X = CANVAS_WIDTH - 26 * TILE_SIZE;
const DEFAULT_Y = CANVAS_HEIGHT - 19 * TILE_SIZE - TILE_SIZE / 2;

class Player {
  collisionX: number;
  collisionY: number;
  mapX: number = DEFAULT_X;
  mapY: number = DEFAULT_Y;
  collisionRadius: number = PLAYER_COLLISION_RADIUS;
  velocity: number = PLAYER_VELOCITY;
  sprite: Sprite;
  shouldMoveHooks: ((x: number, y: number) => boolean)[] = [];

  constructor(private readonly game: Game) {
    this.collisionX = game.width / 2;
    this.collisionY = game.height / 2;
    this.sprite = new PlayerSprite(game);
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprite.draw(context);

    this.drawDebugInfo(context);
    this.drawDebugCircles(context);
  }

  update(deltaTime: number) {
    this.updateMovement(deltaTime);
    this.sprite.update(deltaTime);
  }

  private updateMovement(deltaTime: number) {
    const { input } = this.game;
    const distance = Math.round(this.velocity * deltaTime);

    let newX = this.mapX;
    let newY = this.mapY;

    // move player depending on pressed key
    if (gameKeysMap.upKeys.includes(input.lastKey)) {
      newY = this.mapY + distance;
    } else if (gameKeysMap.downKeys.includes(input.lastKey)) {
      newY = this.mapY - distance;
    } else if (gameKeysMap.leftKeys.includes(input.lastKey)) {
      newX = this.mapX + distance;
    } else if (gameKeysMap.rightKeys.includes(input.lastKey)) {
      newX = this.mapX - distance;
    }

    const shouldMove = this.shouldMoveHooks.every((hook) => {
      return hook(newX, newY);
    });

    if (!shouldMove) return;

    this.mapX = newX;
    this.mapY = newY;
  }

  private drawDebugInfo(context: CanvasRenderingContext2D) {
    context.fillStyle = '#fff';
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
  }

  private drawDebugCircles(context: CanvasRenderingContext2D) {
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

    context.fillStyle = '#f00';
    context.strokeStyle = '#f00';

    context.beginPath();
    context.arc(
      this.collisionX,
      this.collisionY,
      this.collisionRadius * 0.5,
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
