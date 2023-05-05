import { Game } from '@pokemon-game/models/game';

abstract class Screen {
  constructor(public game: Game) {}

  render() {}

  update(deltaTime: number) {}

  destroy() {}
}

export { Screen };
