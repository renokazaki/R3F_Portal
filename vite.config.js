import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl'; // glslプラグインをインポート

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),  // Reactプラグイン
    glsl()     // GLSLプラグイン
  ],
});
