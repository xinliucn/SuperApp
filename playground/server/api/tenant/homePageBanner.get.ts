export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    
    try {
        // 获取客户端的所有请求头
        const cookieHeader = getRequestHeader(event, 'cookie')
        const userAgent = getRequestHeader(event, 'user-agent')
        const referer = getRequestHeader(event, 'referer')

        // 调用 Windmill API 获取首页横幅数据，转发 cookie 和相关请求头
        const response = await $fetch(`${apiBase}/api/r/cms/banners`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                ...(cookieHeader && { cookie: cookieHeader }),
                ...(userAgent && { 'user-agent': userAgent }),
                ...(referer && { referer: referer })
            }
        })

        return response
    } catch (error: any) {
        console.error('Get home page banner API error:', error)

        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || '获取首页横幅数据失败'
        })
    }
})
