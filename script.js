document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const initialTheme = storedTheme || 'dark';

  applyTheme(initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const isDark = theme === 'dark';
  const textSpan = toggleBtn.querySelector('.theme-text');

  if (textSpan) {
    textSpan.textContent = isDark ? 'light theme' : 'dark theme';
  } else {
    toggleBtn.textContent = isDark ? 'light theme' : 'dark theme';
  }
}
