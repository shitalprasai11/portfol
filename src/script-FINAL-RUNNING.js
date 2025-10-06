// ==========================================================================
// Global Variables and Enhanced Mobile-First Configuration
// ==========================================================================

let currentTestimonial = 0;
let currentGalleryImage = 0;
let galleryImages = [];
let isFormSubmitting = false;
let lastScrollY = 0;
let ticking = false;
let touchStartY = 0;

// Enhanced Image Configuration with sample images
const imageFiles = {
    commercial: [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=500&q=80'
    ],
    concert: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&w=500&q=80'
    ],
    nature: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&w=500&q=80'
    ],
    portrait: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&w=500&q=80'
    ],
    wedding: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&w=500&q=80',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&w=500&q=80'
    ]
};

const imageMetadata = {
    portrait: {
        title: 'Portrait Photography',
        description: 'Professional portraits and headshots'
    },
    wedding: {
        title: 'Wedding Photography',
        description: 'Beautiful wedding moments'
    },
    commercial: {
        title: 'Commercial Photography',
        description: 'Business and corporate photography'
    },
    nature: {
        title: 'Nature Photography',
        description: 'Natural landscapes and wildlife'
    },
    concert: {
        title: 'Concert Photography',
        description: 'Live music and events'
    }
};

// DOM Elements with Enhanced Error Handling
const elements = {
    loader: document.getElementById('loader'),
    header: document.getElementById('header'),
    navToggle: document.getElementById('nav-toggle'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    galleryGrid: document.getElementById('gallery-grid'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    imageModal: document.getElementById('image-modal'),
    modalImage: document.getElementById('modal-image'),
    modalClose: document.getElementById('modal-close'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalPrev: document.getElementById('modal-prev'),
    modalNext: document.getElementById('modal-next'),
    testimonialCards: document.querySelectorAll('.testimonial-card'),
    testimonialPrev: document.querySelector('.testimonial-btn.prev'),
    testimonialNext: document.querySelector('.testimonial-btn.next'),
    testimonialDots: document.querySelectorAll('.dot'),
    contactForm: document.getElementById('contact-form'),
    statNumbers: document.querySelectorAll('.stat-number, .animate-counter'),
    successMessage: document.getElementById('success-message'),
    themeToggle: document.getElementById('theme-toggle')
};

// ==========================================================================
// Dark Mode System
// ==========================================================================

class ThemeManager {
    constructor() {
        this.theme = this.getStoredTheme() || this.getPreferredTheme();
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.bindEvents();
        this.watchSystemTheme();
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    getPreferredTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeToggle();
    }

    updateThemeToggle() {
        if (elements.themeToggle) {
            elements.themeToggle.setAttribute('aria-label',
                this.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
        }
    }

    toggleTheme() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);

        // Haptic feedback for mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }

        // Smooth transition effect
        document.body.style.transition = 'none';
        requestAnimationFrame(() => {
            document.body.style.transition = '';
        });
    }

    bindEvents() {
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', () => this.toggleTheme());

            // Keyboard support
            elements.themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
    }

    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// ==========================================================================
// Enhanced Loading Screen with Better Performance
// ==========================================================================

class LoadingManager {
    constructor() {
        this.isLoaded = false;
        this.minLoadTime = 2000; // Minimum loading time for UX
        this.startTime = Date.now();
    }

    init() {
        // Preload critical images
        this.preloadCriticalImages();

        window.addEventListener('load', () => {
            this.handlePageLoad();
        });

        // Fallback timeout to ensure loader hides
        setTimeout(() => {
            if (!this.isLoaded) {
                console.log('Fallback: Hiding loader after timeout');
                this.hideLoader();
            }
        }, 5000);
    }

    async preloadCriticalImages() {
        const criticalImages = [
            'https://images.unsplash.com/photo-1554048612-b6a482b22f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
        ];

        const promises = criticalImages.map(src => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; // Don't fail on error
                img.src = src;
            });
        });

        await Promise.all(promises);
    }

    handlePageLoad() {
        const elapsed = Date.now() - this.startTime;
        const remaining = Math.max(0, this.minLoadTime - elapsed);

        setTimeout(() => {
            this.hideLoader();
        }, remaining);
    }

    hideLoader() {
        if (this.isLoaded) return;
        this.isLoaded = true;

        console.log('Hiding loader and starting animations');

        if (elements.loader) {
            elements.loader.classList.add('hidden');

            // Start animations after loading
            setTimeout(() => {
                animationManager.init();
                statsCounter.init();

                // Remove loader from DOM after transition
                setTimeout(() => {
                    if (elements.loader && elements.loader.parentNode) {
                        elements.loader.parentNode.removeChild(elements.loader);
                    }
                }, 500);
            }, 300);
        }
    }
}

