<template>
  <div class="layout-default">
    <header class="header">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo">
          <img src="../assets/images/image002.jpg" alt="DCH Logo" height="32">
        </div>

        <!-- 左侧导航 -->
        <nav class="left-nav">
          <el-dropdown @command="handleWorkspaceCommand" class="nav-dropdown">
            <span class="nav-item">
              Workspace
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="dch-group">DCH Group</el-dropdown-item>
                <el-dropdown-item command="dch-mainland">DCH Mainland China</el-dropdown-item>
                <el-dropdown-item command="legal-compliance">Group Legal & Compliance</el-dropdown-item>
                <el-dropdown-item command="by-department">By Department</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown @command="handleApplicationsCommand" class="nav-dropdown">
            <span class="nav-item">
              My Applications
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="all-apps">All Applications</el-dropdown-item>
                <el-dropdown-item command="digital-tech">Group Digital and Technology ›</el-dropdown-item>
                <el-dropdown-item command="finance">Group Finance ›</el-dropdown-item>
                <el-dropdown-item command="legal">Group Legal and Compliance ›</el-dropdown-item>
                <el-dropdown-item command="hr">Group HR ›</el-dropdown-item>
                <el-dropdown-item command="dchbi">DCHBI</el-dropdown-item>
                <el-dropdown-item command="data-maintenance">Common Data Maintenance ›</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown @command="handleMoreCommand" class="more-dropdown">
            <span class="nav-item">
              ···
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="process-center">Process Center ›</el-dropdown-item>
                <el-dropdown-item command="knowledge-base">Knowledge Base ›</el-dropdown-item>
                <el-dropdown-item command="organization">Organization ›</el-dropdown-item>
                <el-dropdown-item command="info-center">Info Center ›</el-dropdown-item>
                <el-dropdown-item command="delegation">Delegation</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </nav>

        <!-- 右侧工具栏 -->
        <div class="right-toolbar">
          <!-- 搜索框 -->
          <div class="search-box">
            <input type="text" placeholder="Search" class="search-input">
            <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>

          <!-- 图标组 -->
          <div class="icon-group">
            <!-- 通知图标 -->
            <button class="icon-btn">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
            </button>

            <!-- 更多图标 -->
            <button class="icon-btn">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>

            <!-- 用户下拉菜单 -->
            <el-dropdown @command="handleUserCommand" class="user-dropdown">
              <div class="user-info">
                <div class="user-avatar">
                  <img src="https://via.placeholder.com/32" alt="User">
                </div>
                <span class="user-name">User</span>
                <svg class="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                </svg>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="language">Language</el-dropdown-item>
                  <el-dropdown-item command="personalization">Personalization</el-dropdown-item>
                  <el-dropdown-item command="password">Password Settings</el-dropdown-item>
                  <el-dropdown-item command="theme">Theme Center</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>Logout</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </header>

    <main class="main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuth()

const handleLogout = async () => {
  try {
    await logout()
    // logout 函数会处理跳转到 Windmill 登出页面
    // 如果没有 logout_url，则跳转到首页
  } catch (error) {
    console.error('❌ 登出失败:', error)
    // 即使失败也跳转到首页
    navigateTo('/')
  }
}

// Workspace 下拉菜单处理函数
const handleWorkspaceCommand = (command: string) => {
  console.log('Workspace 选择了:', command)
  switch (command) {
    case 'dch-group':
      console.log('跳转到 DCH Group')
      break
    case 'dch-mainland':
      console.log('跳转到 DCH Mainland China')
      break
    case 'legal-compliance':
      console.log('跳转到 Group Legal & Compliance')
      break
    case 'by-department':
      console.log('跳转到 By Department')
      break
  }
}

// My Applications 下拉菜单处理函数
const handleApplicationsCommand = (command: string) => {
  console.log('Applications 选择了:', command)
  switch (command) {
    case 'all-apps':
      console.log('查看所有应用')
      break
    case 'digital-tech':
      console.log('跳转到 Group Digital and Technology')
      break
    case 'finance':
      console.log('跳转到 Group Finance')
      break
    case 'legal':
      console.log('跳转到 Group Legal and Compliance')
      break
    case 'hr':
      console.log('跳转到 Group HR')
      break
    case 'dchbi':
      console.log('跳转到 DCHBI')
      break
    case 'data-maintenance':
      console.log('跳转到 Common Data Maintenance')
      break
  }
}

