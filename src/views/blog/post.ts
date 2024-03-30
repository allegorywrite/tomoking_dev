import { Post } from '@prisma/client';
import { renderLayout } from '../layout/layout';

export const renderPost = (post: Post, isAdmin?: boolean) => renderLayout(`
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
  <h1>${post.title}</h1>
  <div>${post.content}</div>
  ${isAdmin ? `<a href="/blog/ja/posts/${post.title}/edit">編集</a>` : ''}
`);