import { Game } from '@pokemon-game/models/game';

abstract class Screen {
  constructor(public game: Game) {}

  abstract render(): void;
  abstract update(deltaTime: number): void;
  abstract destroy(): void;
}

export { Screen };
