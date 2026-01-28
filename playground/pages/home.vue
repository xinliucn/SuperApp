<template>
  <div class="home-page">
    <!-- 主要内容区域 -->
    <div class="content-grid">
      <!-- 左侧：Process & Applications -->
      <div class="section applications-section">
        <h2 class="section-title">Process & Applications</h2>
        <div class="app-grid">
          <div class="app-item" v-for="app in applications" :key="app.name" @click="handleAppClick(app)">
            <el-icon class="app-icon" :size="32">
              <component :is="app.icon" />
            </el-icon>
            <div class="app-name">{{ app.name }}</div>
          </div>
        </div>
      </div>

      <!-- 中间：主要内容区 -->
      <div class="main-content">
        <!-- Banner 轮播 -->
        <div class="section banner-section">
          <!-- 加载状态 -->
          <div v-if="bannersLoading" class="banner-loading">
            <el-skeleton :rows="0" animated>
              <template #template>
                <div class="banner-skeleton">
                  <el-skeleton-item variant="text" style="width: 40%; height: 40px; margin-bottom: 20px;" />
                  <el-skeleton-item variant="text" style="width: 60%; height: 24px;" />
                </div>
              </template>
            </el-skeleton>
          </div>
          <!-- 轮播图内容 -->
          <el-carousel v-else-if="apiBanners.length" :interval="5000" height="300px" :arrow="carouselArrow">
            <el-carousel-item v-for="(banner, index) in apiBanners" :key="banner.id || index">
              <div class="banner-item" :style="{ backgroundImage: `url(${banner.imageUpload || banner.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
                <div class="banner-content">
                  <h3 v-if="banner.title" class="banner-title">{{ banner.title }}</h3>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <!-- 错误状态 -->
          <div v-else-if="bannersError" class="banner-error">
            加载失败，请稍后重试
          </div>
          <!-- 空状态 -->
          <div v-else class="banner-empty">
            暂无轮播图
          </div>
        </div>

        <!-- Departmental Portal -->
        <div class="section">
          <h2 class="section-title">Departmental Portal</h2>
          <div class="portal-grid">
            <div class="portal-item" v-for="portal in portals" :key="portal.name" @click="handlePortalClick(portal)">
              <el-icon class="portal-icon" :size="40">
                <component :is="portal.icon" />
              </el-icon>
              <div class="portal-name">{{ portal.name }}</div>
            </div>
          </div>
        </div>

        <!-- Tasks Section -->
        <div class="section tasks-section">
          <el-tabs v-model="activeTab" class="tasks-tabs">
            <el-tab-pane label="My Outstanding Tasks" name="outstanding">
              <div class="task-list">
                <div class="task-item" v-for="task in tasks" :key="task.id">
                  <div class="task-title">{{ task.title }}</div>
                  <div class="task-meta">
                    <span class="task-author">{{ task.author }}</span>
                    <span class="task-date">{{ task.date }}</span>
                  </div>
                  <div class="task-time">{{ task.time }}</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Followed Tasks" name="followed">
              <div class="empty-state">暂无关注的任务</div>
            </el-tab-pane>
            <el-tab-pane label="My Completed Tasks" name="completed">
              <div class="empty-state">暂无已完成的任务</div>
            </el-tab-pane>
            <el-tab-pane label="My Pending Request" name="pending">
              <div class="empty-state">暂无待处理的请求</div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!-- News Section -->
        <div class="section news-section">
          <h2 class="section-title">News</h2>
          <div class="news-banner">
            <div class="news-content">最新公告和新闻将在这里显示</div>
          </div>
        </div>
      </div>

      <!-- 右侧：eShop -->
      <div class="section eshop-section">
        <h2 class="section-title">eShop</h2>
        <div class="shop-grid">
          <div class="shop-item" v-for="shop in shops" :key="shop.name" @click="handleShopClick(shop)">
            <el-icon class="shop-icon" :size="40">
              <component :is="shop.icon" />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import {
  OfficeBuilding,
  Edit,
  Check,
  Document,
  Message,
  Monitor,
  DataAnalysis,
  Grape,
  User,
  Management,
  ShoppingCart,
  Van,
  House,
  Present
} from '@element-plus/icons-vue'

