import { ScreenName } from '@pokemon-game/enums/screen-name';
import { TownScreen } from '@pokemon-game/screens/town';

const ScreenNameToScreenMap = {
  [ScreenName.TOWN]: TownScreen,
};

export { ScreenNameToScreenMap };
