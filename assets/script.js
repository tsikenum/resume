
(function(){
  const LANG_KEY = 'resume-lang';
  const THEME_KEY = 'prefers-dark';

  // Set footer year
  const YEAR = document.getElementById('year');
  if (YEAR) YEAR.textContent = new Date().getFullYear();

  // Language helpers
  const getInitialLang = () => {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored) return stored;
    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.startsWith('es') ? 'es' : 'en';
  };

  const applyLang = (l) => {
    document.querySelectorAll('.lang-en').forEach(el => el.classList.toggle('d-none', l !== 'en'));
    document.querySelectorAll('.lang-es').forEach(el => el.classList.toggle('d-none', l !== 'es'));
    const label = document.getElementById('langLabel');
    if (label) label.textContent = (l === 'en') ? 'Español' : 'English';
    localStorage.setItem(LANG_KEY, l);
  };

  let lang = getInitialLang();
  applyLang(lang);

  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.addEventListener('click', () => {
    lang = (lang === 'en') ? 'es' : 'en';
    applyLang(lang);
  });

  // Theme helpers
  const prefersDark = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored !== null) return stored === 'true';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const applyTheme = (isDark) => {
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    const icon = document.querySelector('#themeToggle .bi');
    if (icon) {
      icon.classList.toggle('bi-moon', !isDark);
      icon.classList.toggle('bi-sun', isDark);
    }
    localStorage.setItem(THEME_KEY, String(isDark));
  };

  let isDark = prefersDark();
  applyTheme(isDark);

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    applyTheme(isDark);
  });

  // Print
  const printBtn = document.getElementById('printBtn');
  if (printBtn) printBtn.addEventListener('click', () => window.print());
})();