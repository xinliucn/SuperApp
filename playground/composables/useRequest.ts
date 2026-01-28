import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

export const useRequest = <T = any>(url: string, options?: UseFetchOptions<T>) => {
  const config = useRuntimeConfig() // 获取 nuxt.config.ts 中的环境变量
  const headers = useRequestHeaders(['cookie'])
  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBase, // 设置统一的基础 URL
    // 请求拦截
    onRequest({ options }) {
      // 获取 token (假设存在 cookie 或 store 中)
      options.credentials = 'include' 
      if (process.server) {
        options.headers = {
          ...options.headers,
          ...headers // 这里的 headers 包含 { cookie: "key=value;..." }
        }
      }
    },

    // 响应拦截
    onResponse({ response }) {
      if (response.status === 401) {
        // 处理未登录逻辑
        // navigateTo('/login')
      }
    },

    // 错误处理
    onResponseError({ response }) {
      console.error('API Error:', response._data)
    }
  }

  // deep merge options
  const params = defu(options, defaults)

  return useFetch<T>(url, params as any)
}

/**
 * GET 请求
 */
export const useGet = <T = any>(url: string, options?: UseFetchOptions<T>) => {
  return useRequest<T>(url, { ...options, method: 'GET' })
}

/**
 * POST 请求
 */
export const usePost = <T = any>(
  url: string,
  body?: any,
  options?: UseFetchOptions<T>
) => {
  return useRequest<T>(url, { ...options, method: 'POST', body })
}

/**
 * PUT 请求
 */
export const usePut = <T = any>(
  url: string,
  body?: any,
  options?: UseFetchOptions<T>
) => {
  return useRequest<T>(url, { ...options, method: 'PUT', body })
}

/**
 * DELETE 请求
 */
export const useDelete = <T = any>(url: string, options?: UseFetchOptions<T>) => {
  return useRequest<T>(url, { ...options, method: 'DELETE' })
}

/**
 * PATCH 请求
 */
export const usePatch = <T = any>(
  url: string,
  body?: any,
  options?: UseFetchOptions<T>
) => {
  return useRequest<T>(url, { ...options, method: 'PATCH', body })
}