definePageMeta({
  layout: 'default',
})

// 使用 useBanner composable 获取 banner 数据
const { banners: apiBanners, loading: bannersLoading, error: bannersError, fetchBanners } = useBanner()
const { checkAuth, login } = useAuth()

// 页面加载时获取 banner 数据
onMounted(async () => {
  try {
    const isLoggedIn = await checkAuth()
    if (isLoggedIn) {
        await fetchBanners()
    }
  } catch (err) {
    console.error('Failed to load banners:', err)
  }
})

const activeTab = ref('outstanding')

// 轮播图箭头显示控制（根据屏幕尺寸）
const carouselArrow = ref<'always' | 'hover' | 'never'>('never')

// 监听窗口尺寸变化
const updateArrow = () => {
  if (typeof window !== 'undefined') {
    carouselArrow.value = window.innerWidth > 900 ? 'always' : 'never'
  }
}

onMounted(() => {
  updateArrow()
  window.addEventListener('resize', updateArrow)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateArrow)
  }
})

// Workspace 下拉菜单数据
const workspaceMenuItems = ref([
  { label: 'DCH Group', url: '' },
  { label: 'DCH Mainland China', url: '' },
  { label: 'Group Legal & Compliance', url: '' },
  { label: 'By Department', url: '' },
])

// My Applications 下拉菜单数据
const applicationsMenuItems = ref([
  { label: 'All Applications', url: '', hasSubmenu: false },
  { label: 'Group Digital and Technology', url: '', hasSubmenu: true },
  { label: 'Group Finance', url: '', hasSubmenu: true },
  { label: 'Group Legal and Compliance', url: '', hasSubmenu: true },
  { label: 'Group HR', url: '', hasSubmenu: true },
  { label: 'DCHBI', url: '', hasSubmenu: false },
  { label: 'Common Data Maintenance', url: '', hasSubmenu: true },
])

// 更多菜单数据
const moreMenuItems = ref([
  { label: 'Process Center', url: '', hasSubmenu: true },
  { label: 'Knowledge Base', url: '', hasSubmenu: true },
  { label: 'Organization', url: '', hasSubmenu: true },
  { label: 'Info Center', url: '', hasSubmenu: true },
  { label: 'Delegation', url: '', hasSubmenu: false },
])

// 应用列表
const applications = ref([
  {
    name: 'GLC Portal',
    icon: markRaw(OfficeBuilding),
    url: 'https://oa.dchbipoc.cc/wui/cas-entrance.jsp?path=https://oa.dchbipoc.cc/mobilemode/mobile/view.html?appid=1'
  },
  {
    name: 'CCA 手機申請',
    icon: markRaw(Edit),
    url: 'https://oa.dchbipoc.cc/wui/cas-entrance.jsp?path=https://oa.dchbipoc.cc/mobilemode/mobile/view.html?appHomepageId=4'
  },
  {
    name: 'CCA 審批/查看',
    icon: markRaw(Check),
    url: 'https://oa.dchbipoc.cc/wui/cas-entrance.jsp?path=https://oa.dchbipoc.cc/mobilemode/mobile/view.html?appHomepageId=3'
  },
  {
    name: 'CCA 合同列表',
    icon: markRaw(Document),
    url: 'https://oa.dchbipoc.cc/wui/cas-entrance.jsp?path=https://oa.dchbipoc.cc/mobilemode/mobile/view.html?appHomepageId=2'
  },
  { name: 'Letter to DCH', icon: markRaw(Message), url: '' },
  { name: 'ePortal', icon: markRaw(Monitor), url: '' },
  { name: 'Group HRMS', icon: markRaw(DataAnalysis), url: '' },
])

// 点击应用图标
const handleAppClick = (app: any) => {
  if (app.url) {
    window.open(app.url, '_blank')
  } else {
    console.log('点击了:', app.name)
  }
}

// 部门门户
const portals = ref([
  { name: 'DCH Green', icon: markRaw(Grape), url: '' },
  { name: 'Group HR', icon: markRaw(User), url: '' },
  { name: 'Group Legal & Compliance', icon: markRaw(Management), url: '' },
])

