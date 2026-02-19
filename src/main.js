import { ViteSSG } from 'vite-ssg'
import './style.css'
import App from './App.vue'
import { routes } from './router/index.js'

export const createApp = ViteSSG(App, {
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: 'smooth' })
        }, 300)
      })
    }
    return { top: 0 }
  },
}, ({ isClient }) => {
  if (isClient) {
    import('@vercel/analytics').then(({ inject }) => inject())
    import('@vercel/speed-insights').then(({ injectSpeedInsights }) => injectSpeedInsights())

    console.log(
      '%c ✓ Vue Migration ',
      'background: linear-gradient(135deg, #42b883, #3b9e75); color: #fff; font-size: 20px; font-weight: bold; padding: 12px 24px; border-radius: 8px; font-family: "JetBrains Mono", monospace;'
    )
    console.log(
      '%cStill on Vue 2? I can help.\n%chttps://vuemigration.dev',
      'color: #94a3b8; font-size: 14px; font-family: "JetBrains Mono", monospace; padding-top: 8px;',
      'color: #42b883; font-size: 14px; font-family: "JetBrains Mono", monospace;'
    )
  }
})
