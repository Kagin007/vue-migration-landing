import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export function useActiveSection(sectionIds) {
  const activeSection = ref('')
  const route = useRoute()
  let observer = null

  function observe() {
    observer?.disconnect()

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  }

  onMounted(observe)

  // Re-observe when route changes — sections are new DOM elements after navigation
  watch(() => route.path, () => {
    nextTick(observe)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { activeSection }
}
