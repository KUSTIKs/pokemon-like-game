type Position = {
  x: number;
  y: number;
};

type RawCollisions = {
  data: number[];
  height: number;
  width: number;
};

type RawBattleZones = {
  data: number[];
  height: number;
  width: number;
};

export type { Position, RawCollisions, RawBattleZones };
