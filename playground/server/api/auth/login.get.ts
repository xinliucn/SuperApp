export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  try {
    // 调用 Windmill API 获取登录 URL
    const response = await $fetch<{ url: string }>(`${apiBase}/api/r/weaver/auth/login`, {
      method: 'GET'
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
