const routes = [
  {
    path: '/',
    component: () => import('../pages/LandingPage.vue'),
  },
  {
    path: '/blog/vue-2-end-of-life',
    component: () => import('../pages/blog/Vue2EndOfLife.vue'),
  },
]

export { routes }
