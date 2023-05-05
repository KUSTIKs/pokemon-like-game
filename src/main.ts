import { Game } from './models/game';

import './styles/styles.css';

const gameCanvas = document.querySelector<HTMLCanvasElement>('#game')!;

const game = new Game(gameCanvas);
game.start();
