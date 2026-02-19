import { useRouter, useRoute } from 'vue-router'

export function useScrollTo() {
  const router = useRouter()
  const route = useRoute()

  function scrollTo(id) {
    if (route.path === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push({ path: '/', hash: `#${id}` })
    }
  }

  return { scrollTo }
}
