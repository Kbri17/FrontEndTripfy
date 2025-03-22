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
    proxy: {
      "/api": {
        target: "https://ec2-107-22-158-63.compute-1.amazonaws.com", // Backend con SSL
        changeOrigin: true,
        secure: false, // 🔴 Desactiva la verificación SSL (solo para pruebas)
      },
    },
  },
});