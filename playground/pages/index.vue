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

<script setup>
// 禁用默认布局，登录页面不需要导航栏
definePageMeta({
  layout: false
})

// const { data, error, pending } = await useGet<User>('/api/r/weaver/auth/user')

const loadingText = ref('Login failed')

const loginInit = async () => {
  try {
    // 更新状态为检查中
    loadingText.value = 'Checking login status...'
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 2000))
    if (true) {
      // 已登录，跳转到首页
      loadingText.value = 'Login successful!'
      await navigateTo('/home')
    } else {
      loadingText.value = 'Login failed'
    }
  } catch (error) {
    console.error('Login check failed:', error)
    loadingText.value = 'Login failed'
  }
}

// 页面加载时检查是否已登录
onMounted(async () => {
loginInit()
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
