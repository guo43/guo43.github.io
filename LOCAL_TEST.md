# 本地测试指南

## 为什么需要本地服务器？

由于项目使用 GitHub API 获取文章列表，浏览器有 CORS（跨域资源共享）限制，直接打开 HTML 文件（`file://` 协议）无法访问 GitHub API。因此需要使用本地服务器来测试。

## 方法一：使用 Python（推荐）

### Python 3.x

```bash
# 在项目根目录下执行
python -m http.server 8000
```

### Python 2.x

```bash
# 在项目根目录下执行
python -m SimpleHTTPServer 8000
```

然后在浏览器访问：`http://localhost:8000`

## 方法二：使用 Node.js

### 使用 http-server（需要先安装）

```bash
# 全局安装 http-server
npm install -g http-server

# 在项目根目录下执行
http-server -p 8000
```

### 使用 npx（无需安装）

```bash
# 在项目根目录下执行
npx http-server -p 8000
```

然后在浏览器访问：`http://localhost:8000`

## 方法三：使用 VS Code Live Server

1. 在 VS Code 中安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## 方法四：使用 PHP

```bash
# 在项目根目录下执行
php -S localhost:8000
```

## 测试步骤

### 1. 确保配置正确

检查 `js/config.js` 中的配置：

```javascript
const GITHUB_CONFIG = {
    owner: 'guo43',              // 您的 GitHub 用户名
    repo: 'guo43.github.io',     // 仓库名称
    branch: 'master',            // 分支名称
    postsPath: 'posts'           // 文章目录路径
};
```

### 2. 启动本地服务器

选择上述任一方法启动服务器。

### 3. 打开浏览器

访问：`http://localhost:8000`

### 4. 检查浏览器控制台

按 `F12` 打开开发者工具，查看 Console 标签：

- **如果看到错误**：检查错误信息
  - `404` 错误：仓库或路径不存在，检查配置
  - `CORS` 错误：确保使用本地服务器而不是直接打开文件
  - `Network` 错误：检查网络连接

- **如果看到成功**：应该能看到文章列表或文章内容

## 常见问题

### Q: 提示 "仓库或路径不存在"

**可能原因：**
1. 仓库名称配置错误
2. 仓库是私有的（GitHub API 只能访问公开仓库）
3. 分支名称错误（master vs main）
4. `posts/` 目录不存在或为空

**解决方法：**
1. 检查 `js/config.js` 中的配置
2. 访问 `https://github.com/guo43/guo43.github.io` 确认仓库存在且为公开
3. 确认仓库中有 `posts/` 目录且包含 `.md` 文件

### Q: 提示 "CORS 错误"

**原因：** 直接打开了 HTML 文件（`file://` 协议）

**解决方法：** 使用本地服务器（见上方方法）

### Q: 文章列表为空

**可能原因：**
1. `posts/` 目录下没有 `.md` 文件
2. 文件格式不正确
3. API 请求失败

**解决方法：**
1. 检查 `posts/` 目录下是否有 `.md` 文件
2. 查看浏览器控制台的错误信息
3. 访问 `https://api.github.com/repos/guo43/guo43.github.io/contents/posts?ref=master` 测试 API

### Q: 本地测试时 API 请求很慢

**原因：** GitHub API 有速率限制，未认证用户每小时 60 次请求

**解决方法：**
1. 减少刷新次数
2. 使用 GitHub Personal Access Token（见 README.md）
3. 或者直接部署到 GitHub Pages 测试

## 测试检查清单

- [ ] 配置了正确的 GitHub 用户名和仓库名
- [ ] 配置了正确的分支名称（master/main）
- [ ] 使用本地服务器而不是直接打开文件
- [ ] 仓库是公开的
- [ ] `posts/` 目录存在且包含 `.md` 文件
- [ ] 浏览器控制台没有错误信息
- [ ] 能看到文章列表或文章内容

## 快速测试命令

在项目根目录下执行：

```bash
# Windows PowerShell
python -m http.server 8000

# 或使用 Node.js
npx http-server -p 8000
```

然后打开浏览器访问：`http://localhost:8000`

## 测试 API 连接

在浏览器中直接访问以下 URL 测试 API 是否可用：

```
https://api.github.com/repos/guo43/guo43.github.io/contents/posts?ref=master
```

如果能看到 JSON 格式的文件列表，说明 API 连接正常。

