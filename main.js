// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Logic
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
    });
}

if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-khen-black/90', 'backdrop-blur-md', 'border-neutral-800', 'py-4');
        navbar.classList.remove('bg-transparent', 'border-transparent', 'py-6');
    } else {
        navbar.classList.remove('bg-khen-black/90', 'backdrop-blur-md', 'border-neutral-800', 'py-4');
        navbar.classList.add('bg-transparent', 'border-transparent', 'py-6');
    }
});

// --- Lightbox Functionality ---

// 1. Inject Lightbox HTML
const lightboxHTML = `
<div id="lightbox" class="fixed inset-0 z-[100] bg-black/95 hidden flex justify-center items-center opacity-0 transition-opacity duration-300 backdrop-blur-sm p-4">
    <button id="lightbox-close" class="absolute top-6 right-6 text-white/70 hover:text-white transition-colors focus:outline-none z-[101] p-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
    </button>
    <img id="lightbox-img" src="" class="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-sm select-none" alt="Full view">
</div>`;

document.body.insertAdjacentHTML('beforeend', lightboxHTML);

// 2. DOM Elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

// 3. Control Functions
function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
    // Force reflow to enable transition
    void lightbox.offsetWidth; 
    lightbox.classList.remove('opacity-0');
    lightbox.classList.add('opacity-100');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

function closeLightbox() {
    lightbox.classList.remove('opacity-100');
    lightbox.classList.add('opacity-0');
    document.body.style.overflow = ''; // Restore scrolling
    // Wait for transition to finish before hiding
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
    }, 300);
}

// 4. Event Listeners for Lightbox Controls
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        // Close if clicked outside the image
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
        closeLightbox();
    }
});

// 5. Attach Click Listeners to Portfolio Images
// Targets: Images inside 'Selected Works' (Home) and 'Portfolio Items' (Portfolio page)
const lightboxTriggers = document.querySelectorAll('#selected-works-grid .group, .portfolio-item');

lightboxTriggers.forEach(trigger => {
    // Add visual cue
    trigger.style.cursor = 'zoom-in';
    
    trigger.addEventListener('click', (e) => {
        // Find the image inside the clicked container
        const img = trigger.querySelector('img');
        if (img) {
            e.stopPropagation(); // Good practice to prevent bubbling if nested
            openLightbox(img.src);
        }
    });
});