// 构建后的静态内容配置
const STATIC_CONTENT_CONFIG = {
    postsData: 'dist/posts.json',
    postsDirectory: 'dist/posts'
};

function getPostsDataUrl() {
    return STATIC_CONTENT_CONFIG.postsData;
}

function getPostHtmlUrl(slug) {
    return `${STATIC_CONTENT_CONFIG.postsDirectory}/${slug}.html`;
}