// ==========================================================================
// Enhanced Mobile-First Navigation
// ==========================================================================

class NavigationManager {
    constructor() {
        this.isMenuOpen = false;
        this.lastScrollY = 0;
        this.scrollThreshold = 10;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupScrollBehavior();
        this.setupKeyboardNavigation();
        this.handleInitialLoad();
    }

    bindEvents() {
        // Mobile menu toggle
        if (elements.navToggle && elements.navMenu) {
            elements.navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });

            // Keyboard support for mobile toggle
            elements.navToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleMobileMenu();
                }
            });
        }

        // Close mobile menu when clicking links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavLinkClick(e, link);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !elements.navMenu.contains(e.target) && !elements.navToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
                elements.navToggle.focus();
            }
        });

        // Throttled scroll handler
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    this.updateActiveNavLink();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;

        elements.navToggle.classList.toggle('active');
        elements.navMenu.classList.toggle('active');
        elements.navToggle.setAttribute('aria-expanded', this.isMenuOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';

        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    }

    closeMobileMenu() {
        if (!this.isMenuOpen) return;

        this.isMenuOpen = false;
        elements.navToggle.classList.remove('active');
        elements.navMenu.classList.remove('active');
        elements.navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    handleNavLinkClick(e, link) {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;

        // Close mobile menu first
        this.closeMobileMenu();

        // Smooth scroll to target
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = elements.header ? elements.header.offsetHeight : 70;
            const offsetTop = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        if (elements.header) {
            // Add scrolled class
            if (currentScrollY > 100) {
                elements.header.classList.add('scrolled');
            } else {
                elements.header.classList.remove('scrolled');
            }

            // Hide/show header on mobile
            if (window.innerWidth <= 768) {
                if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                    // Scrolling down
                    elements.header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    elements.header.style.transform = 'translateY(0)';
                }
            } else {
                elements.header.style.transform = '';
            }
        }

        this.lastScrollY = currentScrollY;
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                elements.navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.setAttribute('aria-current', 'false');
                });

                if (navLink) {
                    navLink.classList.add('active');
                    navLink.setAttribute('aria-current', 'page');
                }
            }
        });
    }

    setupScrollBehavior() {
        // Smooth scrolling polyfill for older browsers
        if (!('scrollBehavior' in document.documentElement.style)) {
            this.polyfillSmoothScroll();
        }
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation for nav links
        elements.navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextLink = elements.navLinks[index + 1] || elements.navLinks[0];
                    nextLink.focus();
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevLink = elements.navLinks[index - 1] || elements.navLinks[elements.navLinks.length - 1];
                    prevLink.focus();
                }
            });
        });
    }

    handleInitialLoad() {
        // Handle initial hash navigation
        if (window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    const headerHeight = elements.header ? elements.header.offsetHeight : 70;
                    window.scrollTo({
                        top: target.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }
}

// ==========================================================================
// Advanced Animation Manager with Intersection Observer
// ==========================================================================

class AnimationManager {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
    }

    init() {
        this.setupScrollAnimations();
        this.setupTypingEffects();
        this.setupStaggeredAnimations();
        this.setupParallaxEffects();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with reveal classes
        const revealElements = document.querySelectorAll('.reveal-section, .animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-scale-up');

        revealElements.forEach((el, index) => {
            // Add staggered delays for grouped elements
            const delay = parseFloat(el.dataset.delay) || (index * 0.1);
            el.style.animationDelay = `${delay}s`;

            observer.observe(el);
        });

        this.observers.set('scroll', observer);
    }

    animateElement(element) {
        element.classList.add('active');

        // Trigger any child animations
        const childElements = element.querySelectorAll('[data-delay]');
        childElements.forEach(child => {
            setTimeout(() => {
                child.classList.add('active');
            }, parseFloat(child.dataset.delay || 0) * 1000);
        });
    }

    setupTypingEffects() {
        const typingElements = document.querySelectorAll('.typing-text');

        typingElements.forEach(element => {
            const text = element.dataset.text || element.textContent;
            const delay = parseFloat(element.dataset.delay || 0) * 1000;

            element.textContent = '';

            setTimeout(() => {
                this.typeText(element, text);
            }, delay);
        });
    }

    typeText(element, text, index = 0) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => {
                this.typeText(element, text, index + 1);
            }, 50 + Math.random() * 50); // Variable speed for natural feel
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }

    setupStaggeredAnimations() {
        // Gallery items staggered animation
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.gallery-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.1 });

        const galleryGrid = elements.galleryGrid;
        if (galleryGrid) {
            galleryObserver.observe(galleryGrid);
        }
    }

    setupParallaxEffects() {
        // Only enable parallax on desktop and if user hasn't requested reduced motion
        if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.handleParallax();
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image');

        parallaxElements.forEach(element => {
            const rate = scrolled * -0.3;
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
}

// ==========================================================================
// Enhanced Gallery with Lazy Loading and Mobile Optimizations
// ==========================================================================

class GalleryManager {
    constructor() {
        this.currentFilter = 'all';
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isSwipeEnabled = window.innerWidth <= 768;
    }

    init() {
        this.loadGalleryImages('all');
        this.bindEvents();
        this.setupTouchGestures();
    }

    bindEvents() {
        // Filter buttons
        elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleFilterClick(btn);
            });

            // Keyboard support
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleFilterClick(btn);
                }
            });
        });

        // Modal controls
        this.bindModalEvents();
    }

    bindModalEvents() {
        // These will be handled by ModalManager
        // Just ensuring gallery integration works
    }

    handleFilterClick(btn) {
        const filter = btn.getAttribute('data-filter') || 'all';

        // Update active filter button
        elements.filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Load filtered gallery with animation
        this.currentFilter = filter;
        this.loadGalleryImages(filter);

        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    }

    loadGalleryImages(filter = 'all') {
        if (!elements.galleryGrid) return;

        // Fade out existing items
        const existingItems = elements.galleryGrid.querySelectorAll('.gallery-item');
        existingItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
            }, index * 50);
        });

        // Clear after animation
        setTimeout(() => {
            elements.galleryGrid.innerHTML = '';
            galleryImages = [];
            this.populateGallery(filter);
        }, existingItems.length * 50 + 200);
    }

    populateGallery(filter) {
        let imagesToShow = [];

        if (filter === 'all') {
            Object.keys(imageFiles).forEach(category => {
                if (imageFiles[category] && imageFiles[category].length > 0) {
                    imageFiles[category].forEach((src, index) => {
                        imagesToShow.push({
                            src: src,
                            filename: `${category}_${index + 1}`,
                            category: category,
                            title: this.generateImageTitle(`${category}_${index + 1}`, category),
                            description: imageMetadata[category]?.description || `${category} photography`
                        });
                    });
                }
            });
        } else {
            if (imageFiles[filter] && imageFiles[filter].length > 0) {
                imagesToShow = imageFiles[filter].map((src, index) => ({
                    src: src,
                    filename: `${filter}_${index + 1}`,
                    category: filter,
                    title: this.generateImageTitle(`${filter}_${index + 1}`, filter),
                    description: imageMetadata[filter]?.description || `${filter} photography`
                }));
            }
        }

        if (imagesToShow.length === 0) {
            this.showNoImagesMessage(filter);
            return;
        }

        // Create gallery items with staggered animation
        imagesToShow.forEach((image, index) => {
            const galleryItem = this.createGalleryItem(image, index);
            elements.galleryGrid.appendChild(galleryItem);
            galleryImages.push(image);

            // Staggered fade-in animation
            setTimeout(() => {
                galleryItem.style.opacity = '1';
                galleryItem.style.transform = 'scale(1)';
            }, index * 100);
        });
    }

    createGalleryItem(image, index) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', image.category);
        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'scale(0.8)';
        galleryItem.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

        galleryItem.innerHTML = `
            <div class="gallery-image" role="button" tabindex="0" aria-label="Open ${image.title}">
                <img
                    src="${image.src}"
                    alt="${image.title}"
                    loading="lazy">
                <div class="gallery-overlay">
                    <div class="gallery-content">
                        <h4>${image.title}</h4>
                        <p>${image.description}</p>
                        <button class="gallery-btn" data-index="${index}" aria-label="Expand image">
                            <i class="fas fa-expand" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Bind click events
        const expandBtn = galleryItem.querySelector('.gallery-btn');
        const imageElement = galleryItem.querySelector('.gallery-image');

        const openModal = () => {
            currentGalleryImage = index;
            modalManager.openModal();
        };

        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal();
        });

        imageElement.addEventListener('click', openModal);

        // Keyboard support
        imageElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });

        return galleryItem;
    }

    setupTouchGestures() {
        if (!this.isSwipeEnabled) return;

        elements.galleryGrid.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        elements.galleryGrid.addEventListener('touchend', (e) => {
            if (!this.touchStartX || !this.touchStartY) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const deltaX = this.touchStartX - touchEndX;
            const deltaY = this.touchStartY - touchEndY;

            // Only handle horizontal swipes
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                this.handleSwipe(deltaX > 0 ? 'left' : 'right');
            }

            this.touchStartX = 0;
            this.touchStartY = 0;
        }, { passive: true });
    }

    handleSwipe(direction) {
        // Cycle through filters on swipe
        const filterButtons = Array.from(elements.filterBtns);
        const currentIndex = filterButtons.findIndex(btn => btn.classList.contains('active'));

        let newIndex;
        if (direction === 'left') {
            newIndex = (currentIndex + 1) % filterButtons.length;
        } else {
            newIndex = (currentIndex - 1 + filterButtons.length) % filterButtons.length;
        }

        filterButtons[newIndex].click();

        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    }

    generateImageTitle(filename, category) {
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
        const words = nameWithoutExt.split(/[-_\s]+/);
        const title = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return title || `${category.charAt(0).toUpperCase() + category.slice(1)} Photo`;
    }

    showNoImagesMessage(filter) {
        elements.galleryGrid.innerHTML = `
            <div class="no-images-message" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: rgba(255, 255, 255, 0.7);">
                <i class="fas fa-camera" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary-color);" aria-hidden="true"></i>
                <h3 style="margin-bottom: 1rem;">No images found</h3>
                <p>No images found for ${filter === 'all' ? 'any category' : filter + ' category'}.</p>
            </div>
        `;
    }
}

// ==========================================================================
// Enhanced Modal Manager with Touch Support
// ==========================================================================

class ModalManager {
    constructor() {
        this.isOpen = false;
        this.touchStartX = 0;
        this.bindEvents();
    }

    bindEvents() {
        // Close button
        if (elements.modalClose) {
            elements.modalClose.addEventListener('click', () => this.closeModal());
        }

        // Overlay click
        if (elements.modalOverlay) {
            elements.modalOverlay.addEventListener('click', () => this.closeModal());
        }

        // Navigation buttons
        if (elements.modalPrev) {
            elements.modalPrev.addEventListener('click', () => this.navigateGallery(-1));
        }

        if (elements.modalNext) {
            elements.modalNext.addEventListener('click', () => this.navigateGallery(1));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            switch(e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    this.navigateGallery(-1);
                    break;
                case 'ArrowRight':
                    this.navigateGallery(1);
                    break;
            }
        });

        // Touch gestures for mobile
        this.setupTouchGestures();
    }

    setupTouchGestures() {
        if (!elements.imageModal) return;

        elements.imageModal.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        }, { passive: true });

        elements.imageModal.addEventListener('touchend', (e) => {
            if (!this.touchStartX) return;

            const touchEndX = e.changedTouches[0].clientX;
            const deltaX = this.touchStartX - touchEndX;

            if (Math.abs(deltaX) > 50) {
                this.navigateGallery(deltaX > 0 ? 1 : -1);
            }

            this.touchStartX = 0;
        }, { passive: true });
    }

    openModal() {
        const currentImage = galleryImages[currentGalleryImage];
        if (!elements.imageModal || !elements.modalImage || !currentImage) return;

        this.isOpen = true;

        // Load image
        elements.modalImage.src = currentImage.src;
        elements.modalImage.alt = currentImage.title;

        // Show modal
        elements.imageModal.classList.add('active');
        elements.imageModal.setAttribute('aria-hidden', 'false');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Focus management
        elements.modalClose.focus();

        // Update navigation buttons
        this.updateNavigationButtons();
    }

    closeModal() {
        if (!this.isOpen) return;

        this.isOpen = false;

        if (elements.imageModal) {
            elements.imageModal.classList.remove('active');
            elements.imageModal.setAttribute('aria-hidden', 'true');
        }

        document.body.style.overflow = '';
    }

    navigateGallery(direction) {
        const newIndex = currentGalleryImage + direction;

        if (newIndex >= 0 && newIndex < galleryImages.length) {
            currentGalleryImage = newIndex;
            const currentImage = galleryImages[currentGalleryImage];

            if (elements.modalImage && currentImage) {
                // Add fade transition
                elements.modalImage.style.opacity = '0';

                setTimeout(() => {
                    elements.modalImage.src = currentImage.src;
                    elements.modalImage.alt = currentImage.title;
                    elements.modalImage.style.opacity = '1';
                }, 150);
            }

            this.updateNavigationButtons();

            // Haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(30);
            }
        }
    }

    updateNavigationButtons() {
        if (elements.modalPrev) {
            elements.modalPrev.style.opacity = currentGalleryImage > 0 ? '1' : '0.5';
            elements.modalPrev.disabled = currentGalleryImage === 0;
        }

        if (elements.modalNext) {
            elements.modalNext.style.opacity = currentGalleryImage < galleryImages.length - 1 ? '1' : '0.5';
            elements.modalNext.disabled = currentGalleryImage === galleryImages.length - 1;
        }
    }
}

// ==========================================================================
// Enhanced Statistics Counter
// ==========================================================================

class StatsCounter {
    constructor() {
        this.hasAnimated = new Set();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.hasAnimated.add(entry.target);
                }
            });
        }, { threshold: 0.5 });

        elements.statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count') || '0');
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let stepCount = 0;

        const timer = setInterval(() => {
            stepCount++;
            current += increment;

            if (stepCount >= steps) {
                current = target;
                clearInterval(timer);
            }

            // Add easing effect
            const progress = stepCount / steps;
            const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
            const displayValue = Math.floor(target * easedProgress);

            element.textContent = displayValue.toLocaleString();
        }, duration / steps);
    }
}

// ==========================================================================
// Enhanced Testimonials Manager
// ==========================================================================

class TestimonialsManager {
    constructor() {
        this.autoSlideInterval = null;
        this.autoSlideDelay = 5000;
        this.isUserInteracting = false;
    }

    init() {
        this.bindEvents();
        this.startAutoSlide();
    }

    bindEvents() {
        // Navigation buttons
        if (elements.testimonialPrev) {
            elements.testimonialPrev.addEventListener('click', () => {
                this.previousTestimonial();
                this.pauseAutoSlide();
            });
        }

        if (elements.testimonialNext) {
            elements.testimonialNext.addEventListener('click', () => {
                this.nextTestimonial();
                this.pauseAutoSlide();
            });
        }

        // Dot navigation
        elements.testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                this.updateTestimonial();
                this.pauseAutoSlide();
            });

            // Keyboard support
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    currentTestimonial = index;
                    this.updateTestimonial();
                    this.pauseAutoSlide();
                }
            });
        });

        // Pause auto-slide on hover
        const testimonialsSection = document.querySelector('.testimonials');
        if (testimonialsSection) {
            testimonialsSection.addEventListener('mouseenter', () => this.pauseAutoSlide());
            testimonialsSection.addEventListener('mouseleave', () => this.resumeAutoSlide());
        }

        // Touch support
        this.setupTouchGestures();
    }

    setupTouchGestures() {
        const slider = document.querySelector('.testimonials-slider');
        if (!slider) return;

        let touchStartX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.pauseAutoSlide();
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const deltaX = touchStartX - touchEndX;

            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.nextTestimonial();
                } else {
                    this.previousTestimonial();
                }
            }
        }, { passive: true });
    }

    nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % elements.testimonialCards.length;
        this.updateTestimonial();
    }

    previousTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + elements.testimonialCards.length) % elements.testimonialCards.length;
        this.updateTestimonial();
    }

    updateTestimonial() {
        // Update testimonial cards
        elements.testimonialCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentTestimonial);
            card.setAttribute('aria-hidden', index !== currentTestimonial);
        });

        // Update dots
        elements.testimonialDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
            dot.setAttribute('aria-selected', index === currentTestimonial);
        });
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            if (!this.isUserInteracting) {
                this.nextTestimonial();
            }
        }, this.autoSlideDelay);
    }

    pauseAutoSlide() {
        this.isUserInteracting = true;
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }

    resumeAutoSlide() {
        this.isUserInteracting = false;
        this.startAutoSlide();
    }
}

// ==========================================================================
// Enhanced Contact Form Manager
// ==========================================================================

class ContactFormManager {
    constructor() {
        this.isSubmitting = false;
        this.validationRules = {
            name: { required: true, minLength: 2 },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            service: { required: true },
            message: { required: true, minLength: 10 }
        };
    }

    init() {
        if (!elements.contactForm) return;

        this.bindEvents();
        this.setupRealTimeValidation();
    }

    bindEvents() {
        elements.contactForm.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });

        // Enhanced form interactions
        const inputs = elements.contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => this.handleInputFocus(input));
            input.addEventListener('blur', () => this.handleInputBlur(input));
            input.addEventListener('input', () => this.handleInputChange(input));
        });
    }

    setupRealTimeValidation() {
        const inputs = elements.contactForm.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const name = field.name;
        const value = field.value.trim();
        const rules = this.validationRules[name];

        if (!rules) return true;

        // Clear previous errors
        this.clearFieldError(field);

        // Required validation
        if (rules.required && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        // Pattern validation
        if (rules.pattern && value && !rules.pattern.test(value)) {
            this.showFieldError(field, 'Please enter a valid format');
            return false;
        }

        // Min length validation
        if (rules.minLength && value && value.length < rules.minLength) {
            this.showFieldError(field, `Minimum ${rules.minLength} characters required`);
            return false;
        }

        this.showFieldSuccess(field);
        return true;
    }

    showFieldError(field, message) {
        field.setAttribute('aria-invalid', 'true');
        field.style.borderColor = '#ff4444';

        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.cssText = 'color: #ff4444; font-size: 0.875rem; margin-top: 0.25rem;';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    showFieldSuccess(field) {
        field.setAttribute('aria-invalid', 'false');
        field.style.borderColor = 'var(--primary-color)';
        this.clearFieldError(field);
    }

    clearFieldError(field) {
        field.removeAttribute('aria-invalid');
        field.style.borderColor = '';

        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.isSubmitting) return;

        // Validate all fields
        const inputs = elements.contactForm.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            // Focus first invalid field
            const firstInvalid = elements.contactForm.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return;
        }

        this.isSubmitting = true;
        const submitBtn = elements.contactForm.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';

        try {
            // Simulate form submission
            await this.simulateFormSubmission();

            this.showSuccessMessage();
            elements.contactForm.reset();

            // Clear validation states
            inputs.forEach(input => this.clearFieldError(input));

        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage();
        } finally {
            this.isSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }
    }

    async simulateFormSubmission() {
        // Simulate API call with realistic delay
        return new Promise((resolve) => {
            setTimeout(resolve, 1500 + Math.random() * 1000);
        });
    }

    showSuccessMessage() {
        if (elements.successMessage) {
            elements.successMessage.classList.add('show');

            // Auto-hide after 5 seconds
            setTimeout(() => {
                elements.successMessage.classList.remove('show');
            }, 5000);

            // Allow manual dismiss
            elements.successMessage.addEventListener('click', () => {
                elements.successMessage.classList.remove('show');
            }, { once: true });
        }
    }

    showErrorMessage() {
        // Create error message if it doesn't exist
        let errorMessage = document.getElementById('error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.id = 'error-message';
            errorMessage.className = 'error-message';
            errorMessage.style.cssText = `
                position: fixed;
                top: 100px;
                right: -400px;
                background: linear-gradient(135deg, #ff4444, #cc3333);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                box-shadow: var(--shadow-xl);
                z-index: var(--z-tooltip);
                transition: right 0.3s ease;
                max-width: 300px;
            `;
            errorMessage.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
                    <p>Something went wrong. Please try again.</p>
                </div>
            `;
            document.body.appendChild(errorMessage);
        }

        errorMessage.style.right = '1.5rem';

        setTimeout(() => {
            errorMessage.style.right = '-400px';
        }, 4000);
    }

    handleInputFocus(input) {
        input.parentNode.classList.add('focused');
    }

    handleInputBlur(input) {
        if (!input.value) {
            input.parentNode.classList.remove('focused');
        }
    }

    handleInputChange(input) {
        if (input.value) {
            input.parentNode.classList.add('filled');
        } else {
            input.parentNode.classList.remove('filled');
        }
    }
}

