export interface User {
  username: string
  email?: string
}

export const useAuth = () => {
  // 使用 useState 创建响应式状态
  const user = useState<User | null>('auth:user', () => null)
  const isLoggedIn = useState<boolean>('auth:isLoggedIn', () => false)

  // 登录函数
  const login = (username: string, password: string) => {
    // 这里可以添加实际的 API 调用
    // 现在只是模拟验证
    if (username && password) {
      user.value = {
        username,
        email: `${username}@example.com`
      }
      isLoggedIn.value = true

      // 可选：保存到 localStorage 以便刷新后恢复
      if (process.client) {
        localStorage.setItem('auth:user', JSON.stringify(user.value))
        localStorage.setItem('auth:isLoggedIn', 'true')
      }

      return true
    }
    return false
  }

  // 登出函数
  const logout = () => {
    user.value = null
    isLoggedIn.value = false

    // 清除 localStorage
    if (process.client) {
      localStorage.removeItem('auth:user')
      localStorage.removeItem('auth:isLoggedIn')
    }
  }

  // 从 localStorage 恢复登录状态
  const restoreAuth = () => {
    if (process.client) {
      const savedUser = localStorage.getItem('auth:user')
      const savedIsLoggedIn = localStorage.getItem('auth:isLoggedIn')

      if (savedUser && savedIsLoggedIn === 'true') {
        user.value = JSON.parse(savedUser)
        isLoggedIn.value = true
      }
    }
  }

  // 检查是否已登录
  const checkAuth = () => {
    if (!isLoggedIn.value) {
      restoreAuth()
    }
    return isLoggedIn.value
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    restoreAuth,
    checkAuth
  }
}
