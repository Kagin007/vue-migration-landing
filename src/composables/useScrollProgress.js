import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollProgress() {
  const scrollY = ref(0)
  const scrollPercent = ref(0)
  const pastHero = ref(false)
  const atContact = ref(false)

  function onScroll() {
    scrollY.value = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollPercent.value = docHeight > 0 ? Math.min(Math.round((window.scrollY / docHeight) * 100), 100) : 0
    pastHero.value = window.scrollY > window.innerHeight * 0.6

    const contactEl = document.getElementById('contact')
    if (contactEl) {
      const rect = contactEl.getBoundingClientRect()
      atContact.value = rect.top < window.innerHeight && rect.bottom > 0
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { scrollY, scrollPercent, pastHero, atContact }
}
