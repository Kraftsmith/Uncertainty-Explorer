// c:/Users/mikhail.sarokin/OneDrive - Kaseya/Documents/Personal/Agilism/AFB/JavaScript/navigation-component.js

function loadNavigationComponent(placeholderId) {
    const navHtml = `
        <nav class="left-nav">
            <button id="desktop-nav-collapse-toggle" class="desktop-nav-collapse-btn" aria-label="Collapse navigation" aria-expanded="true">&laquo;</button>
            <ul>
                <li><a href="/View/index.html"> <span class="nav-link-text">Home</span></a></li>
                <li><a href="/View/stacey.html"><span class="nav-link-text">Stacey Matrix</span></a></li>
                <li><a href="/View/Cynefin.html"><span class="nav-link-text">Cynefin Framework</span></a></li>
                <li><a href="/View/summary.html"><span class="nav-link-text">Summary</span></a></li>
            </ul>
        </nav>
    `;

    // Create and append toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'nav-toggle-button';
    toggleButton.className = 'nav-toggle-btn';
    toggleButton.setAttribute('aria-label', 'Toggle navigation');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.innerHTML = '&#9776;'; // Hamburger icon
    document.body.appendChild(toggleButton);

    // Create and append overlay
    const overlay = document.createElement('div');
    overlay.id = 'nav-overlay';
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
        placeholder.innerHTML = navHtml;
        const leftNav = placeholder.querySelector('.left-nav');
        const desktopCollapseButton = document.getElementById('desktop-nav-collapse-toggle');

        toggleButton.addEventListener('click', () => {
            const isExpanded = leftNav.classList.toggle('open');
            toggleButton.setAttribute('aria-expanded', isExpanded);
            overlay.classList.toggle('active');
        });
        overlay.addEventListener('click', () => {
            leftNav.classList.remove('open');
            toggleButton.setAttribute('aria-expanded', 'false');
            overlay.classList.remove('active');
        });

        if (desktopCollapseButton) {
            desktopCollapseButton.addEventListener('click', () => {
                const isBodyCollapsed = document.body.classList.toggle('desktop-nav-collapsed');
                desktopCollapseButton.setAttribute('aria-expanded', !isBodyCollapsed);
                desktopCollapseButton.innerHTML = isBodyCollapsed ? '&raquo;' : '&laquo;';
            });
        }


        setActiveNavLink(); // Highlight the active link
    } else {
        console.error(`Navigation placeholder with ID '${placeholderId}' not found.`);
    }
}

function setActiveNavLink() {
    const currentPathname = window.location.pathname;
    const navLinks = document.querySelectorAll('.left-nav a');

    navLinks.forEach(link => {
        // Create a URL object from the link's href to easily get its pathname
        // This handles cases where link.href might be a full URL if the href attribute was relative
        const linkUrl = new URL(link.href, window.location.origin);
        const linkPathname = linkUrl.pathname;

        if (linkPathname === currentPathname) {
            link.classList.add('active');
        } else if (currentPathname.endsWith('/') && linkPathname === currentPathname + 'index.html') {
            // Handle case where server serves index.html for a directory path (e.g. currentPathname is /View/ and link is /View/index.html)
            link.classList.add('active');
        }
    });
}