// c:/Users/mikhail.sarokin/OneDrive - Kaseya/Documents/Personal/Agilism/AFB/JavaScript/navigation.js
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    if (!currentPage || currentPage === "") { // Handle root path for index.html
        document.querySelector('.left-nav a[href="index.html"]')?.classList.add('active');
        return;
    }
    const navLinks = document.querySelectorAll('.left-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});