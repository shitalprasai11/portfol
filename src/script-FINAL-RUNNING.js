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

// Enhanced Image Configuration with Lazy Loading Support
const imageFiles = {
    commercial: ["A.jpg", "B.jpg", "C.jpg"],
    concert: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"],
    nature: ["N1.jpg", "N2.jpg", "N3.jpg"],
    portrait: ["P1.jpg", "P2.jpg", "P3.jpg", "P4.jpg"],
    wedding: ["W1.jpg", "W2.jpg", "W3.jpg", "W4.jpg"]
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
        this.
// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

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

        // Fallback timeout
        setTimeout(() => {
            if (!this.isLoaded) {
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

        if (elements.loader) {
            elements.loader.classList.add('hidden');

            // Start animations after loading
            setTimeout(() => {
                animationManager.
// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

                statsCounter.
// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


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
        this.
// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

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

        // Focus management
        if (this.isMenuOpen) {
            this.trapFocus();
        }

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

    trapFocus() {
        const focusableElements = elements.navMenu.querySelectorAll(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        firstElement.focus();

        const handleTabKey = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleTabKey);

        // Clean up when menu closes
        const cleanup = () => {
            document.removeEventListener('keydown', handleTabKey);
        };

        setTimeout(cleanup, 100);
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

    polyfillSmoothScroll() {
        // Simple smooth scroll polyfill
        const scrollTo = (element, to, duration) => {
            const start = element.scrollTop;
            const change = to - start;
            const startDate = +new Date();

            const easeInOutQuad = (t, b, c, d) => {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };

            const animateScroll = () => {
                const currentDate = +new Date();
                const currentTime = currentDate - startDate;
                element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
                if (currentTime < duration) {
                    requestAnimationFrame(animateScroll);
                } else {
                    element.scrollTop = to;
                }
            };

            animateScroll();
        };

        window.scrollTo = (options) => {
            if (typeof options === 'object' && options.behavior === 'smooth') {
                scrollTo(document.documentElement, options.top, 500);
            } else {
                Element.prototype.scrollTo.apply(window, arguments);
            }
        };
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

    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.animatedElements.clear();
    }
}

// ==========================================================================
// Enhanced Gallery with Lazy Loading and Mobile Optimizations
// ==========================================================================

class GalleryManager {
    constructor() {
        this.currentFilter = 'all';
        this.lazyLoadOffset = 100;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isSwipeEnabled = window.innerWidth <= 768;
    }

    init() {
        this.loadGalleryImages('all');
        this.bindEvents();
        this.setupLazyLoading();
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
                    imageFiles[category].forEach(filename => {
                        imagesToShow.push({
                            src: `src/${category}/${filename}`,
                            filename: filename,
                            category: category,
                            title: this.generateImageTitle(filename, category),
                            description: imageMetadata[category]?.description || `${category} photography`
                        });
                    });
                }
            });
        } else {
            if (imageFiles[filter] && imageFiles[filter].length > 0) {
                imagesToShow = imageFiles[filter].map(filename => ({
                    src: `src/${filter}/${filename}`,
                    filename: filename,
                    category: filter,
                    title: this.generateImageTitle(filename, filter),
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
                    data-src="${image.src}"
                    alt="${image.title}"
                    class="lazy-load"
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

    setupLazyLoading() {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-load');
                    lazyImageObserver.unobserve(img);

                    // Add load event for fade-in effect
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                }
            });
        }, {
            rootMargin: `${this.lazyLoadOffset}px`
        });

        // Observe lazy images
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        const lazyImages = node.querySelectorAll('.lazy-load');
                        lazyImages.forEach(img => lazyImageObserver.observe(img));
                    }
                });
            });
        });

        observer.observe(elements.galleryGrid, { childList: true, subtree: true });
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
                <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">
                    Add image filenames to the <code>imageFiles.${filter}</code> array in script.js
                </p>
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

        // Return focus to the gallery item that opened the modal
        const activeGalleryItem = elements.galleryGrid.querySelector(`[data-index="${currentGalleryImage}"]`);
        if (activeGalleryItem) {
            activeGalleryItem.focus();
        }
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
// Enhanced Statistics Counter with Intersection Observer
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
// Performance Monitor and Utilities
// ==========================================================================

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }

    init() {
        this.measurePageLoad();
        this.setupResourceHints();
        this.optimizeScrolling();
        this.setupIntersectionObservers();
    }

    measurePageLoad() {
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];

                this.metrics = {
                    loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    firstPaint: this.getFirstPaint(),
                    firstContentfulPaint: this.getFirstContentfulPaint()
                };

                console.log('📊 Performance Metrics:', this.metrics);
            }
        });
    }

    getFirstPaint() {
        const fpEntry = performance.getEntriesByName('first-paint')[0];
        return fpEntry ? fpEntry.startTime : null;
    }

    getFirstContentfulPaint() {
        const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
        return fcpEntry ? fcpEntry.startTime : null;
    }

    setupResourceHints() {
        // Preload critical images that will be needed soon
        const criticalImages = [
            'src/508387584_18466633672077081_3643676971789401956_n.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    optimizeScrolling() {
        // Use passive listeners for scroll events
        let ticking = false;

        const optimizedScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll handling code here
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    }

    setupIntersectionObservers() {
        // Configure intersection observers for optimal performance
        const observerConfig = {
            rootMargin: '50px',
            threshold: [0.1, 0.25, 0.5, 0.75, 1.0]
        };

        // Use a single observer for multiple elements when possible
        const generalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Handle intersection
                    entry.target.classList.add('in-viewport');
                }
            });
        }, observerConfig);

        // Observe elements that need viewport detection
        document.querySelectorAll('[data-observe]').forEach(el => {
            generalObserver.observe(el);
        });
    }
}

