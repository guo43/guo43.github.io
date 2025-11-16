// 文章列表数据（从 GitHub API 获取）
let posts = [];

// 页面加载完成后获取文章列表
document.addEventListener('DOMContentLoaded', function() {
    loadPostsList();
});

// 从 GitHub API 加载文章列表
async function loadPostsList() {
    const postsList = document.getElementById('postsList');
    
    if (!postsList) return;
    
    // 显示加载状态
    postsList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 0;">加载中...</p>';
    
    try {
        // 获取 posts 目录下的文件列表
        const response = await fetch(getPostsListApiUrl());
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('仓库或路径不存在，请检查 config.js 中的配置');
            }
            throw new Error(`GitHub API 请求失败: ${response.status}`);
        }
        
        const files = await response.json();
        
        // 过滤出 .md 文件并按日期排序
        const mdFiles = files
            .filter(file => file.name.endsWith('.md') && file.type === 'file')
            .sort((a, b) => {
                // 按文件名倒序排列（新的在前）
                return b.name.localeCompare(a.name);
            });
        
        if (mdFiles.length === 0) {
            postsList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 0;">暂无文章</p>';
            return;
        }
        
        // 获取每篇文章的元数据
        posts = await Promise.all(
            mdFiles.map(async (file) => {
                try {
                    // 获取文件内容（仅用于提取元数据）
                    const contentResponse = await fetch(getPostDownloadUrl(file.name));
                    if (!contentResponse.ok) {
                        throw new Error(`无法加载文件: ${file.name}`);
                    }
                    
                    const markdown = await contentResponse.text();
                    const { metadata, content } = parseFrontMatter(markdown);
                    
                    // 提取文章信息
                    const filenameInfo = extractInfoFromFilename(file.name);
                    const title = metadata.title || extractTitleFromContent(content) || filenameInfo.title;
                    const date = metadata.date || filenameInfo.date;
                    const excerpt = metadata.excerpt || extractExcerpt(content);
                    
                    return {
                        id: generatePostId(file.name),
                        title: title,
                        date: formatDate(date),
                        filename: file.name,
                        excerpt: excerpt
                    };
                } catch (error) {
                    console.error(`处理文件 ${file.name} 时出错:`, error);
                    // 返回基本信息
                    const filenameInfo = extractInfoFromFilename(file.name);
                    return {
                        id: generatePostId(file.name),
                        title: filenameInfo.title,
                        date: filenameInfo.date,
                        filename: file.name,
                        excerpt: '加载失败'
                    };
                }
            })
        );
        
        // 按日期排序（新的在前）
        posts.sort((a, b) => b.date.localeCompare(a.date));
        
        // 渲染文章列表
        renderPostsList();
        
    } catch (error) {
        console.error('加载文章列表失败:', error);
        postsList.innerHTML = `
            <div style="text-align: center; color: #e83e8c; padding: 40px 0;">
                <p>加载文章列表失败</p>
                <p style="font-size: 14px; color: #999; margin-top: 10px;">${error.message}</p>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">
                    请检查 js/config.js 中的 GitHub 配置是否正确
                </p>
            </div>
        `;
    }
}

// 渲染文章列表
function renderPostsList() {
    const postsList = document.getElementById('postsList');
    
    if (!postsList) return;
    
    if (posts.length === 0) {
        postsList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 0;">暂无文章</p>';
        return;
    }
    
    const html = posts.map(post => `
        <div class="post-item">
            <h2 class="post-title">
                <a href="article.html?id=${post.id}&file=${encodeURIComponent(post.filename)}">${post.title}</a>
            </h2>
            <div class="post-meta">${post.date}</div>
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

