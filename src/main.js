import { ViteSSG } from 'vite-ssg'
import './style.css'
import App from './App.vue'
import { routes } from './router/index.js'

export const createApp = ViteSSG(App, { routes }, ({ isClient }) => {
  if (isClient) {
    import('@vercel/analytics').then(({ inject }) => inject())
    import('@vercel/speed-insights').then(({ injectSpeedInsights }) => injectSpeedInsights())
  }
})
