<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// 全局应用配置
useHead({
  title: 'SuperApp - Nuxt Module',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 62.5%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  /* 防止 FOUC - 在样式加载前隐藏内容 */
  opacity: 1;
  transition: opacity 0.1s ease-in;
}

/* 确保布局容器立即可见 */
#__nuxt {
  min-height: 100vh;
}
</style>
