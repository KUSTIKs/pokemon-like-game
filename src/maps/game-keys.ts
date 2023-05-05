import { KeyboardKey } from '@pokemon-game/enums/keyboard-key';

const gameKeysMap = {
  movementKeys: [
    KeyboardKey.W,
    KeyboardKey.A,
    KeyboardKey.S,
    KeyboardKey.D,
    KeyboardKey.UP_ARROW,
    KeyboardKey.LEFT_ARROW,
    KeyboardKey.DOWN_ARROW,
    KeyboardKey.RIGHT_ARROW,
  ] as unknown[],
  upKeys: [KeyboardKey.W, KeyboardKey.UP_ARROW] as unknown[],
  downKeys: [KeyboardKey.S, KeyboardKey.DOWN_ARROW] as unknown[],
  leftKeys: [KeyboardKey.A, KeyboardKey.LEFT_ARROW] as unknown[],
  rightKeys: [KeyboardKey.D, KeyboardKey.RIGHT_ARROW] as unknown[],
};

export { gameKeysMap };
