/**
 * 认证中间件
 * 用于保护需要登录才能访问的页面
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const { checkAuth } = useAuth()

  // 检查是否已登录
  if (!checkAuth()) {
    // 未登录，重定向到登录页
    // 保存原始目标路径，登录后可以跳转回来
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})