// 更多菜单处理函数
const handleMoreCommand = (command: string) => {
  console.log('更多菜单选择了:', command)
  switch (command) {
    case 'process-center':
      console.log('跳转到 Process Center')
      break
    case 'knowledge-base':
      console.log('跳转到 Knowledge Base')
      break
    case 'organization':
      console.log('跳转到 Organization')
      break
    case 'info-center':
      console.log('跳转到 Info Center')
      break
    case 'delegation':
      console.log('跳转到 Delegation')
      break
  }
}

// 用户菜单处理函数
const handleUserCommand = (command: string) => {
  switch (command) {
    case 'language':
      console.log('切换语言')
      break
    case 'personalization':
      console.log('个性化设置')
      break
    case 'password':
      console.log('密码设置')
      break
    case 'theme':
      console.log('主题中心')
      break
    case 'logout':
      handleLogout()
      break
  }
}
</script>

<style scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-bottom: 0.1rem solid #e5e7eb;
  z-index: 1000;
  height: 8rem;
}

.header-content {
  max-width: 192rem;
  margin: 0 auto;
  height: 100%;
  padding: 0 2.4rem;
  display: flex;
  align-items: center;
  gap: 3.2rem;
}

.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo img {
  height: 3.2rem;
  width: auto;
}

.left-nav {
  display: flex;
  align-items: center;
  gap: 2.4rem;
  flex: 1;
}

.nav-item {
  color: #374151;
  font-size: 1.4rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.8rem 1.2rem;
  border-radius: 0.6rem;
  transition: all 0.2s;
  cursor: pointer;
}

.nav-item:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.more-dropdown {
  display: inline-flex;
}

.right-toolbar {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-left: auto;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 24rem;
  height: 3.6rem;
  padding: 0 3.6rem 0 1.2rem;
  border: 0.1rem solid transparent;
  border-radius: 0.6rem;
  font-size: 1.4rem;
  color: #374151;
  background-color: transparent;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #e5e7eb;
  background-color: #ffffff;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-icon {
  position: absolute;
  right: 1.2rem;
  color: #6b7280;
  pointer-events: none;
}

.icon-group {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.icon-btn {
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: #6b7280;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.user-dropdown {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.4rem 0.8rem 0.4rem 0.4rem;
  border-radius: 2rem;
  transition: all 0.2s;
}

.user-info:hover {
  background-color: #f3f4f6;
}

.user-avatar {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e5e7eb;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 1.4rem;
  font-weight: 500;
  color: #374151;
}

.dropdown-arrow {
  color: #6b7280;
}

.main {
  margin-top: 8rem;
  flex: 1;
  padding: 2.4rem;
  background-color: #f9fafb;
}

/* 响应式样式 */
@media (max-width: 1024px) {
  .header {
    height: 6rem;
  }

  .header-content {
    padding: 0 2rem;
    gap: 2rem;
  }

  .main {
    margin-top: 6rem;
    padding: 1.6rem;
  }

  .left-nav {
    gap: 1.6rem;
  }

  .nav-item {
    font-size: 1.3rem;
    padding: 0.6rem 1rem;
  }

  .search-input {
    width: 18rem;
  }
}

@media (max-width: 768px) {
  .header {
    height: 5.6rem;
  }

  .header-content {
    padding: 0 1.6rem;
    gap: 1.2rem;
  }

  .logo img {
    height: 2.4rem;
  }

  .left-nav {
    gap: 1rem;
  }

  .nav-item {
    font-size: 1.2rem;
    padding: 0.5rem 0.8rem;
  }

  .search-box {
    display: none;
  }

  .icon-group {
    gap: 0.4rem;
  }

  .icon-btn {
    width: 3.2rem;
    height: 3.2rem;
  }

  .user-name {
    display: none;
  }

  .user-avatar {
    width: 2.8rem;
    height: 2.8rem;
  }

  .main {
    margin-top: 5.6rem;
    padding: 1.2rem;
  }
}

@media (max-width: 480px) {
  .header {
    height: 5rem;
  }

  .header-content {
    padding: 0 1.2rem;
    gap: 0.8rem;
  }

  .logo img {
    height: 2rem;
  }

  .left-nav {
    display: flex;
    gap: 0.4rem;
  }

  .nav-dropdown,
  .more-dropdown {
    display: inline-flex;
  }

  .nav-item {
    font-size: 1.1rem;
    padding: 0.4rem 0.6rem;
  }

  .right-toolbar {
    gap: 0.4rem;
  }

  .icon-btn {
    width: 3rem;
    height: 3rem;
  }

  .icon-btn:first-child {
    display: none;
  }

  .user-avatar {
    width: 2.6rem;
    height: 2.6rem;
  }

  .main {
    margin-top: 5rem;
    padding: 0;
  }
}
</style>
