import { Howl } from 'howler';

import battleAudio from '../../assets/audio/battle.mp3';
import mapAudio from '../../assets/audio/map.wav';
import fireballHitAudio from '../../assets/audio/fireball-hit.wav';
import initFireballAudio from '../../assets/audio/init-fireball.wav';
import initBattleAudio from '../../assets/audio/init-battle.wav';
import tackleHitAudio from '../../assets/audio/tackle-hit.wav';
import victoryAudio from '../../assets/audio/victory.wav';

const appAudio = {
  battle: new Howl({
    src: battleAudio,
    volume: 0.1,
  }),
  map: new Howl({
    src: mapAudio,
    volume: 0.1,
  }),
  fireballHit: new Howl({
    src: fireballHitAudio,
    volume: 0.1,
  }),
  initFireball: new Howl({
    src: initFireballAudio,
    volume: 0.1,
  }),
  initBattle: new Howl({
    src: initBattleAudio,
    volume: 0.1,
  }),
  tackleHit: new Howl({
    src: tackleHitAudio,
    volume: 0.1,
  }),
  victory: new Howl({
    src: victoryAudio,
    volume: 0.1,
  }),
};

export { appAudio };
