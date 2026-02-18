import { ref } from 'vue'

const scriptLoaded = ref(false)

function loadScript() {
  if (scriptLoaded.value) return Promise.resolve()
  if (typeof window === 'undefined') return Promise.resolve()

  return new Promise((resolve) => {
    const link = document.createElement('link')
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.onload = () => {
      scriptLoaded.value = true
      resolve()
    }
    document.body.appendChild(script)
  })
}

const CALENDLY_URL = 'https://calendly.com/vue3migration'

export function useCalendly() {
  async function openCalendly() {
    await loadScript()
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    }
  }

  return { openCalendly }
}
