export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  try {
    // 获取客户端的请求头
    const cookieHeader = getRequestHeader(event, 'cookie')
    const userAgent = getRequestHeader(event, 'user-agent')

    // 调用 Windmill API 获取登录 URL
    const response = await $fetch<{ url: string }>(`${apiBase}/api/r/weaver/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...(cookieHeader && { cookie: cookieHeader }),
        ...(userAgent && { 'user-agent': userAgent })
      }
    })

    return response
  } catch (error: any) {
    console.error('Login API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '获取登录 URL 失败'
    })
  }
})
