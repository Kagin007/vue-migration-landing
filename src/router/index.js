const routes = [
  {
    path: '/',
    component: () => import('../pages/LandingPage.vue'),
  },
  {
    path: '/blog',
    component: () => import('../pages/blog/BlogIndex.vue'),
  },
  {
    path: '/blog/vue-2-end-of-life',
    component: () => import('../pages/blog/Vue2EndOfLife.vue'),
  },
  {
    path: '/blog/vue-2-to-vue-3-gotchas',
    component: () => import('../pages/blog/Vue2ToVue3Gotchas.vue'),
  },
  {
    path: '/blog/vuetify-2-to-vuetify-3-migration',
    component: () => import('../pages/blog/Vuetify2ToVuetify3.vue'),
  },
]

export { routes }
