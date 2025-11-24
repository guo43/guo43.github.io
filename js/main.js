// 文章列表数据（从静态 posts.json 加载）
let posts = [];

// 页面加载完成后获取文章列表
document.addEventListener('DOMContentLoaded', function() {
    loadPostsList();
});

// 从静态文件加载文章列表
async function loadPostsList() {
    const postsList = document.getElementById('postsList');
    
    if (!postsList) return;
    
    // 显示加载状态
    postsList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 0;">加载中...</p>';
    
    try {
        const response = await fetch(getPostsDataUrl(), { cache: 'no-store' });
        
        if (!response.ok) {
            throw new Error(`无法读取文章列表: ${response.status}`);
        }
        
        posts = await response.json();
        
        if (!Array.isArray(posts) || posts.length === 0) {
            postsList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 0;">暂无文章</p>';
            return;
        }
        
        renderPostsList();
        
    } catch (error) {
        console.error('加载文章列表失败:', error);
        postsList.innerHTML = `
            <div style="text-align: center; color: #e83e8c; padding: 40px 0;">
                <p>加载文章列表失败</p>
                <p style="font-size: 14px; color: #999; margin-top: 10px;">${error.message}</p>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">
                    请稍后再试或检查构建脚本是否成功生成 posts.json
                </p>
            </div>
        `;
    }
}

// 渲染文章列表
function renderPostsList() {
    const postsList = document.getElementById('postsList');
    
    if (!postsList) return;
    
    if (!posts.length) {
        postsList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 0;">暂无文章</p>';
        return;
    }
    
    const html = posts.map(post => `
        <div class="post-item">
            <h2 class="post-title">
                <a href="article.html?slug=${encodeURIComponent(post.slug)}">${post.title}</a>
            </h2>
            <div class="post-meta">${post.date || ''}</div>
            <div class="post-excerpt">${post.excerpt}</div>
        </div>
    `).join('');
    
    postsList.innerHTML = html;
    
    // 重新初始化滚动动画（因为文章是动态加载的）
    if (typeof initScrollAnimations === 'function') {
        setTimeout(() => {
            initScrollAnimations();
        }, 100);
    }
}

