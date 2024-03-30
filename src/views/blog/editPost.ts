import { Post } from '@prisma/client';
import { renderLayout } from '../layout/layout';

const renderEditor = (post: Post) => `
    <div>
    <label for="title">タイトル:</label>
    <input type="text" id="title" name="title" value="${post.title}" required>
    </div>
    <div>
    <label for="content">内容:</label>
    <div id="content" class="no-mathjax" contenteditable="true" style="border: 1px solid #ccc; padding: 10px; min-height: 200px;">${post.content}</div>
    </div>
    <button type="submit">更新</button>
`;

const renderPreview = () => `
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script>
    MathJax = {
    tex: {
    inlineMath: [['\\$', '\\$'], ['\\\\(', '\\\\)']],
    processEscapes: true,
    },
    svg: {
    fontCache: 'global',
    },
    startup: {
        ready: () => {
            MathJax.startup.defaultReady();
            MathJax.startup.promise.then(() => {
                MathJax.texReset();
                MathJax.typesetClear();
            });
        },
    },
    options: {
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process',
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'annotation', 'selector'],
        ignoreHtmlClass: 'no-mathjax'
    },
    };
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
    <div id="preview"></div>
`;


export const renderEditPost = (post: Post) => renderLayout(`
    <h1>記事の編集</h1>
    <div style="display: flex;">
    <div style="flex: 1;">
    <form id="editPostForm">
    <input type="hidden" id="postId" value="${post.id}">
    ${renderEditor(post)}
    </form>
    </div>
    <div style="flex: 1; padding-left: 20px;">
    ${renderPreview()}
    </div>
    </div>
    <script>
    const form = document.getElementById('editPostForm');
    const contentInput = document.getElementById('content');
    const previewDiv = document.getElementById('preview');
    contentInput.addEventListener('input', () => {
    previewDiv.innerHTML = contentInput.innerHTML;
    MathJax.typeset();
    });
    const token = localStorage.getItem('token');
    form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const postId = document.getElementById('postId').value;
    const title = document.getElementById('title').value;
    const content = contentInput.innerHTML;
    const token = localStorage.getItem('token');
    const response = await fetch(\`/blog/ja/posts/\${title}\`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`,
    },
    body: JSON.stringify({ postId, title, content }),
    });
    if (response.ok) {
    alert('記事が更新されました');
    window.location.href = \`/blog/ja/posts/\${title}\`;
    } else {
    alert('記事の更新に失敗しました');
    }
    });
    </script>
`);