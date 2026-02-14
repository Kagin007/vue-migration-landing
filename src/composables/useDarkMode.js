import { ref, watchEffect } from 'vue'

const isDark = ref(
  typeof window !== 'undefined' &&
  (localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches))
)

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }
})

export function useDarkMode() {
  const toggle = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
