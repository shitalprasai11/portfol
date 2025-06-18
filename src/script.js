// ==========================================================================
// Global Variables and DOM Elements
// ==========================================================================
let currentTestimonial = 0;
let currentGalleryImage = 0;
let galleryImages = [];
let isFormSubmitting = false;

// Image file lists for each category - UPDATE THESE WITH YOUR ACTUAL FILENAMES
const imageFiles = {
    commercial: ["A.jpg", "B.jpg", "C.jpg"],
    concert: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"],
    nature: ["N1.jpg", "N2.jpg", "N3.jpg"],
    portrait: ["P1.jpg", "P2.jpg", "P3.jpg", "P4.jpg"],
    wedding: ["W1.jpg", "W2.jpg", "W3.jpg", "W4.jpg"]
};


// Enhanced metadata for gallery images (optional - you can customize these)
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

// DOM Elements
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const galleryGrid = document.getElementById('gallery-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const modalOverlay = document.getElementById('modal-overlay');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialPrev = document.querySelector('.testimonial-btn.prev');
const testimonialNext = document.querySelector('.testimonial-btn.next');
const testimonialDots = document.querySelectorAll('.dot');
const contactForm = document.getElementById('contact-form');
const statNumbers = document.querySelectorAll('.stat-number');
const successMessage = document.getElementById('success-message');

// ==========================================================================
// Loading Screen
// ==========================================================================
function initLoadingScreen() {
    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
            }
            // Start animations after loading
            setTimeout(() => {
                initScrollAnimations();
                countUpStats();
            }, 500);
        }, 2000); // Show loading for 2 seconds
    });
}

// ==========================================================================
// Navigation
// ==========================================================================
function initNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId) {
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Update active navigation link
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// ==========================================================================
// Enhanced Gallery System
// ==========================================================================
function initGallery() {
    // Load initial gallery with all images
    loadGalleryImages('all');

    // Gallery filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter') || 'all';

            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Load filtered gallery
            loadGalleryImages(filter);
        });
    });

    // Modal controls
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (imageModal?.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    navigateGallery(-1);
                    break;
                case 'ArrowRight':
                    navigateGallery(1);
                    break;
            }
        }
    });
}

function loadGalleryImages(filter = 'all') {
    if (!galleryGrid) return;

    // Clear existing gallery
    galleryGrid.innerHTML = '';
    galleryImages = [];

    let imagesToShow = [];

    if (filter === 'all') {
        // Combine all images from all categories
        Object.keys(imageFiles).forEach(category => {
            if (imageFiles[category] && imageFiles[category].length > 0) {
                imageFiles[category].forEach(filename => {
                    imagesToShow.push({
                        src: `src/${category}/${filename}`,
                        filename: filename,
                        category: category,
                      title: imageMetadata[category]?.title || `${category} Photo`,
                        description: imageMetadata[category]?.description || `${category} photography`
                    });
                });
            }
        });
    } else {
        // Show specific category
        if (imageFiles[filter] && imageFiles[filter].length > 0) {
            imagesToShow = imageFiles[filter].map(filename => ({
                src: `src/${filter}/${filename}`,
                filename: filename,
                category: filter,
                title: generateImageTitle(filename, filter),
                description: imageMetadata[filter]?.description || `${filter} photography`
            }));
        }
    }

    // Show message if no images found
    if (imagesToShow.length === 0) {
        showNoImagesMessage(filter);
        return;
    }

    // Create gallery items
    imagesToShow.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        galleryGrid.appendChild(galleryItem);
        galleryImages.push(image);
    });

    // Add staggered animation
    const items = galleryGrid.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 100);
    });
}

function generateImageTitle(filename, category) {
    // Generate a nice title from filename
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const words = nameWithoutExt.split(/[-_\s]+/);
    const title = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return title || `${category.charAt(0).toUpperCase() + category.slice(1)} Photo`;
}

function showNoImagesMessage(filter) {
    galleryGrid.innerHTML = `
        <div class="no-images-message" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: rgba(255, 255, 255, 0.7);">
            <i class="fas fa-camera" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary-color);"></i>
            <h3 style="margin-bottom: 1rem;">No images found</h3>
            <p>No images found for ${filter === 'all' ? 'any category' : filter + ' category'}.</p>
            <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">
                Add image filenames to the <code>imageFiles.${filter}</code> array in script.js
            </p>
        </div>
    `;
}

