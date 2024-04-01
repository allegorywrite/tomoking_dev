import { Post } from '@prisma/client';
import { renderLayout } from '../layout/layout';
import { marked } from 'marked';

export const renderPost = (post: Post, isAdmin?: boolean) => renderLayout(`
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script>
    MathJax = {
      tex: {
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
  <div>${marked.parse(post.content, { breaks: true })}</div>
  ${isAdmin ? `<a href="/blog/ja/posts/${post.title}/edit">編集</a>` : ''}
`);