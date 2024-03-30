import { renderLayout } from '../layout/layout';

const renderEditor = () => `
    <div>
    <label for="title">タイトル:</label>
    <input type="text" id="title" name="title" required>
    </div>
    <div>
    <label for="content">内容:</label>
    <div id="content" class="no-mathjax" contenteditable="true" style="border: 1px solid #ccc; padding: 10px; min-height: 200px;"></div>
    </div>
    <button type="submit">投稿</button>
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

export const renderCreatePost = () => renderLayout(`
    <h1>記事の作成</h1>
    <div style="display: flex;">
    <div style="flex: 1;">
    <form id="createPostForm">
    ${renderEditor()}
    </form>
    </div>
    <div style="flex: 1; padding-left: 20px;">
    ${renderPreview()}
    </div>
    </div>
    <script>
    const form = document.getElementById('createPostForm');
    const contentInput = document.getElementById('content');
    const previewDiv = document.getElementById('preview');
    contentInput.addEventListener('input', () => {
    previewDiv.innerHTML = contentInput.innerHTML;
    MathJax.typeset();
    });
    form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = contentInput.innerHTML;
    const token = localStorage.getItem('token');
    const response = await fetch('/blog/ja/posts/', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`,
    },
    body: JSON.stringify({ title, content }),
    });
    if (response.ok) {
    alert('記事が投稿されました');
    window.location.href = '/blog/ja/';
    } else {
    alert('記事の投稿に失敗しました');
    }
    });
    </script>
`);