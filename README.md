# 个人博客网站

一个基于 HTML、CSS、JavaScript 的简洁个人博客，样式参考阮一峰博客，支持 Markdown 文档渲染。

## 功能特点

- 📝 支持 Markdown 格式的文章
- 🤖 **自动获取文章列表**（使用 GitHub API）
- 📋 支持 Front Matter 元数据（标题、日期、摘要）
- 🎨 简洁优雅的页面样式
- 📱 响应式设计，适配移动端
- 🚀 易于部署到 GitHub Pages

## 项目结构

```
Blog/
├── index.html          # 主页（文章列表）
├── article.html        # 文章详情页
├── css/
│   └── style.css      # 样式文件
├── js/
│   ├── config.js      # GitHub 仓库配置
│   ├── utils.js       # 工具函数（Front Matter 解析等）
│   ├── main.js        # 主页逻辑（使用 GitHub API）
│   └── article.js     # 文章页逻辑（使用 GitHub API）
├── posts/             # Markdown 文章目录
│   ├── post1.md
│   └── post2.md
└── README.md
```

## 使用方法

### 1. 配置 GitHub 仓库信息

编辑 `js/config.js` 文件，修改以下配置：

```javascript
const GITHUB_CONFIG = {
    owner: 'yourusername',        // 您的 GitHub 用户名
    repo: 'yourusername.github.io', // 仓库名称
    branch: 'main',               // 分支名称（main 或 master）
    postsPath: 'posts'            // 文章目录路径
};
```

### 2. 添加新文章

**方式一：使用 Front Matter（推荐）**

在 `posts/` 目录下创建 Markdown 文件，在文件开头添加元数据：

```markdown
---
title: 文章标题
date: 2024-01-03
excerpt: 文章摘要（可选）
---

# 文章标题

文章正文内容...
```

**方式二：使用文件名**

如果不想使用 Front Matter，可以使用带日期的文件名格式：
- `2024-01-03-文章标题.md`

系统会自动从文件名提取日期和标题。

**注意**：添加新文章后，只需推送到 GitHub，无需修改任何 JavaScript 代码！系统会自动从 GitHub API 获取文章列表。

### 3. 本地预览

**重要**：由于使用 GitHub API，本地预览需要：

1. 确保 `js/config.js` 中的配置正确
2. 使用本地服务器（GitHub API 需要从服务器环境访问）：

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx http-server
```

然后在浏览器访问 `http://localhost:8000`

**注意**：GitHub API 有速率限制（未认证 60次/小时）。如果频繁测试，建议：
- 使用 GitHub Personal Access Token（可选，见下方说明）
- 或者直接部署到 GitHub Pages 进行测试

### 4. 部署到 GitHub Pages

1. 在 GitHub 创建仓库（命名为 `yourusername.github.io`）
2. 确保 `js/config.js` 中的配置与您的仓库信息一致
3. 将代码推送到仓库：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```
4. 在仓库设置中启用 GitHub Pages（Settings → Pages → Source: main branch）
5. 等待几分钟后，访问 `https://yourusername.github.io` 查看博客

### 5. 可选：使用 GitHub Personal Access Token（提高 API 限制）

如果需要更高的 API 请求限制（5000次/小时），可以配置 Personal Access Token：

1. 在 GitHub 创建 Personal Access Token（Settings → Developer settings → Personal access tokens）
2. 在 `js/config.js` 中添加：
   ```javascript
   const GITHUB_CONFIG = {
       // ... 其他配置
       token: 'your_personal_access_token' // 可选
   };
   ```
3. 修改 `js/config.js` 中的 API 请求函数，添加 Authorization header

**注意**：Token 是敏感信息，如果添加到代码中，请确保仓库是私有的，或者使用环境变量（需要构建工具）。

## 技术栈

- **HTML5**: 页面结构
- **CSS3**: 样式设计
- **JavaScript (ES6+)**: 交互逻辑
- **GitHub API**: 自动获取文章列表和内容
- **Marked.js**: Markdown 解析库（通过 CDN 引入）

## 样式特点

- 简洁的排版设计
- 舒适的阅读体验
- 响应式布局
- 参考阮一峰博客的视觉风格

## 工作原理

1. **文章列表**：使用 GitHub API 获取 `posts/` 目录下的所有 `.md` 文件
2. **元数据提取**：从 Front Matter 或文件名中提取标题、日期、摘要等信息
3. **文章内容**：通过 GitHub Raw 链接直接获取 Markdown 文件内容
4. **Markdown 渲染**：使用 Marked.js 将 Markdown 转换为 HTML 并显示

## 后续优化建议

1. ✅ ~~使用 GitHub API 自动获取 Markdown 文件列表~~（已完成）
2. 添加文章分类和标签功能
3. 实现搜索功能
4. 添加 RSS 订阅
5. 优化 SEO（meta 标签、sitemap）
6. 添加评论系统（如 Giscus）
7. 代码语法高亮（highlight.js）
8. 文章缓存机制（减少 API 请求）

## 许可证

MIT License