// 点击门户图标
const handlePortalClick = (portal: any) => {
  if (portal.url) {
    window.open(portal.url, '_blank')
  } else {
    console.log('点击了:', portal.name)
  }
}

// 任务列表
const tasks = ref([
  {
    id: 1,
    title: 'CM制造变更--CK Admin--2025-12-08',
    author: 'CK Admin',
    date: '2025-12-08',
    time: '2025-12-08 01:18:46'
  }
])

// 商店列表
const shops = ref([
  { name: 'Shop 1', icon: markRaw(ShoppingCart), url: '' },
  { name: 'Shop 2', icon: markRaw(Van), url: '' },
  { name: 'Shop 3', icon: markRaw(House), url: '' },
  { name: 'Shop 4', icon: markRaw(Present), url: '' },
])

// 点击商店图标
const handleShopClick = (shop: any) => {
  if (shop.url) {
    window.open(shop.url, '_blank')
  } else {
    console.log('点击了:', shop.name)
  }
}
</script>

<style scoped>
/* ========================================
   移动优先样式 - 从小屏幕开始设计
   ======================================== */

/* 全局重置 */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 页面容器 */
.home-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

/* 内容容器 - 移动端单列布局 */
.content-grid {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem;
  width: 100%;
}

/* 卡片容器 */
.section {
  background: #ffffff;
  border-radius: 0.8rem;
  padding: 1.2rem;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  overflow: hidden;
}

/* 标题 */
.section-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.2rem;
}

/* ========================================
   应用图标网格
   ======================================== */
.app-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 9rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 0 0 calc(50% - 0.4rem);
}

.app-item:active {
  background-color: #f3f4f6;
}

.app-icon {
  flex-shrink: 0;
  width: 3.2rem;
  height: 3.2rem;
  margin-bottom: 0.8rem;
  color: #6b7280;
}

.app-icon :deep(.el-icon) {
  width: 100% !important;
  height: 100% !important;
  font-size: 2.8rem !important;
}

.app-name {
  font-size: 1.2rem;
  color: #374151;
  text-align: center;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

/* ========================================
   轮播图
   ======================================== */
.banner-section {
  padding: 0;
}

.banner-loading,
.banner-item {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-loading {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  padding: 2rem;
}

.banner-skeleton {
  width: 100%;
  max-width: 600px;
}

.banner-item {
  position: relative;
  overflow: hidden;
}

.banner-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #ffffff;
  padding: 2rem;
}

.banner-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
}

.banner-description {
  font-size: 1.4rem;
  opacity: 0.95;
  text-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
}

/* 移动端隐藏轮播图箭头 - 已通过组件属性控制 */
.banner-section :deep(.el-carousel__indicators) {
  bottom: 1rem;
}

.banner-section :deep(.el-carousel__button) {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
}

.banner-error,
.banner-empty {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 1.4rem;
  border-radius: 0.8rem;
}

/* ========================================
   部门门户
   ======================================== */
.portal-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.portal-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 0.8rem;
  min-height: 9rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 0 0 calc(50% - 0.4rem);
}

.portal-item:active {
  background-color: #f3f4f6;
}

.portal-icon {
  flex-shrink: 0;
  width: 3.2rem;
  height: 3.2rem;
  margin-bottom: 0.8rem;
  color: #6b7280;
}

.portal-icon :deep(.el-icon) {
  width: 100% !important;
  height: 100% !important;
  font-size: 3.2rem !important;
}

.portal-name {
  font-size: 1.2rem;
  color: #374151;
  text-align: center;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

/* ========================================
   任务列表
   ======================================== */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.task-item {
  padding: 1.6rem 1.2rem;
  border: 0.1rem solid #e5e7eb;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #ffffff;
  min-height: 8rem;
}

.task-item:active {
  border-color: #3b82f6;
  box-shadow: 0 0.2rem 0.8rem rgba(59, 130, 246, 0.1);
}

.task-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.2rem;
  line-height: 1.5;
  word-break: break-word;
  overflow-wrap: break-word;
}

.task-meta {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 1.3rem;
  color: #6b7280;
  margin-bottom: 0.8rem;
}

.task-author {
  font-weight: 500;
}

.task-date {
  color: #9ca3af;
}

.task-time {
  font-size: 1.2rem;
  color: #9ca3af;
}

