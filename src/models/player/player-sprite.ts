import {
  PLAYER_SPRITES_COUNT,
  PLAYER_SPRITE_HEIGHT,
  PLAYER_SPRITE_WIDTH,
} from '@pokemon-game/constants/sprites';

import { Sprite } from '../sprite';
import { Game } from '../game';

import playerDownSpriteImg from '@pokemon-game/assets/images/player-down.sprite.png';
import playerUpSpriteImg from '@pokemon-game/assets/images/player-up.sprite.png';
import playerLeftSpriteImg from '@pokemon-game/assets/images/player-left.sprite.png';
import playerRightSpriteImg from '@pokemon-game/assets/images/player-right.sprite.png';
import { gameKeysMap } from '@pokemon-game/maps/game-keys';

const playerDownSpriteImage = new Image();
playerDownSpriteImage.src = playerDownSpriteImg;

const playerUpSpriteImage = new Image();
playerUpSpriteImage.src = playerUpSpriteImg;

const playerLeftSpriteImage = new Image();
playerLeftSpriteImage.src = playerLeftSpriteImg;

const playerRightSpriteImage = new Image();
playerRightSpriteImage.src = playerRightSpriteImg;

class PlayerSprite extends Sprite {
  constructor(public readonly game: Game) {
    super({
      spritesheet: playerDownSpriteImage,
      framesCount: PLAYER_SPRITES_COUNT,
      x: game.width / 2 - PLAYER_SPRITE_WIDTH / 2,
      y: game.height / 2 - PLAYER_SPRITE_HEIGHT + PLAYER_SPRITE_WIDTH / 2,
      fps: 10,
    });
  }

  update(timeDelta: number): void {
    super.update(timeDelta);
    const { input } = this.game;

    // set sprite direction based on player input
    if (gameKeysMap.upKeys.includes(input.lastKey)) {
      this.setSpritesheet(playerUpSpriteImage);
    } else if (gameKeysMap.downKeys.includes(input.lastKey)) {
      this.setSpritesheet(playerDownSpriteImage);
    } else if (gameKeysMap.leftKeys.includes(input.lastKey)) {
      this.setSpritesheet(playerLeftSpriteImage);
    } else if (gameKeysMap.rightKeys.includes(input.lastKey)) {
      this.setSpritesheet(playerRightSpriteImage);
    }

    // Start moving sprite if player pressed any movement key
    const shouldMove = gameKeysMap.movementKeys.includes(input.lastKey);

    if (shouldMove && !this.isAnimating) {
      this.startMoving();
    } else if (!shouldMove && this.isAnimating) {
      this.stopMoving();
    }
  }
}

export { PlayerSprite };
