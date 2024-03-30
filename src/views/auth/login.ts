export const renderLogin = () => `
  <h1>ログイン</h1>
  <form id="loginForm">
    <div>
      <label for="email">メールアドレス:</label>
      <input type="email" id="email" name="email" required>
    </div>
    <div>
      <label for="password">パスワード:</label>
      <input type="password" id="password" name="password" required>
    </div>
    <button type="submit">ログイン</button>
  </form>
  <script>
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        window.location.href = '/blog/ja/';
      } else {
        alert('ログインに失敗しました');
      }
    });
  </script>
`;