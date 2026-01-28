export interface User {
  username: string
  email?: string
}

export const useAuth = () => {
  // 使用 useState 创建响应式状态
  const user = useState<User | null>('auth:user', () => null)
  const isLoggedIn = useState<boolean>('auth:isLoggedIn', () => false)

  // 登录函数 - 获取登录 URL 并跳转
  const login = async () => {
    try {
      // 调用 Nitro 代理接口获取登录 URL
      const response = await $fetch<{ url: string }>('/api/auth/login')

      if (response?.url) {
        // 跳转到 Windmill 登录页面
        if (import.meta.client) {
          window.location.href = response.url
        }
      } else {
        throw new Error('未获取到登录 URL')
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  // 处理回调 - 验证 cookie 并获取用户信息
  const handleCallback = async () => {
    try {
      // 调用 Nitro 代理接口验证 cookie 并获取用户信息
      const userData = await $fetch<User>('/api/auth/user')

      if (userData) {
        user.value = userData
        isLoggedIn.value = true
        return true
      }

      return false
    } catch (error) {
      console.error('Callback handling failed:', error)
      throw error
    }
  }

  // 检查登录状态 - 通过调用 API 验证 cookie
  const checkAuth = async () => {
    try {
      // 调用 Nitro 代理接口（不是直接调用 Windmill API）
      const userData = await $fetch<User>('/api/auth/user')
      console.log('checkAuth userData:', userData);
      
      if (userData) {
        user.value = userData
        isLoggedIn.value = true
        return true
      }

      return false
    } catch (error) {
      // 401 错误表示未登录
      user.value = null
      isLoggedIn.value = false
      return false
    }
  }

  // 登出函数
  const logout = () => {
    user.value = null
    isLoggedIn.value = false
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    handleCallback,
    checkAuth
  }
}