function createGalleryItem(image, index) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-category', image.category);
    galleryItem.style.opacity = '0';
    galleryItem.style.transform = 'scale(0.8)';
    galleryItem.style.transition = 'all 0.5s ease';

    galleryItem.innerHTML = `
        <div class="gallery-image">
        <img src="${image.src}" alt="${image.title}"
     onerror="this.style.display='none';">

            <div class="gallery-overlay">
                <div class="gallery-content">
                    <h4>${image.title}</h4>
                    <p>${image.description}</p>
                    <button class="gallery-btn" data-index="${index}">
                        <i class="fas fa-expand"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add click event to expand button
    const expandBtn = galleryItem.querySelector('.gallery-btn');
    expandBtn.addEventListener('click', () => {
        currentGalleryImage = index;
        openModal();
    });

    // Add click event to the image itself
    const imageElement = galleryItem.querySelector('.gallery-image');
    imageElement.addEventListener('click', () => {
        currentGalleryImage = index;
        openModal();
    });

    return galleryItem;
}

function openModal() {
    const currentImage = galleryImages[currentGalleryImage];
    if (imageModal && modalImage && currentImage) {
        modalImage.src = currentImage.src;
        modalImage.alt = '';
      modalImage.onerror = function () {
    this.style.display = 'none';
};

        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (imageModal) {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function navigateGallery(direction) {
    const newIndex = currentGalleryImage + direction;
    if (newIndex >= 0 && newIndex < galleryImages.length) {
        currentGalleryImage = newIndex;
        const currentImage = galleryImages[currentGalleryImage];
        modalImage.src = currentImage.src;
        modalImage.alt = currentImage.title;
    }
}

// ==========================================================================
// File Management Helper Functions
// ==========================================================================

// Function to help you add images to a category
window.addImagesToCategory = function(category, filenames) {
    if (!imageFiles[category]) {
        imageFiles[category] = [];
    }

    if (Array.isArray(filenames)) {
        imageFiles[category].push(...filenames);
    } else {
        imageFiles[category].push(filenames);
    }

    console.log(`Added ${Array.isArray(filenames) ? filenames.length : 1} images to ${category} category`);

    // Reload gallery if it's currently showing this category or all
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    if (activeFilter === 'all' || activeFilter === category) {
        loadGalleryImages(activeFilter);
    }
};

// Function to remove images from a category
window.removeImagesFromCategory = function(category, filenames) {
    if (!imageFiles[category]) return;

    if (Array.isArray(filenames)) {
        filenames.forEach(filename => {
            const index = imageFiles[category].indexOf(filename);
            if (index > -1) {
                imageFiles[category].splice(index, 1);
            }
        });
    } else {
        const index = imageFiles[category].indexOf(filenames);
        if (index > -1) {
            imageFiles[category].splice(index, 1);
        }
    }

    console.log(`Removed images from ${category} category`);

    // Reload gallery
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    loadGalleryImages(activeFilter);
};

// Function to list all images in a category
window.listImagesInCategory = function(category) {
    if (category) {
        console.log(`Images in ${category}:`, imageFiles[category] || []);
    } else {
        console.log('All images by category:', imageFiles);
    }
};

// ==========================================================================
// Testimonials Slider
// ==========================================================================
function initTestimonials() {
    // Auto-slide every 5 seconds
    setInterval(nextTestimonial, 5000);

    // Navigation buttons
    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', prevTestimonial);
    }
    if (testimonialNext) {
        testimonialNext.addEventListener('click', nextTestimonial);
    }

    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateTestimonial();
        });
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonial();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestimonial();
}

function updateTestimonial() {
    // Update testimonial cards
    testimonialCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentTestimonial);
    });

    // Update dots
    testimonialDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

// ==========================================================================
// Contact Form
// ==========================================================================
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    if (isFormSubmitting) return;

    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);

    // Show loading state
    isFormSubmitting = true;
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    }

    try {
        // Simulate form submission
        await simulateFormSubmission(formObject);

        // Show success message
        showFormSuccess();
        contactForm.reset();

    } catch (error) {
        console.error('Form submission error:', error);
    } finally {
        isFormSubmitting = false;
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        }
    }
}

function showFormSuccess() {
    if (successMessage) {
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
}

// Hide success message on page load
function hideSuccessMessage() {
    if (successMessage) {
        successMessage.classList.remove('show');
    }
}

// Add click to dismiss functionality for success message
function initSuccessMessage() {
    if (successMessage) {
        successMessage.addEventListener('click', hideSuccessMessage);
    }
}

async function simulateFormSubmission(data) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve();
        }, 2000);
    });
}

// ==========================================================================
// Scroll Animations
// ==========================================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.section-title, .section-subtitle, .service-card, .about-image, .about-text, .contact-item, .about-stats, .testimonial-card');

    animateElements.forEach((el, index) => {
        // Add staggered delays
        el.style.transitionDelay = `${index * 0.1}s`;
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ==========================================================================
// Statistics Counter
// ==========================================================================
function countUpStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count') || '0');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toString();
        }, 16);
    });
}

// ==========================================================================
// Utility Functions
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

// ==========================================================================
// Additional Features
// ==========================================================================
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-image');

    const handleParallax = throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        parallaxElements.forEach(element => {
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }, 16);

    window.addEventListener('scroll', handleParallax);
}

function initSmoothScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: var(--text-white);
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        box-shadow: var(--shadow-gold);
    `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'translateY(20px)';
        }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================================================
// Developer Console Helpers
// ==========================================================================
function showDeveloperHelpers() {
    console.log(`
🎨 Ankho Photography Gallery Manager
=====================================

Available commands:
• addImagesToCategory(category, filenames) - Add images to a category
• removeImagesFromCategory(category, filenames) - Remove images from a category
• listImagesInCategory(category) - List all images in a category
• listImagesInCategory() - List all images in all categories

Examples:
• addImagesToCategory('wedding', ['wedding_001.jpg', 'wedding_002.jpg'])
• addImagesToCategory('portrait', 'portrait_new.jpg')
• removeImagesFromCategory('nature', 'old_photo.jpg')
• listImagesInCategory('wedding')

Categories: ${Object.keys(imageFiles).join(', ')}
    `);
}

// ==========================================================================
// Initialization
// ==========================================================================
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }

    try {
        hideSuccessMessage(); // Hide any success messages on load
        initLoadingScreen();
        initNavigation();
        initGallery();
        initTestimonials();
        initContactForm();
        initSuccessMessage();
        initSmoothScrollToTop();

        // Optional: Enable parallax on desktop only
        if (window.innerWidth > 768) {
            initParallaxEffect();
        }

        // Show developer helpers in console
        showDeveloperHelpers();

        console.log('🎨 Photographer Portfolio initialized successfully!');
    } catch (error) {
        console.error('❌ Error initializing portfolio:', error);
    }
}


// Start the application
init();
