export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase

    try {
        // 获取客户端的所有请求头
        const cookieHeader = getRequestHeader(event, 'cookie')
        const userAgent = getRequestHeader(event, 'user-agent')
        const referer = getRequestHeader(event, 'referer')

        // 调用 Windmill API 获取首页横幅数据，使用 raw 获取完整响应
        const response = await $fetch.raw(`${apiBase}/api/r/cms/banners`, {
            method: 'POST',
            headers: {
                ...(cookieHeader && { cookie: cookieHeader }),
                ...(userAgent && { 'user-agent': userAgent }),
                ...(referer && { referer: referer })
            }
        })

        // 转发 Windmill 返回的 Set-Cookie 到客户端
        const setCookieHeaders = response.headers.get('set-cookie')
        if (setCookieHeaders) {
            setHeader(event, 'set-cookie', setCookieHeaders)
        }

        return response._data
    } catch (error: any) {
        console.error('Get home page banner API error:', error)

        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || '获取首页横幅数据失败'
        })
    }
})
