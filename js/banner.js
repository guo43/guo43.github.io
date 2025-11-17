// 横幅随机图片加载

// 随机图片 API 配置
const BANNER_CONFIG = {
    // 图片尺寸
    width: 1200,
    height: 200,
    
    // API 优先级列表（按顺序尝试）
    // 'picsum' - 最可靠，无需 API key，但不支持分类
    // 'unsplash' - 支持分类但可能不稳定
    apiPriority: ['picsum', 'unsplash'],
    
    // 当前尝试的 API 索引
    currentApiIndex: 0,
};

// 获取随机图片 URL
function getRandomImageUrl(apiType = null) {
    const random = Math.floor(Math.random() * 10000);
    const timestamp = Date.now();
    const api = apiType || BANNER_CONFIG.apiPriority[BANNER_CONFIG.currentApiIndex];
    
    switch (api) {
        case 'picsum':
            // Picsum Photos - 最可靠，无需 API key
            // 虽然不支持分类，但图片质量不错
            return `https://picsum.photos/${BANNER_CONFIG.width}/${BANNER_CONFIG.height}?random=${random}&t=${timestamp}`;
        
        case 'unsplash':
            // Unsplash Source API - 支持分类搜索（可能不稳定）
            // 格式：https://source.unsplash.com/宽度x高度/?关键词
            const keywords = 'landscape,art,sketch,nature,painting,drawing';
            return `https://source.unsplash.com/${BANNER_CONFIG.width}x${BANNER_CONFIG.height}/?${keywords}&sig=${random}&t=${timestamp}`;
        
        default:
            return `https://picsum.photos/${BANNER_CONFIG.width}/${BANNER_CONFIG.height}?random=${random}&t=${timestamp}`;
    }
}

// 加载横幅图片
function loadBannerImage(apiIndex = 0) {
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
    const imageUrl = getRandomImageUrl(apiType);
    
    // 创建新的 Image 对象预加载
    const img = new Image();
    
    // 设置超时（8秒）
    const timeout = setTimeout(() => {
        console.warn(`图片加载超时 (${apiType})，尝试下一个 API`);
        img.onerror();
    }, 8000);
    
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
    };
    
    img.onerror = function() {
        clearTimeout(timeout);
        // 如果加载失败，尝试下一个 API
        console.warn(`图片加载失败 (${apiType})，尝试下一个 API`);
        loadBannerImage(apiIndex + 1);
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