// ==========================================================================
// Accessibility Manager
// ==========================================================================

class AccessibilityManager {
    constructor() {
        this.focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ');
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupARIAUpdates();
        this.setupReducedMotion();
        this.announcePageChanges();
    }

    setupKeyboardNavigation() {
        // Skip to main content link
        this.createSkipLink();

        // Escape key handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });

        // Focus visible indicators
        document.addEventListener('focusin', (e) => {
            if (e.target.matches(this.focusableSelectors)) {
                e.target.classList.add('focus-visible');
            }
        });

        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('focus-visible');
        });
    }

    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
            border-radius: 4px;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupFocusManagement() {
        // Focus trap for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && modalManager.isOpen) {
                this.trapFocus(e, elements.imageModal);
            }
        });
    }

    trapFocus(event, container) {
        const focusableElements = container.querySelectorAll(this.focusableSelectors);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    setupARIAUpdates() {
        // Live region for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    announcePageChanges() {
        // Announce page changes to screen readers
        const announceChange = (message) => {
            const liveRegion = document.getElementById('live-region');
            if (liveRegion) {
                liveRegion.textContent = message;
                setTimeout(() => {
                    liveRegion.textContent = '';
                }, 1000);
            }
        };

        // Example: Announce filter changes
        elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.textContent;
                announceChange(`Gallery filtered to show ${filter} images`);
            });
        });
    }

    setupReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition-fast', '0ms');
            document.documentElement.style.setProperty('--transition-normal', '0ms');
            document.documentElement.style.setProperty('--transition-slow', '0ms');
        }

        prefersReducedMotion.addEventListener('change', (e) => {
            const duration = e.matches ? '0ms' : '';
            document.documentElement.style.setProperty('--transition-fast', duration || '150ms');
            document.documentElement.style.setProperty('--transition-normal', duration || '300ms');
            document.documentElement.style.setProperty('--transition-slow', duration || '500ms');
        });
    }

    handleEscapeKey() {
        // Close any open modals or menus
        if (modalManager.isOpen) {
            modalManager.closeModal();
        } else if (navigationManager.isMenuOpen) {
            navigationManager.closeMobileMenu();
        }
    }
}

// ==========================================================================
// Mobile Optimizations Manager
// ==========================================================================

