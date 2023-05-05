import { RawBattleZones } from '@pokemon-game/types/common';
import { TILE_SIZE } from '@pokemon-game/constants/game';

import { Boundary } from '../boundary';
import { Sprite } from '../sprite';

class BattleZones {
  height: number;
  width: number;
  data: number[][] = [];
  battleZones: Boundary[] = [];
  map: Sprite;

  constructor({
    rawBattleZones,
    map,
  }: {
    rawBattleZones: RawBattleZones;
    map: Sprite;
  }) {
    this.height = rawBattleZones.height;
    this.width = rawBattleZones.width;
    this.map = map;
    this.init(rawBattleZones);
  }

  private init(rawBattleZones: RawBattleZones) {
    for (let rowIndex = 0; rowIndex < this.height; rowIndex += 1) {
      const row = rawBattleZones.data.slice(
        rowIndex * this.width,
        (rowIndex + 1) * this.width
      );

      for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
        const cell = row[columnIndex];

        if (cell !== 0) {
          this.battleZones.push(
            new Boundary({
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
    this.battleZones.forEach((battleZone) => {
      battleZone.offsetX = this.map.x;
      battleZone.offsetY = this.map.y;
    });
  }

  draw(context: CanvasRenderingContext2D) {
    this.battleZones.forEach((battleZone) => {
      battleZone.draw(context);
    });
  }
}

export { BattleZones };
