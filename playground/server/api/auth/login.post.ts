export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  try {
    // 获取客户端的请求头
    const cookieHeader = getRequestHeader(event, 'cookie')
    const userAgent = getRequestHeader(event, 'user-agent')

    // 调用 Windmill API 获取登录 URL，使用 raw 获取完整响应
    const response = await $fetch.raw<{ url: string }>(`${apiBase}/api/r/weaver/auth/login`, {
      method: 'POST',
      headers: {
        ...(cookieHeader && { cookie: cookieHeader }),
        ...(userAgent && { 'user-agent': userAgent })
      }
    })

    // 转发 Windmill 返回的 Set-Cookie 到客户端
    const setCookieHeaders = response.headers.get('set-cookie')
    if (setCookieHeaders) {
      setHeader(event, 'set-cookie', setCookieHeaders)
    }

    return response._data
  } catch (error: any) {
    console.error('Login API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '获取登录 URL 失败'
    })
  }
})
