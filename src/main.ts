import { setupGame } from './game';

import './styles/styles.css';

const gameCanvas = document.querySelector<HTMLCanvasElement>('#game')!;

setupGame(gameCanvas);
