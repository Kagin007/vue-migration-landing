import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer = null
  let mutationObserver = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    function observeAll() {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
        observer.observe(el)
      })
    }

    // Initial pass after a short delay to ensure all components are mounted
    setTimeout(observeAll, 100)

    // Watch for dynamically added .reveal elements
    mutationObserver = new MutationObserver(observeAll)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    observer?.disconnect()
    mutationObserver?.disconnect()
  })
}
