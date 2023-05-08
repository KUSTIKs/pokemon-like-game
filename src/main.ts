import { Game } from './models/game';

import './styles/styles.css';

const gameCanvas = document.querySelector<HTMLCanvasElement>('#game-canvas')!;

const game = new Game(gameCanvas);
game.start();
