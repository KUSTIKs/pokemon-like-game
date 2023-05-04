import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@pokemon-game/constants/canvas';

function setupGame(canvas: HTMLCanvasElement) {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'white';
  ctx.font = '48px sans-serif';
  ctx.fillText('Hello, world', 10, 50);
}

export { setupGame };
