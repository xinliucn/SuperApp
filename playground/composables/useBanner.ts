// Banner 类型定义
export interface Banner {
  id: string
  Sort: string
  imageUrl: string | null
  imageUpload: string
  title?: string
}

// API 响应类型
interface BannerResponse {
  code: number
  data: {
    banners: Banner[]
    totalCount: number
  }
  user?: {
    user_id: string
    username: string
  }
  message: string
}

export const useBanner = () => {
  // 使用 useState 缓存 banner 数据
  const banners = useState<Banner[]>('banners', () => [])
  const loading = useState<boolean>('banners:loading', () => false)
  const error = useState<Error | null>('banners:error', () => null)

  // 获取首页 banner
  const fetchBanners = async () => {
    // 如果已经有数据，直接返回（避免重复请求）
    if (banners.value.length > 0) {
      return banners.value
    }

    try {
      loading.value = true
      error.value = null

      const response = await $fetch<BannerResponse>('/api/tenant/homePageBanner')

      if (response && response.code === 1 && response.data?.banners) {
        banners.value = response.data.banners
        return banners.value
      }

      return []
    } catch (err: any) {
      console.error('Failed to fetch banners:', err)
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // 刷新 banner 数据
  const refreshBanners = async () => {
    banners.value = []
    return await fetchBanners()
  }

  // 清除缓存
  const clearBanners = () => {
    banners.value = []
    error.value = null
  }

  return {
    banners,
    loading,
    error,
    fetchBanners,
    refreshBanners,
    clearBanners
  }
}