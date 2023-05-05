import { defineConfig } from 'vite';
import path from 'node:path';

const getPath = (relPath: string) => {
  return path.resolve(__dirname, relPath);
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@pokemon-game/assets': getPath('./src/assets'),
      '@pokemon-game/constants': getPath('./src/constants'),
      '@pokemon-game/utils': getPath('./src/utils'),
      '@pokemon-game/types': getPath('./src/types'),
    },
  },
});
