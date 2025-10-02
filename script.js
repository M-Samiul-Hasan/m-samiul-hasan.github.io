// Function to handle the menu toggle click
function handleMenuToggle() {
    const navLinks = document.querySelector('.navbar-links');
    if (navLinks) {
        // Toggles the 'active' class on the navigation links list
        navLinks.classList.toggle('active');
    }
}

// Function to set the theme (extracted for clarity)
const setTheme = (theme) => {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--bg-color', '#0d1117');
        document.documentElement.style.setProperty('--text-color', '#e6edf3');
        document.documentElement.style.setProperty('--card-bg', '#161b22');
        document.documentElement.style.setProperty('--border-color', '#30363d');
        if (themeToggle) themeToggle.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#f0f2f5');
        document.documentElement.style.setProperty('--text-color', '#333333');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        document.documentElement.style.setProperty('--border-color', '#dddddd');
        if (themeToggle) themeToggle.classList.replace('fa-moon', 'fa-sun');
    }
    localStorage.setItem('theme', theme);
};


document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle Logic (FIXED FOR UNIVERSAL TOGGLE) ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.navbar-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', handleMenuToggle); // Call the defined function

        // Auto-hide the menu when a link is clicked on ANY screen size
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // REMOVED: if (window.innerWidth <= 768) {}
                // This line now runs universally, ensuring the menu closes after navigation.
                navLinks.classList.remove('active');
            });
        });
    }

    // --- 2. Theme Toggling Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'dark') {
                setTheme('light');
            } else {
                setTheme('dark');
            }
        });
    }

    // --- 3. Smooth Scrolling Logic ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    window.scrollTo({
                        top: targetElement.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 4. Image Box Navigation Logic (Only runs if you have image boxes) ---
    const showImage = (container, newIndex) => {
        const images = container.querySelectorAll('.image-box-img');
        images.forEach(img => img.classList.remove('active-img'));
        images[newIndex].classList.add('active-img');
        container.dataset.imageIndex = newIndex;
    };

    const handleButtonClick = (event) => {
        const button = event.target;
        const container = button.closest('.image-box-container');
        const images = container.querySelectorAll('.image-box-img');
        let currentIndex = parseInt(container.dataset.imageIndex);

        let newIndex;
        if (button.classList.contains('next-img')) {
            newIndex = (currentIndex + 1) % images.length;
        } else if (button.classList.contains('prev-img')) {
            newIndex = (currentIndex - 1 + images.length) % images.length;
        }
        
        showImage(container, newIndex);
    };

    // Initialize all image boxes on the page and attach listeners
    document.querySelectorAll('.image-box-container').forEach(container => {
        const images = container.querySelectorAll('.image-box-img');
        
        if (images.length > 0) {
            // Set initial index and show the first image
            container.dataset.imageIndex = 0;
            showImage(container, 0);

            // Add event listeners to the buttons
            const prevButton = container.querySelector('.prev-img');
            const nextButton = container.querySelector('.next-img');
            
            if (prevButton) prevButton.addEventListener('click', handleButtonClick);
            if (nextButton) nextButton.addEventListener('click', handleButtonClick);
        }
    });
});