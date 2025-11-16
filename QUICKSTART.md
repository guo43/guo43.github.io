# 快速开始指南

## 5 分钟快速部署

### 步骤 1：配置仓库信息（1 分钟）

编辑 `js/config.js`，修改为您的 GitHub 信息：

```javascript
const GITHUB_CONFIG = {
    owner: 'yourusername',        // 改为您的 GitHub 用户名
    repo: 'yourusername.github.io', // 改为您的仓库名
    branch: 'main',               // 改为您的分支名
    postsPath: 'posts'
};
```

### 步骤 2：创建 GitHub 仓库（2 分钟）

1. 登录 GitHub
2. 点击右上角 "+" → "New repository"
3. 仓库名填写：`yourusername.github.io`（yourusername 改为您的用户名）
4. 选择 Public，点击 "Create repository"

### 步骤 3：推送代码（1 分钟）

在项目目录下执行：

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### 步骤 4：启用 GitHub Pages（1 分钟）

1. 在 GitHub 仓库页面，点击 "Settings"
2. 左侧菜单找到 "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main" → "/ (root)"
5. 点击 "Save"

### 步骤 5：访问博客

等待 1-2 分钟后，访问：`https://yourusername.github.io`

## 添加第一篇文章

1. 在 `posts/` 目录下创建 `hello-world.md`：

```markdown
---
title: 你好，世界
date: 2024-01-01
excerpt: 这是我的第一篇文章
---

# 你好，世界

欢迎来到我的博客！
```

2. 推送到 GitHub：

```bash
git add posts/hello-world.md
git commit -m "Add first post"
git push
```

3. 刷新博客页面，新文章会自动出现！

## 工作原理

- ✅ 系统自动从 GitHub API 获取 `posts/` 目录下的所有 `.md` 文件
- ✅ 自动解析 Front Matter 或从文件名提取信息
- ✅ 无需修改任何 JavaScript 代码
- ✅ 只需添加 Markdown 文件并推送即可

## 需要帮助？

- 查看 [README.md](README.md) 了解详细功能
- 查看 [CONFIG.md](CONFIG.md) 了解配置选项
- 遇到问题？检查浏览器控制台的错误信息

