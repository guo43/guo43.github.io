// 工具函数

// 解析 Markdown 前置元数据（Front Matter）
// 支持 YAML 格式的 front matter，例如：
// ---
// title: 文章标题
// date: 2024-01-01
// ---
function parseFrontMatter(markdown) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);
    
    if (!match) {
        return {
            metadata: {},
            content: markdown
        };
    }
    
    const metadataText = match[1];
    const content = match[2];
    const metadata = {};
    
    // 简单的 YAML 解析（仅支持 key: value 格式）
    metadataText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            metadata[key] = value;
        }
    });
    
    return { metadata, content };
}

// 从文件名提取文章信息（如果没有 front matter）
function extractInfoFromFilename(filename) {
    // 移除 .md 扩展名
    const nameWithoutExt = filename.replace(/\.md$/, '');
    
    // 尝试从文件名提取日期（格式：2024-01-01-title.md）
    const dateMatch = nameWithoutExt.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    if (dateMatch) {
        return {
            date: dateMatch[1],
            title: dateMatch[2].replace(/-/g, ' ')
        };
    }
    
    // 如果没有日期，使用文件名作为标题
    return {
        date: new Date().toISOString().split('T')[0],
        title: nameWithoutExt.replace(/-/g, ' ')
    };
}

// 从 Markdown 内容提取标题（如果没有 front matter）
function extractTitleFromContent(markdown) {
    // 查找第一个 # 标题
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    if (titleMatch) {
        return titleMatch[1].trim();
    }
    return '无标题';
}

// 从 Markdown 内容提取摘要（前 150 个字符）
function extractExcerpt(content) {
    // 移除标题、代码块、链接等
    let text = content
        .replace(/^#+\s+.+$/gm, '') // 移除标题
        .replace(/```[\s\S]*?```/g, '') // 移除代码块
        .replace(/`[^`]+`/g, '') // 移除行内代码
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // 移除链接，保留文本
        .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // 移除图片
        .trim();
    
    // 取前 150 个字符
    if (text.length > 150) {
        text = text.substring(0, 150) + '...';
    }
    
    return text || '暂无摘要';
}

// 生成文章 ID（基于文件名）
function generatePostId(filename) {
    return filename.replace(/\.md$/, '').replace(/[^a-zA-Z0-9]/g, '-');
}

// 格式化日期
function formatDate(dateString) {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (e) {
        return dateString;
    }
}

// Base64 解码
function decodeBase64(base64) {
    try {
        return atob(base64);
    } catch (e) {
        console.error('Base64 解码失败:', e);
        return '';
    }
}

