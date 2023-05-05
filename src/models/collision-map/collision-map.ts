import { RawCollisions } from '@pokemon-game/types/common';
import { TILE_SIZE } from '@pokemon-game/constants/game';

import { Sprite } from '../sprite';
import { Collision } from '../collision';

class CollisionMap {
  height: number;
  width: number;
  data: number[][] = [];
  collisions: Collision[] = [];
  map: Sprite;

  constructor({
    rawCollisions,
    map,
  }: {
    rawCollisions: RawCollisions;
    map: Sprite;
  }) {
    this.height = rawCollisions.height;
    this.width = rawCollisions.width;
    this.map = map;
    this.init(rawCollisions);
  }

  private init(rawCollisions: RawCollisions) {
    for (let rowIndex = 0; rowIndex < this.height; rowIndex += 1) {
      const row = rawCollisions.data.slice(
        rowIndex * this.width,
        (rowIndex + 1) * this.width
      );

      for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
        const cell = row[columnIndex];

        if (cell !== 0) {
          this.collisions.push(
            new Collision({
              height: TILE_SIZE,
              width: TILE_SIZE,
              x: columnIndex * TILE_SIZE,
              y: rowIndex * TILE_SIZE,
            })
          );
        }
      }

      this.data.push(row);
    }
  }

  update(deltaTime: number) {
    this.collisions.forEach((collision) => {
      collision.offsetX = this.map.x;
      collision.offsetY = this.map.y;
    });
  }

  draw(context: CanvasRenderingContext2D) {
    this.collisions.forEach((collision) => {
      collision.draw(context);
    });
  }
}

export { CollisionMap };
