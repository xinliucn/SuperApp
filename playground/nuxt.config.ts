export default defineNuxtConfig({
  modules: ['superApp', '@element-plus/nuxt'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  myModule: {},
  devServer: {
    port: 5173
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://windmill-uat.dchbi.app'
    }
  },
  // 优化 CSS 加载
  css: [],

  vite: {
    css: {
      devSourcemap: true
    }
  }
})
