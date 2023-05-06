import { Game } from '@pokemon-game/models/game';
import { Screen } from '@pokemon-game/utils/screen/screen';

class BattleScreen implements Screen {
  constructor(public game: Game) {}

  render() {
    const { context, width, height } = this.game;

    context.fillStyle = 'blue';

    context.fillRect(0, 0, width, height);

    context.fillStyle = 'white';
    context.font = '48px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Battle Screen', width / 2, height / 2);
  }

  update(deltaTime: number) {}

  destroy() {}
}

export { BattleScreen };