// ==========================================================================
// Application Initialization and Manager Instances
// ==========================================================================

// Global manager instances
let themeManager;
let loadingManager;
let navigationManager;
let animationManager;
let galleryManager;
let modalManager;
let statsCounter;
let testimonialsManager;
let contactFormManager;

// ==========================================================================
// Enhanced Application Initialization
// ==========================================================================

function initializeApplication() {
    console.log('🚀 Initializing Ankho Photography Portfolio...');

    try {
        // Initialize core systems first
        themeManager = new ThemeManager();
        loadingManager = new LoadingManager();

        // Initialize UI managers (these will be activated after loading)
        navigationManager = new NavigationManager();
        animationManager = new AnimationManager();
        galleryManager = new GalleryManager();
        modalManager = new ModalManager();
        statsCounter = new StatsCounter();
        testimonialsManager = new TestimonialsManager();
        contactFormManager = new ContactFormManager();

        // Initialize managers that should start immediately
        loadingManager.init();
        galleryManager.init();
        testimonialsManager.init();
        contactFormManager.init();

        console.log('✅ Portfolio initialized successfully!');
        console.log('🎨 Dark mode available via toggle button');
        console.log('📱 Mobile optimizations active');

    } catch (error) {
        console.error('❌ Error initializing portfolio:', error);

        // Graceful fallback - hide loader immediately
        if (elements.loader) {
            elements.loader.classList.add('hidden');
            setTimeout(() => {
                if (elements.loader && elements.loader.parentNode) {
                    elements.loader.parentNode.removeChild(elements.loader);
                }
            }, 500);
        }
    }
}

// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
    initializeApplication();
}
