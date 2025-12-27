document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. Carrousel d'Images (Slideshow)
    //    Fait tourner les images avec un fondu (fade)
    // =========================================
    const slides = document.querySelectorAll('.hero-bg-image');
    let currentSlide = 0;
    const slideInterval = 5000; // 5000ms = 5 secondes

    function nextSlide() {
        if (slides.length <= 1) return; // Arrête si moins de 2 images

        // Retire la classe 'active' de l'image actuelle
        slides[currentSlide].classList.remove('active');
        
        // Passe à l'image suivante (ou revient à la première)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Ajoute la classe 'active' à la nouvelle image
        slides[currentSlide].classList.add('active');
    }

    // Démarre la rotation automatique si plus d'une image est présente
    if (slides.length > 1) {
        setInterval(nextSlide, slideInterval);
    }
    
    // =========================================
    // 2. Mode Sombre (Dark Mode) Toggle
    // =========================================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Fonction pour basculer le thème
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);

            // Met à jour l'icône
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
            // Sauvegarde la préférence de l'utilisateur
            localStorage.setItem('theme', newTheme);
        }

        // Applique le thème sauvegardé ou le mode clair par défaut au chargement
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        } else {
             // Thème clair par défaut (s'il n'y a pas de préférence)
            document.documentElement.setAttribute('data-theme', 'light');
        }

        // Écouteur d'événement pour le bouton
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // =========================================
    // 3. Menu Mobile Toggle
    // =========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark'; // Icône de fermeture
            } else {
                icon.className = 'fa-solid fa-bars'; // Icône de menu
            }
        });
        
        // Fermer le menu lors du clic sur un lien (expérience mobile)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                 mainNav.classList.remove('active');
                 mobileMenuToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }


    // =========================================
    // 4. Animations au défilement (Scroll Reveal)
    // =========================================
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Déclenche l'animation lorsque 10% de l'élément est visible

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
});
