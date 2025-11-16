// GitHub 仓库配置
// 请根据您的实际情况修改以下配置
const GITHUB_CONFIG = {
    // GitHub 用户名
    owner: 'guo43',
    // 仓库名称（如果是 GitHub Pages，通常是 yourusername.github.io）
    repo: 'guo43.github.io',
    // 分支名称（通常是 main 或 master）
    branch: 'master',
    // 文章目录路径
    postsPath: 'posts'
};

// 获取 GitHub API 基础 URL
function getGitHubApiBaseUrl() {
    return `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`;
}

// 获取文章列表 API URL
function getPostsListApiUrl() {
    return `${getGitHubApiBaseUrl()}/contents/${GITHUB_CONFIG.postsPath}?ref=${GITHUB_CONFIG.branch}`;
}

// 获取文章内容 API URL
function getPostContentApiUrl(filename) {
    return `${getGitHubApiBaseUrl()}/contents/${GITHUB_CONFIG.postsPath}/${filename}?ref=${GITHUB_CONFIG.branch}`;
}

// 获取文章下载 URL（直接下载，不需要解码 base64）
function getPostDownloadUrl(filename) {
    return `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.postsPath}/${filename}`;
}

