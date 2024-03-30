import { Post } from '@prisma/client';
import { renderLayout } from '../layout/layout';

export const renderLanding = (posts: Post[], isAuthenticated?: boolean) => renderLayout(`
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script>
    MathJax = {
        tex: {
        // inlineMath: [['$', '$'], ['\\(', '\\)']],
        inlineMath: [['\\$', '\\$'], ['\\\\(', '\\\\)']],
        processEscapes: true,
        },
        svg: {
        fontCache: 'global',
        },
    };
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>

    <h1>ブログ記事一覧</h1>
    ${isAuthenticated ? `<a href="/blog/ja/posts/create/">記事作成</a>` : ''}
    
    ${posts.map(post => `
        <div>
        <h2><a href="/blog/ja/posts/${post.title}/">${post.title}</a></h2>
        <p>${post.content.slice(0, 100)}...</p>
        </div>
    `).join('')}
`);