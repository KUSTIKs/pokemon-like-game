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
      '@pokemon-game/data': getPath('./src/data'),
      '@pokemon-game/enums': getPath('./src/enums'),
      '@pokemon-game/maps': getPath('./src/maps'),
      '@pokemon-game/models': getPath('./src/models'),
      '@pokemon-game/screens': getPath('./src/screens'),
    },
  },
});
