import { ScreenName } from '@pokemon-game/enums/screen-name';
import { BattleScreen } from '@pokemon-game/screens/battle';
import { TownScreen } from '@pokemon-game/screens/town';

const ScreenNameToScreenMap = {
  [ScreenName.TOWN]: TownScreen,
  [ScreenName.BATTLE]: BattleScreen,
};

export { ScreenNameToScreenMap };
