export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  try {
    // 获取客户端的所有请求头
    const cookieHeader = getRequestHeader(event, 'cookie')
    const userAgent = getRequestHeader(event, 'user-agent')
    const referer = getRequestHeader(event, 'referer')

    // 调用 Windmill API 获取用户信息，转发 cookie 和相关请求头
    const response = await $fetch(`${apiBase}/api/r/weaver/auth/user`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...(cookieHeader && { cookie: cookieHeader }),
        ...(userAgent && { 'user-agent': userAgent }),
        ...(referer && { referer: referer })
      }
    })

    return response
  } catch (error: any) {
    console.error('Get user API error:', error)

    // 如果是 401 错误，说明未登录
    if (error.statusCode === 401) {
      throw createError({
        statusCode: 401,
        message: '未登录'
      })
    }

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '获取用户信息失败'
    })
  }
})
