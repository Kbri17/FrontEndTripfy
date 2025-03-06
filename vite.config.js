// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     historyApiFallback: true, // 🔹 Evita el 404 al recargar
//   }
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Opcional, define el puerto
    open: true,  // Opcional, abre el navegador automáticamente
  },
  build: {
    outDir: 'dist',
  },
  base: '/', // Asegura que las rutas sean correctas
});