// 特效 JavaScript 文件

// 页面加载完成后初始化特效
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否通过服务器访问（而不是直接打开文件）
    const isLocalFile = window.location.protocol === 'file:';
    if (isLocalFile) {
        console.warn('⚠️ 检测到直接打开文件，某些特效可能无法正常工作。建议使用本地服务器（如 python -m http.server 8000）');
    }
    
    // 延迟初始化，确保所有内容加载完成
    setTimeout(() => {
        try {
            initScrollAnimations();
            initBackToTop();
            initCodeCopyButtons();
            initImageLazyLoad();
            initSmoothScroll();
        } catch (error) {
            console.error('❌ 特效初始化失败:', error);
        }
    }, 100);
});

// 滚动淡入动画
function initScrollAnimations() {
    const elements = document.querySelectorAll('.post-item:not(.fade-in), .article:not(.fade-in)');
    
    if (elements.length === 0) return;
    
    // 使用 Intersection Observer API
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 观察一次后取消观察，提高性能
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// 返回顶部按钮
function initBackToTop() {
    // 创建返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', '返回顶部');
    document.body.appendChild(backToTopBtn);
    
    // 监听滚动事件
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 代码块复制按钮
function initCodeCopyButtons() {
    // 等待文章内容加载完成
    setTimeout(() => {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach((codeBlock, index) => {
            const pre = codeBlock.parentElement;
            
            // 跳过已经有复制按钮的代码块
            if (pre.parentElement.classList.contains('code-block-wrapper')) {
                return;
            }
            
            // 创建包装器
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
            
            // 创建复制按钮
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-code-btn';
            copyBtn.textContent = '复制';
            copyBtn.setAttribute('aria-label', '复制代码');
            wrapper.appendChild(copyBtn);
            
            // 复制功能
            copyBtn.addEventListener('click', async function() {
                const text = codeBlock.textContent;
                
                try {
                    await navigator.clipboard.writeText(text);
                    copyBtn.textContent = '已复制!';
                    copyBtn.classList.add('copied');
                    
                    setTimeout(() => {
                        copyBtn.textContent = '复制';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    // 降级方案：使用传统方法
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.select();
                    
                    try {
                        document.execCommand('copy');
                        copyBtn.textContent = '已复制!';
                        copyBtn.classList.add('copied');
                        
                        setTimeout(() => {
                            copyBtn.textContent = '复制';
                            copyBtn.classList.remove('copied');
                        }, 2000);
                    } catch (err) {
                        copyBtn.textContent = '复制失败';
                    }
                    
                    document.body.removeChild(textArea);
                }
            });
        });
    }, 500);
}

// 图片懒加载和淡入动画
function initImageLazyLoad() {
    const images = document.querySelectorAll('.article-content img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (img.src) {
                // 如果图片已经有 src，直接显示
                img.classList.add('loaded');
            } else if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    } else {
        // 降级方案：直接加载所有图片
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.classList.add('loaded');
        });
    }
}

// 平滑滚动增强
function initSmoothScroll() {
    // 为所有锚点链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面显示时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

// 鼠标跟随效果（可选，轻量级）
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 为链接添加鼠标跟随效果（可选）
function addMouseFollowEffect() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// 文章卡片点击效果
document.addEventListener('click', function(e) {
    const postItem = e.target.closest('.post-item');
    if (postItem && !e.target.closest('a')) {
        const link = postItem.querySelector('.post-title a');
        if (link) {
            // 添加点击动画
            postItem.style.transform = 'scale(0.98)';
            setTimeout(() => {
                postItem.style.transform = '';
            }, 150);
        }
    }
});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC 键返回顶部
    if (e.key === 'Escape') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

