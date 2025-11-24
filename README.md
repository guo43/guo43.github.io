# 个人博客网站

一个基于 HTML / CSS / JavaScript 的静态博客，支持在构建阶段将 `posts/*.md` 预渲染为 HTML，并输出到 `dist/` 目录，方便直接托管到 GitHub Pages、Cloudflare Pages 等静态 CDN。

## 功能特点

- 📝 撰写 Markdown 文章，支持简单 front matter（title/date/excerpt/slug/id）
- ⚙️ `npm run build` 一键将 Markdown 渲染为 HTML，并生成 `posts.json` 供前端索引
- 🚀 页面完全静态化，Cloudflare/Pages 可以直接缓存 `posts.json` 与 `posts/*.html`
- 🎨 自适应布局 + 代码高亮 + 滚动动画等前端特效

## 使用步骤

```bash
npm install
npm run build        # 构建输出至 dist/，默认清空并重建

# 若需要自定义输出目录，可通过环境变量
# PowerShell
$env:OUTPUT_DIR="." ; npm run build
# Linux / macOS
OUTPUT_DIR=. npm run build
```

构建脚本会执行以下任务：

1. 清空目标输出目录，仅保留本次构建生成的产物
2. 遍历 `posts/*.md`，解析 front matter 并使用 `marked` 渲染为 HTML，写入 `dist/posts/<slug>.html`
3. 将所有文章元数据输出为 `dist/posts.json`，供首页与文章页快速读取

部署时只需将根目录的静态页面（`index.html`/`article.html` 等）与 `dist` 目录一并上传即可。页面会在运行时读取 `dist/posts.json` 与 `dist/posts/*.html`。

## 许可证

MIT License

