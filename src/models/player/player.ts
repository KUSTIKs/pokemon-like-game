import {
  PLAYER_COLLISION_RADIUS,
  PLAYER_VELOCITY,
} from '@pokemon-game/constants/sprites';
import { TILE_SIZE } from '@pokemon-game/constants/game';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@pokemon-game/constants/canvas';
import { CollisionDetector } from '@pokemon-game/utils/collision-detector';
import { gameKeysMap } from '@pokemon-game/maps/game-keys';

import { Game } from '../game';
import { Sprite } from '../sprite';
import { PlayerSprite } from './player-sprite';

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

    // move player depending on pressed key
    if (gameKeysMap.upKeys.includes(input.lastKey)) {
      this.collisionSafeMove({
        y: distance,
      });
    } else if (gameKeysMap.downKeys.includes(input.lastKey)) {
      this.collisionSafeMove({
        y: -distance,
      });
    } else if (gameKeysMap.leftKeys.includes(input.lastKey)) {
      this.collisionSafeMove({
        x: distance,
      });
    } else if (gameKeysMap.rightKeys.includes(input.lastKey)) {
      this.collisionSafeMove({
        x: -distance,
      });
    }
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
    const isColligingBattleZone = this.isColligingBattleZone({ x, y });

    if (isColligingBattleZone) {
      console.log('BATTLE_ZONE');
    }

    this.mapX += x;
    this.mapY += y;
  }

  private isColligingBattleZone({ x = 0, y = 0 }: { x?: number; y?: number }) {
    const { battleZones } = this.game.battleZones;
    const isCollision = battleZones.some((battleZone) => {
      return CollisionDetector.circleRect(
        this.collisionX,
        this.collisionY,
        this.collisionRadius * 0.5,
        battleZone.mapX + x,
        battleZone.mapY + y,
        battleZone.width,
        battleZone.height
      );
    });

    return isCollision;
  }
}

export { Player };