class MobileOptimizations {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isTouch = 'ontouchstart' in window;
    }

    init() {
        this.setupViewportOptimizations();
        this.setupTouchOptimizations();
        this.setupOrientationChanges();
        this.setupHapticFeedback();
        this.optimizeForMobile();
    }

    setupViewportOptimizations() {
        // Dynamic viewport height for mobile browsers
        const setViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });
    }

    setupTouchOptimizations() {
        if (!this.isTouch) return;

        // Improve touch responsiveness
        document.addEventListener('touchstart', () => {}, { passive: true });

        // Prevent zoom on double tap for specific elements
        const preventZoomElements = document.querySelectorAll('button, .btn, .nav-link');
        preventZoomElements.forEach(el => {
            el.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.target.click();
            }, { passive: false });
        });

        // Optimize scroll performance
        const scrollElements = document.querySelectorAll('.gallery-grid, .testimonials-slider');
        scrollElements.forEach(el => {
            el.style.webkitOverflowScrolling = 'touch';
        });
    }

    setupOrientationChanges() {
        window.addEventListener('orientationchange', () => {
            // Recalculate layouts on orientation change
            setTimeout(() => {
                this.recalculateLayouts();
            }, 100);
        });
    }

    setupHapticFeedback() {
        if (!('vibrate' in navigator)) return;

        // Add haptic feedback to interactive elements
        const interactiveElements = document.querySelectorAll('button, .btn, .nav-link, .gallery-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('click', () => {
                navigator.vibrate(30);
            });
        });
    }

    optimizeForMobile() {
        if (!this.isMobile) return;

        // Optimize images for mobile
        this.optimizeImages();

        // Reduce animation complexity on mobile
        this.simplifyAnimations();

        // Optimize font loading
        this.optimizeFonts();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" if not already present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Add mobile-specific optimizations
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });
    }

    simplifyAnimations() {
        // Reduce motion on mobile for better performance
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    optimizeFonts() {
        // Optimize font display for mobile
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => {
            link.setAttribute('rel', 'preload');
            link.setAttribute('as', 'style');
            link.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
        });
    }

    recalculateLayouts() {
        // Force recalculation of layouts after orientation change
        const elements = document.querySelectorAll('.gallery-grid, .services-grid, .hero-content');
        elements.forEach(el => {
            el.style.display = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.display = '';
        });
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
let performanceMonitor;
let accessibilityManager;
let mobileOptimizations;

// ==========================================================================
// Enhanced Application Initialization
// ==========================================================================

function initializeApplication() {
    // Check if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApplication);
        return;
    }

    try {
        console.log('🚀 Initializing Ankho Photography Portfolio...');

        // Initialize core systems first
        themeManager = new ThemeManager();
        loadingManager = new LoadingManager();
        performanceMonitor = new PerformanceMonitor();

        // Initialize UI managers
        navigationManager = new NavigationManager();
        animationManager = new AnimationManager();
        galleryManager = new GalleryManager();
        modalManager = new ModalManager();
        statsCounter = new StatsCounter();
        testimonialsManager = new TestimonialsManager();
        contactFormManager = new ContactFormManager();

        // Initialize accessibility and mobile optimizations
        accessibilityManager = new AccessibilityManager();
        mobileOptimizations = new MobileOptimizations();

        // Initialize all systems
        loadingManager.
// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

        performanceMonitor.
// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

        accessibilityManager.
// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

        mobileOptimizations.
// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

        galleryManager.
// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

        testimonialsManager.
// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

        contactFormManager.
// ==========================================================================
// Safe DOM Ready Hook for Initialization
// ==========================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


        // Setup scroll to top button
        setupScrollToTop();

        // Setup error handling
        setupErrorHandling();

        // Setup service worker for offline support
        setupServiceWorker();

        console.log('✅ Portfolio initialized successfully!');
        console.log('🎨 Dark mode available via toggle button');
        console.log('📱 Mobile optimizations active');
        console.log('♿ Accessibility features enabled');

    } catch (error) {
        console.error('❌ Error initializing portfolio:', error);

        // Graceful fallback
        if (elements.loader) {
            elements.loader.classList.add('hidden');
        }
    }
}

// ==========================================================================
// Additional Utility Functions
// ==========================================================================

function setupScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: var(--text-white);
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: var(--z-fixed);
        opacity: 0;
        transform: translateY(20px);
        transition: all var(--transition-normal);
        box-shadow: var(--shadow-gold);
    `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    let isVisible = false;
    window.addEventListener('scroll', () => {
        const shouldShow = window.scrollY > 500;

        if (shouldShow && !isVisible) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'translateY(0)';
            isVisible = true;
        } else if (!shouldShow && isVisible) {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'translateY(20px)';
            isVisible = false;
        }
    }, { passive: true });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    });
}

function setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);

        // Don't break the user experience
        e.preventDefault();
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);

        // Don't break the user experience
        e.preventDefault();
    });
}

function setupServiceWorker() {
    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('💾 Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }
}

// ==========================================================================
// Enhanced Utility Functions
// ==========================================================================

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================================================
// Developer Helpers and Console Messages
// ==========================================================================

function showDeveloperHelpers() {
    const helpers = `
🎨 Ankho Photography - Enhanced Portfolio
========================================

🔧 Available Commands:
• themeManager.toggleTheme() - Toggle dark/light mode
• galleryManager.loadGalleryImages('category') - Load specific category
• modalManager.openModal() - Open image modal
• performanceMonitor.metrics - View performance data

📱 Mobile Features:
• Touch gestures for gallery navigation
• Haptic feedback on supported devices
• Responsive breakpoints and fluid typography
• Enhanced accessibility features

🎬 Animation Features:
• Scroll-triggered animations with Intersection Observer
• Typing effects for text elements
• Staggered animations for grouped elements
• Parallax effects on desktop

♿ Accessibility Features:
• Screen reader support with ARIA labels
• Keyboard navigation throughout
• Focus management and skip links
• Reduced motion preferences support

🌙 Dark Mode:
• System preference detection
• Smooth theme transitions
• Persistent user preference storage

📊 Performance:
• Lazy loading for images
• Optimized scroll listeners
• Efficient animation handling
• Resource preloading

Categories: ${Object.keys(imageFiles).join(', ')}
    `;

    console.log(helpers);
}

// ==========================================================================
// Start the Enhanced Application
// ==========================================================================

// Initialize the application
initializeApplication();

// Show developer helpers in console
setTimeout(showDeveloperHelpers, 1000);
