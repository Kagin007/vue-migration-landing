import { ref, onMounted, onUnmounted } from 'vue'

/**
 * IntersectionObserver-based count-up animation.
 * Triggers once when the target element enters the viewport.
 *
 * @param {number} endValue - The final number to count to
 * @param {number} duration - Animation duration in ms (default 2000)
 * @returns {{ count, elementRef }} - Reactive count value and template ref
 */
export function useCountUp(endValue, duration = 2000) {
  const count = ref(0)
  const elementRef = ref(null)
  let observer = null

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
  }

  function animate() {
    const start = performance.now()

    function step(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      count.value = Math.round(easeOutCubic(progress) * endValue)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }

  onMounted(() => {
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { count, elementRef }
}
