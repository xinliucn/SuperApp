# 多阶段构建 Dockerfile for Nuxt SSR (Monorepo with Yarn)

# ============================================
# 阶段 1: 构建阶段
# ============================================
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装 yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# 复制整个项目（包括根目录的 package.json 和 workspace 配置）
COPY package*.json yarn.lock ./
COPY src/ ./src/
COPY playground/ ./playground/

# 安装所有依赖
RUN yarn install --frozen-lockfile

# 准备和构建 superApp 模块
WORKDIR /app
RUN yarn dev:prepare

# 进入 playground 目录构建
WORKDIR /app/playground
RUN yarn build

# ============================================
# 阶段 2: 运行阶段
# ============================================
FROM node:20-alpine AS runner

# 设置工作目录
WORKDIR /app

# 安装 curl（用于健康检查）
RUN apk add --no-cache curl

# 复制构建产物
COPY --from=builder /app/playground/.output /app/.output

# 暴露端口
EXPOSE 80

# 设置环境变量
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=80

# 健康检查
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:80/ || exit 1

# 启动应用
CMD ["node", ".output/server/index.mjs"]
