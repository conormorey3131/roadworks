// Main JavaScript for Roadworks IRE

// Featured Car Data
const featuredCar = {
    id: 'featured-build-01',
    name: "Josh's S15 Silvia",
    slug: 'featured-build-01',
    tagline: 'European Excellence Meets Japanese Heritage',
    themeColor: '#B40F0E',
    secondaryColor: '#8B0000',
    owner: 'Josh (Juicebox)',
    ownerYoutube: 'https://www.youtube.com/@juicebox'
};

// Initialize theme
function initTheme() {
    const root = document.documentElement;
    root.style.setProperty('--theme-hex', featuredCar.themeColor);
    root.style.setProperty('--theme-dark', featuredCar.secondaryColor);
    
    // Convert hex to RGB for opacity support
    const hex = featuredCar.themeColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    root.style.setProperty('--theme-color', `${r}, ${g}, ${b}`);
}

// Header scroll effect
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    function openMenu() {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenuPanel.style.transform = 'translateX(0)';
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        mobileMenuPanel.style.transform = 'translateX(100%)';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }
    
    mobileMenuBtn.addEventListener('click', openMenu);
    mobileMenuOverlay?.addEventListener('click', closeMenu);
    
    // Close menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply to fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Gallery functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    if (!galleryItems.length || !lightbox) return;
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);
    
    function showImage(index) {
        currentIndex = index;
        lightboxImg.src = images[index];
        lightboxCounter.textContent = `${index + 1} / ${images.length}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeGallery() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }
    
    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => showImage(index));
    });
    
    closeBtn?.addEventListener('click', closeGallery);
    prevBtn?.addEventListener('click', prevImage);
    nextBtn?.addEventListener('click', nextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
    
    // Close on background click
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeGallery();
    });
}

// Progress bar for blog posts
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar-fill');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Load more functionality for blog
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    const hiddenPosts = document.querySelectorAll('.post-hidden');
    
    if (!loadMoreBtn || !hiddenPosts.length) return;
    
    let currentVisible = 6;
    const increment = 3;
    
    loadMoreBtn.addEventListener('click', () => {
        const nextVisible = currentVisible + increment;
        
        hiddenPosts.forEach((post, index) => {
            if (index < nextVisible) {
                post.classList.remove('post-hidden');
                post.classList.add('fade-in');
            }
        });
        
        currentVisible = nextVisible;
        
        if (currentVisible >= hiddenPosts.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
}

// Update copyright year
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('#copyright-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// Simple image loading - no complex lazy loading that can break on mobile
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Skip if no src or src is not a valid image path
        if (!img.src || img.src.includes('.html') || img.src === window.location.href) {
            console.warn(`Skipping invalid image src: ${img.src}`);
            return;
        }
        
        // Force all images to be visible immediately
        img.style.opacity = '1';
        img.style.display = 'block';
        
        // Remove any loading classes that might hide images
        img.classList.remove('loading');
        
        // Ensure images are loaded
        if (!img.complete) {
            img.onload = function() {
                this.style.opacity = '1';
                this.classList.add('loaded');
            };
            
            img.onerror = function() {
                // Only process if this is actually an image path
                if (this.src && !this.src.includes('.html') && this.src !== window.location.href) {
                    console.warn('Failed to load image:', this.src);
                    // Try encoded version if it has special characters
                    if (this.src.includes(' ') || this.src.includes('(') || this.src.includes(')')) {
                        const encodedSrc = encodeImageSrc(this.src);
                        if (encodedSrc !== this.src) {
                            console.log('Retrying with encoded path:', encodedSrc);
                            this.src = encodedSrc;
                        }
                    }
                }
            };
        } else {
            img.classList.add('loaded');
        }
    });
}

// Immediate loading for critical images
function loadImageImmediate(img) {
    const imageUrl = img.dataset.src || img.src;
    
    if (img.complete && img.naturalHeight !== 0) {
        // Image is already loaded
        img.classList.add('loaded');
        img.style.opacity = '1';
        return;
    }
    
    img.onload = function() {
        img.classList.add('loaded');
        img.style.opacity = '1';
    };
    
    img.onerror = function() {
        img.classList.add('image-error');
        img.style.background = '#f3f4f6';
        img.style.minHeight = '200px';
    };
    
    // If using data-src, set the src
    if (img.dataset.src && !img.src) {
        img.src = imageUrl;
    }
}

function loadImage(img) {
    const imageUrl = img.dataset.src || img.src;
    
    // Add loading state
    img.classList.add('image-loading');
    
    // Create a new image to preload
    const imageLoader = new Image();
    
    imageLoader.onload = function() {
        // Image loaded successfully
        img.src = imageUrl;
        img.classList.remove('loading', 'image-loading');
        img.classList.add('loaded');
        
        // Remove any placeholder effects
        if (img.classList.contains('image-placeholder')) {
            img.classList.add('loaded');
        }
        
        // Trigger fade in
        setTimeout(() => {
            img.style.opacity = '1';
        }, 50);
    };
    
    imageLoader.onerror = function() {
        // Image failed to load, show fallback
        img.classList.remove('loading', 'image-loading');
        img.classList.add('image-error');
        
        // Set fallback properties
        img.style.background = '#f3f4f6';
        img.style.border = '2px solid #e5e7eb';
        img.style.minHeight = '200px';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        
        // Hide the broken image icon
        img.style.textIndent = '-9999px';
        img.alt = 'Image failed to load';
    };
    
    // Start loading
    imageLoader.src = imageUrl;
}

// Helper function to encode image src for files with spaces and special characters
function encodeImageSrc(path) {
    const parts = path.split("/");
    const fileName = parts.pop();
    return [...parts, encodeURIComponent(fileName)].join("/");
}

// Add error handling for failed image loads
function addImageErrorHandling() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Skip if no src or src is not a valid image path
        if (!img.src || img.src.includes('.html') || img.src === window.location.href) {
            console.warn(`Skipping invalid image src: ${img.src}`);
            return;
        }
        
        img.addEventListener('error', function() {
            // Only log if this is actually an image path
            if (this.src && !this.src.includes('.html') && this.src !== window.location.href) {
                console.warn(`Failed to load image: ${this.src}`);
                
                // Try encoded version if original fails
                if (!this.dataset.retried && (this.src.includes(' ') || this.src.includes('(') || this.src.includes(')'))) {
                    this.dataset.retried = 'true';
                    const encodedSrc = encodeImageSrc(this.src);
                    console.log(`Retrying with encoded path: ${encodedSrc}`);
                    this.src = encodedSrc;
                } else {
                    // Show fallback
                    this.classList.add('image-error');
                    this.style.background = '#f3f4f6';
                    this.style.minHeight = '200px';
                }
            }
        });
    });
}

// Optimize images for different screen sizes
function optimizeImages() {
    const images = document.querySelectorAll('img');
    const screenWidth = window.innerWidth;
    
    images.forEach(img => {
        // Set appropriate sizes based on screen width and image context
        const isHeroImage = img.closest('.hero');
        const isGalleryImage = img.closest('.gallery-item');
        const isFeaturedPost = img.closest('.post-card.featured');
        const isRegularPost = img.closest('.post-card:not(.featured)');
        
        if (isHeroImage) {
            // Hero images should always be full width
            img.setAttribute('sizes', '100vw');
        } else if (isGalleryImage) {
            // Gallery images are responsive grid items
            if (screenWidth <= 768) {
                img.setAttribute('sizes', '100vw');
            } else if (screenWidth <= 1024) {
                img.setAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
            } else {
                img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw');
            }
        } else if (isFeaturedPost) {
            // Featured post images
            img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw');
        } else if (isRegularPost) {
            // Regular post card images
            if (screenWidth <= 768) {
                img.setAttribute('sizes', '100vw');
            } else {
                img.setAttribute('sizes', '(max-width: 768px) 100vw, 33vw');
            }
        } else {
            // Default sizing
            if (screenWidth <= 640) {
                img.setAttribute('sizes', '100vw');
            } else if (screenWidth <= 1024) {
                img.setAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
            } else {
                img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
            }
        }
        
        // Ensure proper dimensions and loading attributes
        if (!img.style.width && !img.style.height) {
            img.style.width = '100%';
            img.style.height = 'auto';
        }
        
        // Add loading attribute for better performance
        if (!img.hasAttribute('loading')) {
            if (isHeroImage || img.getBoundingClientRect().top < window.innerHeight) {
                img.setAttribute('loading', 'eager');
            } else {
                img.setAttribute('loading', 'lazy');
            }
        }
        
        // Ensure proper decoding
        if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
        }
    });
}

// Handle resize events for responsive images
function handleResize() {
    optimizeImages();
}

// Force immediate image visibility to prevent browser interventions
function forceImageVisibility() {
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        // Only process images with valid src attributes
        if (img.src && !img.src.includes('.html') && img.src !== window.location.href) {
            img.style.opacity = '1';
            img.style.display = 'block';
            img.style.visibility = 'visible';
            // Force the browser to load the image immediately
            img.loading = 'eager';
        }
    });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeader();
    initMobileMenu();
    initAnimations();
    initGallery();
    initProgressBar();
    initSmoothScroll();
    setActiveNavLink();
    initLoadMore();
    updateCopyrightYear();
    
    // Initialize simple image loading
    initImageLoading();
    addImageErrorHandling();
    optimizeImages();
    
    // Force immediate image visibility
    forceImageVisibility();
    
    // Single fallback after page load
    setTimeout(() => {
        forceImageVisibility();
    }, 1000);
});

// Handle window resize
window.addEventListener('resize', handleResize);

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.querySelectorAll('.animate-bounce').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page is visible
        document.querySelectorAll('.animate-bounce').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});