// 横幅随机图片加载

// 随机图片 API 配置
const BANNER_CONFIG = {
    // 图片尺寸
    width: 1200,
    height: 200,
    
    // 图片分类关键词（风景、艺术、素描）
    keywords: ['landscape', 'art', 'sketch', 'nature', 'painting', 'drawing', 'watercolor', 'abstract'],
    
    // API 优先级列表（按顺序尝试）
    // 'unsplash' - 支持分类，优先尝试
    // 'picsum' - 备用方案，不支持分类但更可靠
    apiPriority: ['unsplash', 'picsum'],
    
    // 当前尝试的 API 索引
    currentApiIndex: 0,
};

// 获取随机图片 URL
function getRandomImageUrl(apiType = null) {
    const random = Math.floor(Math.random() * 10000);
    const timestamp = Date.now();
    const api = apiType || BANNER_CONFIG.apiPriority[BANNER_CONFIG.currentApiIndex];
    
    switch (api) {
        case 'unsplash':
            // Unsplash Source API - 支持分类搜索
            // 尝试多种 URL 格式以提高成功率
            const keywords = BANNER_CONFIG.keywords.join(',');
            
            // 方法1：使用逗号分隔的关键词
            const url1 = `https://source.unsplash.com/${BANNER_CONFIG.width}x${BANNER_CONFIG.height}/?${keywords}&sig=${random}&t=${timestamp}`;
            
            // 方法2：随机选择一个关键词
            const randomKeyword = BANNER_CONFIG.keywords[Math.floor(Math.random() * BANNER_CONFIG.keywords.length)];
            const url2 = `https://source.unsplash.com/${BANNER_CONFIG.width}x${BANNER_CONFIG.height}/?${randomKeyword}&sig=${random}&t=${timestamp}`;
            
            // 随机选择一种方法
            return Math.random() > 0.5 ? url1 : url2;
        
        case 'picsum':
            // Picsum Photos - 备用方案，不支持分类但更可靠
            return `https://picsum.photos/${BANNER_CONFIG.width}/${BANNER_CONFIG.height}?random=${random}&t=${timestamp}`;
        
        default:
            return `https://picsum.photos/${BANNER_CONFIG.width}/${BANNER_CONFIG.height}?random=${random}&t=${timestamp}`;
    }
}

// 加载横幅图片
function loadBannerImage(apiIndex = 0, retryCount = 0) {
    const bannerImage = document.getElementById('bannerImage');
    
    if (!bannerImage) {
        console.warn('横幅图片元素未找到');
        return;
    }
    
    // 如果所有 API 都尝试过了，使用渐变背景
    if (apiIndex >= BANNER_CONFIG.apiPriority.length) {
        console.warn('所有图片 API 都加载失败，使用渐变背景');
        bannerImage.style.display = 'none';
        // 容器已经有渐变背景，所以隐藏图片即可
        return;
    }
    
    // 更新当前 API 索引
    BANNER_CONFIG.currentApiIndex = apiIndex;
    
    // 获取当前 API 的图片 URL
    const apiType = BANNER_CONFIG.apiPriority[apiIndex];
    
    // 对于 Unsplash，如果失败可以重试（最多3次）
    const maxRetries = apiType === 'unsplash' ? 3 : 1;
    if (retryCount >= maxRetries) {
        console.warn(`图片加载失败，已重试 ${retryCount} 次，尝试下一个 API`);
        loadBannerImage(apiIndex + 1, 0);
        return;
    }
    
    const imageUrl = getRandomImageUrl(apiType);
    
    // 创建新的 Image 对象预加载
    const img = new Image();
    
    // 设置超时（Unsplash 可能需要更长时间，Picsum 较快）
    const timeoutDuration = apiType === 'unsplash' ? 10000 : 5000;
    const timeout = setTimeout(() => {
        console.warn(`图片加载超时 (${apiType})，重试 ${retryCount + 1}/${maxRetries}`);
        img.onerror();
    }, timeoutDuration);
    
    img.onload = function() {
        clearTimeout(timeout);
        // 图片加载成功后显示
        bannerImage.src = imageUrl;
        bannerImage.classList.add('loaded');
        
        // 移除加载动画
        const container = bannerImage.parentElement;
        if (container) {
            container.style.setProperty('--loading', 'none');
        }
        
        console.log(`✅ 图片加载成功 (${apiType})`);
    };
    
    img.onerror = function() {
        clearTimeout(timeout);
        // 如果加载失败，重试或尝试下一个 API
        if (retryCount < maxRetries - 1) {
            console.warn(`图片加载失败 (${apiType})，重试 ${retryCount + 1}/${maxRetries}`);
            // 延迟一下再重试
            setTimeout(() => {
                loadBannerImage(apiIndex, retryCount + 1);
            }, 500);
        } else {
            console.warn(`图片加载失败 (${apiType})，尝试下一个 API`);
            loadBannerImage(apiIndex + 1, 0);
        }
    };
    
    // 开始加载
    img.src = imageUrl;
    
    // 添加跨域属性（如果需要）
    img.crossOrigin = 'anonymous';
}

// 页面加载完成后加载图片
document.addEventListener('DOMContentLoaded', function() {
    loadBannerImage();
});

// 可选：点击图片刷新
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'bannerImage') {
        // 双击刷新图片
        if (e.detail === 2) {
            const bannerImage = document.getElementById('bannerImage');
            if (bannerImage) {
                bannerImage.classList.remove('loaded');
                bannerImage.style.display = ''; // 恢复显示
                BANNER_CONFIG.currentApiIndex = 0; // 重置 API 索引
                loadBannerImage();
            }
        }
    }
});