.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  color: #9ca3af;
  font-size: 1.4rem;
}

/* ========================================
   新闻横幅
   ======================================== */
.news-banner {
  background: linear-gradient(135deg, #7c2d12 0%, #991b1b 100%);
  border-radius: 0.8rem;
  padding: 1.6rem;
  min-height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.news-content {
  color: #ffffff;
  font-size: 1.4rem;
  text-align: center;
  word-break: break-word;
  overflow-wrap: break-word;
}

/* ========================================
   商店网格
   ======================================== */
.shop-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.shop-item {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.4rem;
  border: 0.1rem solid #e5e7eb;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 9rem;
  flex: 0 0 calc(50% - 0.4rem);
}

.shop-item:active {
  border-color: #3b82f6;
  background-color: #f9fafb;
}

.shop-icon {
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  color: #6b7280;
}

.shop-icon :deep(.el-icon) {
  width: 100% !important;
  height: 100% !important;
  font-size: 4rem !important;
}

/* ========================================
   小屏手机优化 (< 480px)
   ======================================== */
@media (max-width: 480px) {
  .content-grid {
    padding: 1rem;
    gap: 1rem;
  }

  .section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .app-item,
  .portal-item {
    padding: 0.8rem;
    min-height: 8rem;
  }

  .app-icon,
  .portal-icon {
    width: 2.8rem;
    height: 2.8rem;
  }

  .app-icon :deep(.el-icon) {
    font-size: 2.4rem !important;
  }

  .portal-icon :deep(.el-icon) {
    font-size: 2.8rem !important;
  }

  .app-name,
  .portal-name {
    font-size: 1.1rem;
  }

  .banner-item {
    height: 160px;
  }

  .banner-title {
    font-size: 1.6rem;
  }

  .banner-description {
    font-size: 1.2rem;
  }

  .task-item {
    padding: 1.4rem 1rem;
    min-height: 7rem;
  }

  .task-title {
    font-size: 1.4rem;
  }

  .news-banner {
    padding: 1.4rem;
    min-height: 8rem;
  }

  .news-content {
    font-size: 1.2rem;
  }

  .shop-item {
    padding: 1.2rem;
    min-height: 8rem;
  }

  .shop-icon {
    width: 3.2rem;
    height: 3.2rem;
  }

  .shop-icon :deep(.el-icon) {
    font-size: 3.2rem !important;
  }
}

/* ========================================
   平板设备 (> 900px)
   ======================================== */
@media (min-width: 901px) {
  .content-grid {
    gap: 2rem;
    padding: 2rem;
  }

  .section {
    padding: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 1.6rem;
  }

  .app-grid {
    gap: 1.2rem;
  }

  .app-item {
    padding: 1.6rem;
    flex: 0 0 calc(25% - 0.9rem);
  }

  .portal-grid {
    gap: 1.2rem;
  }

  .portal-item {
    padding: 2rem;
    flex: 0 0 calc(33.333% - 0.8rem);
  }

  .shop-grid {
    gap: 1.2rem;
  }

  .shop-item {
    flex: 0 0 calc(33.333% - 0.8rem);
  }

  .banner-item {
    height: 300px;
  }

  .banner-title {
    font-size: 3.2rem;
    margin-bottom: 1.6rem;
  }

  .banner-description {
    font-size: 1.8rem;
  }
}

/* ========================================
   桌面端 (> 1200px) - 三栏布局
   ======================================== */
@media (min-width: 1201px) {
  .content-grid {
    flex-direction: row;
    gap: 2.4rem;
    padding: 2.4rem;
    max-width: 160rem;
    margin: 0 auto;
  }

  .applications-section {
    flex: 3;
  }

  .main-content {
    flex: 4;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  .eshop-section {
    flex: 3;
  }

  .section {
    padding: 2.4rem;
  }

  .app-item:hover {
    background-color: #f3f4f6;
  }

  .portal-item:hover {
    background-color: #f3f4f6;
  }

  .task-item:hover {
    border-color: #3b82f6;
    box-shadow: 0 0.2rem 0.8rem rgba(59, 130, 246, 0.1);
  }

  .shop-item:hover {
    border-color: #3b82f6;
    background-color: #f9fafb;
  }
}
</style>
