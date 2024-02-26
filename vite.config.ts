import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],

  resolve: {
    alias: [
      { find: '@client', replacement: '/src/app' },
      { find: '@server', replacement: '/server' },
      { find: '@environments', replacement: '/src/environments' },
    ],
  },
})


// export const ViteConfigs = {
//   fileUrl: import.meta.url ,
// }