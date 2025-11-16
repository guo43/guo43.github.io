// 从 Markdown 文件加载关于页面内容（可选功能）
// 如果不需要此功能，可以直接使用 about.html 中的静态内容

document.addEventListener('DOMContentLoaded', function() {
    // 检查是否要从 Markdown 加载
    const loadFromMarkdown = false; // 设置为 true 以启用从 Markdown 加载
    
    if (!loadFromMarkdown) {
        return; // 使用静态 HTML 内容
    }
    
    loadAboutFromMarkdown();
});

async function loadAboutFromMarkdown() {
    const articleContent = document.querySelector('.article-content');
    
    if (!articleContent) return;
    
    try {
        // 从 GitHub 获取 about.md 文件
        const response = await fetch(getPostDownloadUrl('about.md'));
        
        if (!response.ok) {
            throw new Error('无法加载 about.md 文件');
        }
        
        const markdown = await response.text();
        const { metadata, content } = parseFrontMatter(markdown);
        
        // 使用 marked.js 将 Markdown 转换为 HTML
        const html = marked.parse(content);
        
        // 更新标题（如果有）
        if (metadata.title) {
            const titleElement = document.querySelector('.article-title');
            if (titleElement) {
                titleElement.textContent = metadata.title;
            }
        }
        
        // 渲染内容
        articleContent.innerHTML = html;
        
    } catch (error) {
        console.error('加载关于页面失败:', error);
        // 如果加载失败，保持原有的静态内容
    }
}

