export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  try {
    // 获取客户端的请求头
    const cookieHeader = getRequestHeader(event, 'cookie')
    const userAgent = getRequestHeader(event, 'user-agent')

    // 调用 Windmill API 登出，使用 raw 获取完整响应
    const response = await $fetch.raw(`${apiBase}/api/r/weaver/auth/logout`, {
      method: 'POST',
      headers: {
        ...(cookieHeader && { cookie: cookieHeader }),
        ...(userAgent && { 'user-agent': userAgent })
      }
    })

    // 转发 Windmill 返回的 Set-Cookie 到客户端（清除 cookie）
    const setCookieHeaders = response.headers.get('set-cookie')
    if (setCookieHeaders) {
      setHeader(event, 'set-cookie', setCookieHeaders)
    }

    return response._data
  } catch (error: any) {
    console.error('Logout API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '登出失败'
    })
  }
})
