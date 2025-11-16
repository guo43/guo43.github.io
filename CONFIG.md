# 配置说明

## GitHub 仓库配置

编辑 `js/config.js` 文件，根据您的实际情况修改以下配置：

```javascript
const GITHUB_CONFIG = {
    owner: 'yourusername',              // 您的 GitHub 用户名
    repo: 'yourusername.github.io',     // 仓库名称
    branch: 'main',                     // 分支名称（main 或 master）
    postsPath: 'posts'                  // 文章目录路径
};
```

### 配置示例

**示例 1：标准 GitHub Pages 仓库**
```javascript
const GITHUB_CONFIG = {
    owner: 'zhangsan',
    repo: 'zhangsan.github.io',
    branch: 'main',
    postsPath: 'posts'
};
```

**示例 2：自定义仓库名称**
```javascript
const GITHUB_CONFIG = {
    owner: 'zhangsan',
    repo: 'my-blog',                    // 仓库名称不是 username.github.io
    branch: 'main',
    postsPath: 'posts'
};
```

**示例 3：使用其他分支**
```javascript
const GITHUB_CONFIG = {
    owner: 'zhangsan',
    repo: 'zhangsan.github.io',
    branch: 'master',                  // 使用 master 分支
    postsPath: 'posts'
};
```

## Front Matter 格式

在 Markdown 文件开头使用 Front Matter 来定义文章元数据：

```markdown
---
title: 文章标题
date: 2024-01-01
excerpt: 文章摘要（可选）
---

# 文章标题

文章正文内容...
```

### Front Matter 字段说明

- `title`: 文章标题（必需）
- `date`: 发布日期，格式：`YYYY-MM-DD`（可选，默认使用文件名或当前日期）
- `excerpt`: 文章摘要（可选，默认从正文提取前 150 个字符）

## 文件名格式

如果不使用 Front Matter，可以使用以下文件名格式：

### 格式 1：带日期的文件名
```
2024-01-01-文章标题.md
```

系统会自动提取：
- 日期：`2024-01-01`
- 标题：`文章标题`（将连字符替换为空格）

### 格式 2：简单文件名
```
文章标题.md
```

系统会使用：
- 日期：当前日期
- 标题：`文章标题`（将连字符替换为空格）

## 常见问题

### Q: 如何找到我的 GitHub 用户名？

A: 登录 GitHub 后，右上角头像旁边显示的就是您的用户名。

### Q: 如何找到仓库名称？

A: 在 GitHub 仓库页面，URL 格式为：`https://github.com/username/repo-name`，其中 `repo-name` 就是仓库名称。

### Q: 如何知道使用哪个分支？

A: 在 GitHub 仓库页面，点击分支下拉菜单，通常显示 `main` 或 `master`。

### Q: 本地测试时出现 CORS 错误怎么办？

A: GitHub API 需要从服务器环境访问。请使用本地服务器（如 `python -m http.server`）而不是直接打开 HTML 文件。

### Q: API 请求失败怎么办？

A: 检查以下几点：
1. `js/config.js` 中的配置是否正确
2. 仓库是否为公开仓库（私有仓库需要认证）
3. 网络连接是否正常
4. GitHub API 是否可用（访问 https://api.github.com 测试）

### Q: 如何提高 API 请求限制？

A: 使用 GitHub Personal Access Token（详见 README.md 中的说明）。注意：Token 是敏感信息，不要提交到公开仓库。

