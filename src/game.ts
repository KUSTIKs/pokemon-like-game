import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@pokemon-game/constants/canvas';

import townMapImg from '@pokemon-game/assets/images/town-map.png';
import playerDownSpriteImg from '@pokemon-game/assets/images/player-down.sprite.png';

function setupGame(canvas: HTMLCanvasElement) {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext('2d')!;

  const mapImage = new Image();
  mapImage.src = townMapImg;
  mapImage.onload = () => {
    ctx.drawImage(mapImage, 0, 0);
  };

  const playerImage = new Image();
  playerImage.src = playerDownSpriteImg;
  playerImage.onload = () => {
    const spriteWidth = playerImage.width / 4;
    const spriteHeight = playerImage.height;
    const spriteX = canvas.width / 2 - spriteWidth / 2;
    const spriteY = canvas.height / 2 - spriteHeight / 2;
    ctx.drawImage(
      playerImage,
      0,
      0,
      spriteWidth,
      spriteHeight,
      spriteX,
      spriteY,
      spriteWidth,
      spriteHeight
    );
  };
}

export { setupGame };
