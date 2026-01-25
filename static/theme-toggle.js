document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    const setIcon = (isDark) => {
        if (isDark) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };

    // Apply saved theme or system preference on load
    if (currentTheme) {
        body.classList.add(currentTheme);
        setIcon(currentTheme === 'dark-theme');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-theme');
        setIcon(true);
    } else {
        setIcon(false);
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light-theme');
            setIcon(false);
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            setIcon(true);
        }
    });
});
