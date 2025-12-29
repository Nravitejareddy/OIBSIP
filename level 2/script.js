document.addEventListener('DOMContentLoaded', () => {

  // Register
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fullname = document.getElementById('fullname').value;
      const email = document.getElementById('email').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, username, password })
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        window.location.href = 'index.html';
      }
    });
  }

  // Login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('username', username);
        window.location.href = 'dashboard.html';
      } else {
        alert(data.message);
      }
    });
  }

  // Dashboard
  const userDisplay = document.getElementById('userDisplay');
  if (userDisplay) {
    const username = sessionStorage.getItem('username');
    if (!username) {
      window.location.href = 'index.html';
    }
    userDisplay.textContent = username;
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('username');
      window.location.href = 'index.html';
    });
  }
});
