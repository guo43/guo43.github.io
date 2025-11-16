// 获取 URL 参数
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 页面加载完成后加载文章内容
document.addEventListener('DOMContentLoaded', function() {
    const filename = getUrlParameter('file');
    
    if (!filename) {
        document.getElementById('articleContent').innerHTML = 
            '<p style="text-align: center; color: #999; padding: 40px 0;">缺少文章文件名参数</p>';
        return;
    }
    
    loadArticle(filename);
});

// 加载文章内容
async function loadArticle(filename) {
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
        // 从 GitHub 获取 Markdown 文件内容
        const response = await fetch(getPostDownloadUrl(filename));
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('文章文件不存在');
            }
            throw new Error(`加载失败: ${response.status}`);
        }
        
        const markdown = await response.text();
        
        // 解析前置元数据
        const { metadata, content } = parseFrontMatter(markdown);
        
        // 提取文章信息
        const filenameInfo = extractInfoFromFilename(filename);
        const title = metadata.title || extractTitleFromContent(content) || filenameInfo.title;
        const date = metadata.date || filenameInfo.date;
        
        // 使用 marked.js 将 Markdown 转换为 HTML
        const html = marked.parse(content);
        
        // 渲染到页面
        articleContent.innerHTML = `
            <div class="article-header">
                <h1 class="article-title">${title}</h1>
                <div class="article-meta">${formatDate(date)}</div>
            </div>
            <div class="article-content">
                ${html}
            </div>
        `;
        
        // 更新页面标题
        document.title = `${title} - 我的博客`;
        
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
        }, 100);
        
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

