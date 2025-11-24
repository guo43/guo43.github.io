const path = require('path');
const fse = require('fs-extra');
const matter = require('gray-matter');
const { marked } = require('marked');

const ROOT_DIR = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT_DIR, 'posts');
const OUTPUT_DIR = path.resolve(ROOT_DIR, process.env.OUTPUT_DIR || 'dist');
const OUTPUT_POSTS_DIR = path.join(OUTPUT_DIR, 'posts');
const POSTS_INDEX_PATH = path.join(OUTPUT_DIR, 'posts.json');

async function main() {
    console.log(`\n📦 构建输出目录: ${OUTPUT_DIR}`);
    await prepareOutputDir();
    const posts = await buildPosts();
    await writePostsIndex(posts);
    console.log(`✅ 构建完成，共生成 ${posts.length} 篇文章。\n`);
}

async function prepareOutputDir() {
    await fse.ensureDir(OUTPUT_DIR);
    await fse.emptyDir(OUTPUT_DIR);
    await fse.ensureDir(OUTPUT_POSTS_DIR);
}

async function buildPosts() {
    const files = await fse.readdir(POSTS_DIR);
    const markdownFiles = files.filter((file) => file.toLowerCase().endsWith('.md'));

    if (markdownFiles.length === 0) {
        console.warn('⚠️  未发现 Markdown 文章，posts.json 将为空。');
        return [];
    }

    const posts = [];

    for (const filename of markdownFiles) {
        const fullPath = path.join(POSTS_DIR, filename);
        const raw = await fse.readFile(fullPath, 'utf-8');
        const { data: metadata = {}, content } = matter(raw);

        const filenameInfo = extractInfoFromFilename(filename);
        const title = metadata.title || extractTitleFromContent(content) || filenameInfo.title;
        const date = metadata.date || filenameInfo.date;
        const excerpt = metadata.excerpt || extractExcerpt(content);
        const slug = generateSlug(metadata.slug || metadata.id || filenameInfo.title || filename);
        const id = metadata.id || generatePostId(filename);

        const htmlBody = marked.parse(content, {
            mangle: false,
            headerIds: true
        });

        const htmlRelativePath = path.posix.join('posts', `${slug}.html`);
        const htmlOutputPath = path.join(OUTPUT_DIR, htmlRelativePath);
        await fse.outputFile(htmlOutputPath, htmlBody, 'utf-8');
        console.log(`→ 生成文章: ${title} (${htmlRelativePath})`);

        posts.push({
            id,
            slug,
            title,
            date: formatDate(date),
            excerpt,
            filename,
            htmlPath: htmlRelativePath
        });
    }

    // 新的在前
    posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    return posts;
}

async function writePostsIndex(posts) {
    const content = JSON.stringify(posts, null, 2);
    await fse.outputFile(POSTS_INDEX_PATH, content, 'utf-8');
    console.log('→ 写入 posts.json');
}

function extractInfoFromFilename(filename) {
    const nameWithoutExt = filename.replace(/\.md$/i, '');
    const dateMatch = nameWithoutExt.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    if (dateMatch) {
        return {
            date: dateMatch[1],
            title: dateMatch[2].replace(/-/g, ' ')
        };
    }
    return {
        date: new Date().toISOString().split('T')[0],
        title: nameWithoutExt.replace(/-/g, ' ')
    };
}

function extractTitleFromContent(markdown) {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : '';
}

function extractExcerpt(content) {
    let text = content
        .replace(/^#+\s+.+$/gm, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    if (text.length > 150) {
        text = `${text.substring(0, 150)}...`;
    }
    return text || '暂无摘要';
}

function generatePostId(filename) {
    return filename.replace(/\.md$/i, '').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
}

function generateSlug(raw) {
    return raw
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[\s\_]+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || `post-${Date.now()}`;
}

function formatDate(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

main().catch((error) => {
    console.error('❌ 构建失败:', error);
    process.exitCode = 1;
});

