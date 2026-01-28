<template>
  <div class="callback-page">
    <div class="callback-container">
      <!-- Logo and Title -->
      <div class="callback-header">
        <div class="callback-logo">
          <img src="../../assets/images/image002.jpg" alt="logo">
        </div>
      </div>

      <!-- Loading or Error Section -->
      <div class="callback-section">
        <div v-if="!error" class="loading-spinner"></div>
        <div class="callback-text">{{ statusText }}</div>
        <el-button v-if="error" type="primary" @click="handleRetry">
          重新登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 禁用默认布局
definePageMeta({
  layout: false
})

const route = useRoute()
const { handleCallback } = useAuth()

const statusText = ref('正在验证登录...')
const error = ref(false)

// 处理认证回调
const processCallback = async () => {
  try {
    // 调用 handleCallback 验证 cookie 并获取用户信息
    await handleCallback()

    // 验证成功
    statusText.value = '登录成功！正在跳转...'

    // 跳转到主页
    await navigateTo('/home')
  } catch (err: any) {
    console.error('Callback processing failed:', err)
    error.value = true
    statusText.value = '登录验证失败，请重试'
  }
}

// 重新登录
const handleRetry = () => {
  navigateTo('/')
}

// 页面加载时处理回调
onMounted(() => {
  processCallback()
})
</script>

<style scoped>
.callback-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecef 100%);
}

.callback-container {
  background: white;
  border-radius: 0.8rem;
  box-shadow: 0 4rem 20rem rgba(0, 0, 0, 0.15);
  width: 44rem;
  padding: 5rem 4rem;
}

.callback-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.callback-logo {
  width: 30rem;
  margin: 0 auto 20px;
}

.callback-logo img {
  width: 100%;
  display: block;
}

.callback-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  margin-top: 4rem;
  padding: 6rem 2rem;
}

.loading-spinner {
  width: 5rem;
  height: 5rem;
  border: 0.3rem solid #f0f0f0;
  border-top-color: #a52a2a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.callback-text {
  font-size: 1.4rem;
  color: #555;
  text-align: center;
  font-weight: 400;
}
</style>
