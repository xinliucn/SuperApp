<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Logo and Title -->
      <div class="login-header">
        <div class="login-logo">
          <img src="../assets/images/image002.jpg" alt="logo">
        </div>
        <div class="subtitle">New Portal Experience</div>
      </div>

      <!-- Loading Indicator -->
      <div class="loading-section">
        <div class="loading-spinner"></div>
        <div class="loading-text">{{ loadingText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 禁用默认布局，登录页面不需要导航栏
definePageMeta({
  layout: false
})

const { checkAuth, login } = useAuth()
const loadingText = ref('正在检查登录状态...')

const loginInit = async () => {
  try {
    // 检查是否已登录（通过调用 API 验证 cookie）
    const isLoggedIn = await checkAuth()
    console.log('Login status:', isLoggedIn);
    
    if (isLoggedIn) {
      // 已登录，跳转到首页
      loadingText.value = '登录成功！'
      await navigateTo('/home')
    } else {
      // 未登录，获取登录 URL 并跳转
      loadingText.value = '正在跳转到登录页面...'
      await login()
    }
  } catch (error) {
    console.error('Login initialization failed:', error)
    loadingText.value = '登录失败，请刷新页面重试'
  }
}

// 页面加载时初始化登录流程
onMounted(async () => {
  await loginInit()
})
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecef 100%);
}

.login-container {
  background: white;
  border-radius: 0.8rem;
  -webkit-box-shadow: 0 4rem 20rem rgba(0, 0, 0, 0.15);
  box-shadow: 0 4rem 20rem rgba(0, 0, 0, 0.15);
  width: 44rem;
  padding: 5rem 4rem;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

  .login-logo {
    width: 30rem;
    margin: 0 auto 20px;

    img {
      width: 100%;
      display: block;
    }
  }
}

.loading-section {
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

.loading-text {
  font-size: 1.4rem;
  color: #555;
  text-align: center;
  font-weight: 400;
}
</style>
