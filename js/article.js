// 获取 URL 参数
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

let postsMetadataCache = null;

// 页面加载完成后加载文章内容
document.addEventListener('DOMContentLoaded', function() {
    const identifier = getPreferredIdentifier();
    
    if (!identifier) {
        document.getElementById('articleContent').innerHTML = 
            '<p style="text-align: center; color: #999; padding: 40px 0;">缺少文章参数</p>';
        return;
    }
    
    loadArticle(identifier);
});

function getPreferredIdentifier() {
    return getUrlParameter('slug') || getUrlParameter('file');
}

async function getPostsMetadata() {
    if (postsMetadataCache) {
        return postsMetadataCache;
    }
    
    const response = await fetch(getPostsDataUrl(), { cache: 'no-store' });
    if (!response.ok) {
        throw new Error('无法加载文章索引');
    }
    
    postsMetadataCache = await response.json();
    return postsMetadataCache;
}

async function findPost(identifier) {
    const metadata = await getPostsMetadata();
    if (!Array.isArray(metadata)) return null;
    
    return metadata.find(post => {
        if (!post) return false;
        const baseFilename = post.filename ? post.filename.replace(/\.md$/i, '') : '';
        return post.slug === identifier
            || post.id === identifier
            || post.filename === identifier
            || baseFilename === identifier;
    });
}

// 加载文章内容
async function loadArticle(identifier) {
    const articleContent = document.getElementById('articleContent');
    
    // 显示加载状态
    articleContent.innerHTML = `
        <div class="article-header">
            <h1 class="article-title">加载中...</h1>
        </div>
        <div class="article-content" id="markdownContent">
            <p>正在加载文章内容...</p>
        </div>
    `;
    
    try {
        const post = await findPost(identifier);
        
        if (!post) {
            throw new Error('文章不存在或尚未生成');
        }
        
        const response = await fetch(getPostHtmlUrl(post.slug), { cache: 'no-store' });
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('文章内容未生成，请重新构建');
            }
            throw new Error(`加载失败: ${response.status}`);
        }
        
        const html = await response.text();
        const displayDate = formatDate(post.date);
        
        // 渲染到页面
        articleContent.innerHTML = `
            <div class="article-header">
                <h1 class="article-title">${post.title}</h1>
                <div class="article-meta">${displayDate || ''}</div>
            </div>
            <div class="article-content">
                ${html}
            </div>
        `;
        
        // 更新页面标题
        document.title = `${post.title} - 我的博客`;
        
        // 代码高亮
        if (typeof hljs !== 'undefined') {
            setTimeout(() => {
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }, 50);
        }
        
        // 重新初始化特效（因为内容是动态加载的）
        setTimeout(() => {
            if (typeof initCodeCopyButtons === 'function') {
                initCodeCopyButtons();
            }
            if (typeof initImageLazyLoad === 'function') {
                initImageLazyLoad();
            }
            if (typeof initScrollAnimations === 'function') {
                initScrollAnimations();
            }
        }, 200);
        
    } catch (error) {
        console.error('加载文章失败:', error);
        articleContent.innerHTML = `
            <div style="text-align: center; color: #e83e8c; padding: 40px 0;">
                <p>加载文章失败</p>
                <p style="font-size: 14px; color: #999; margin-top: 10px;">${error.message}</p>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">
                    <a href="index.html" style="color: #0066cc;">返回首页</a>
                </p>
            </div>
        `;
    }
}

