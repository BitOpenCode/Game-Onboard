// Toggling Skill Tabs - only if elements exist
(function() {
    const tabs = document.querySelectorAll('[data-target]');
    const tabContent = document.querySelectorAll('[data-content]');
    
    if (tabs.length > 0 && tabContent.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = document.querySelector(tab.dataset.target);

                tabContent.forEach(tabContents => {
                    tabContents.classList.remove('skills-active');
                })

                target.classList.add('skills-active');

                tabs.forEach(tab => {
                    tab.classList.remove('skills-active');
                })

                tab.classList.add('skills-active');
            })
        })
    }
})();

// Initialize removed elements only after DOM is ready
(function() {
    function initRemovedElements() {
        //Mix it up Sorting - REMOVED (no .work-container exists)

        // Active link changing - only if work items exist
        const linkWork = document.querySelectorAll('.work-item');
        if (linkWork.length > 0) {
            function activeWork() {
                linkWork.forEach(l => l.classList.remove('active-work'))
                this.classList.add('active-work')
            }
            linkWork.forEach(l => l.addEventListener('click', activeWork));
        }

        //Portfolio Popup - only if popup exists
        const portfolioPopup = document.querySelector('.portfolio-popup');
        const portfolioPopupClose = document.querySelector('.portfolio-popup-close');

        if (portfolioPopup && portfolioPopupClose) {
            document.addEventListener('click', (e) => {
                if(e.target.classList.contains('work-button')){
                    togglePortfolioPopup();
                    portfolioItemDetails(e.target.parentElement);
                }
            })

            function togglePortfolioPopup() {
                portfolioPopup.classList.toggle('open');
            }

            portfolioPopupClose.addEventListener('click', togglePortfolioPopup);

            function portfolioItemDetails(portfolioItem) {
                const thumbnailImg = document.querySelector('.pp-thumbnail img');
                const popupSubtitle = document.querySelector('.portfolio-popup-subtitle span');
                const popupBody = document.querySelector('.portfolio-popup-body');
                
                if (thumbnailImg) thumbnailImg.src = portfolioItem.querySelector('.work-img').src;
                if (popupSubtitle) popupSubtitle.innerHTML = portfolioItem.querySelector('.work-title').innerHTML;
                if (popupBody) popupBody.innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML;
            }
        }

        //Services Popup - only if exists
        const modalViews = document.querySelectorAll('.services-modal');
        const modelBtns = document.querySelectorAll('.services-button');
        const modalCloses = document.querySelectorAll('.services-modal-close');

        if (modalViews.length > 0 && modelBtns.length > 0) {
            let modal = function(modalClick) {
                modalViews[modalClick].classList.add('active-modal');
            }

            modelBtns.forEach((modelBtn, i) => {
                modelBtn.addEventListener('click', () => {
                    modal(i);
                })
            })

            modalCloses.forEach((modalClose) => {
                modalClose.addEventListener('click', () => {
                    modalViews.forEach((modalView) => {
                        modalView.classList.remove('active-modal');
                    })
                })
            })
        }

        //Swiper Testimonial - only if container exists
        const testimonialsContainer = document.querySelector(".testimonials-container");
        if (testimonialsContainer) {
            let swiper = new Swiper(".testimonials-container", {
                spaceBetween: 24,
                loop: true,
                grabCursor: true,
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
                },
                breakpoints: {
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 48,
                    },
                },
            });
        }
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRemovedElements);
    } else {
        initRemovedElements();
    }
})();

// Input Animation - only if inputs exist
(function() {
    const inputs = document.querySelectorAll('.input');
    
    if (inputs && inputs.length > 0) {
        function focusFunc() {
            let parent = this.parentNode;
            if (parent) {
                parent.classList.add('focus');
            }
        }

        function blurFunc() {
            let parent = this.parentNode;
            if (parent && this.value == "") {
                parent.classList.remove('focus');
            }
        }

        inputs.forEach((input) => {
            if (input) {
                input.addEventListener('focus', focusFunc);
                input.addEventListener('blur', blurFunc);
            }
        });
    }
})();

// Scroll Section Active Link - only for visible sections
(function() {
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length > 0) {
        function navHighlighter() {
            let scrollY = window.pageYOffset;
            sections.forEach(current => {
                // Only process visible sections
                if (window.getComputedStyle(current).display === 'none') return;
                
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');

                const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
                if (!navLink) return;

                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            })
        }
        
        window.addEventListener('scroll', navHighlighter);
    }
})();

// Activating Sidebar

const navMenu = document.getElementById('sidebar');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-sidebar');
    })
}

if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-sidebar');
    })
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const toggleIcon = document.querySelector('.toggle-icon');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
if (currentTheme === 'light') {
    toggleIcon.classList.remove('uil-moon');
    toggleIcon.classList.add('uil-sun');
}

themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Toggle between light and dark theme
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    if (newTheme === 'light') {
        toggleIcon.classList.remove('uil-moon');
        toggleIcon.classList.add('uil-sun');
    } else {
        toggleIcon.classList.remove('uil-sun');
        toggleIcon.classList.add('uil-moon');
    }
});

// Keypad Functionality
const keys = {
    one: {
        element: document.getElementById('key-one'),
        text: 'ok'
    },
    two: {
        element: document.getElementById('key-two'),
        text: 'go'
    },
    three: {
        element: document.getElementById('key-three'),
        text: 'create.'
    }
};

// Add click sound effect
const clickAudio = new Audio('https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3');
clickAudio.muted = true; // Start muted

// Handle keypad button clicks
Object.values(keys).forEach(key => {
    key.element.addEventListener('pointerdown', () => {
        key.element.dataset.pressed = 'true';
        if (!clickAudio.muted) {
            clickAudio.currentTime = 0;
            clickAudio.play().catch(() => {});
        }
    });
    
    key.element.addEventListener('pointerup', () => {
        key.element.dataset.pressed = 'false';
    });
    
    key.element.addEventListener('click', () => {
        console.log(`Key pressed: ${key.text}`);
    });
});

// Keyboard support
window.addEventListener('keydown', (event) => {
    if (event.key === 'o' && keys.one.element) {
        keys.one.element.dataset.pressed = 'true';
    } else if (event.key === 'g' && keys.two.element) {
        keys.two.element.dataset.pressed = 'true';
    } else if (event.key === 'Enter' && keys.three.element) {
        keys.three.element.dataset.pressed = 'true';
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key === 'o' && keys.one.element) {
        keys.one.element.dataset.pressed = 'false';
    } else if (event.key === 'g' && keys.two.element) {
        keys.two.element.dataset.pressed = 'false';
    } else if (event.key === 'Enter' && keys.three.element) {
        keys.three.element.dataset.pressed = 'false';
    }
});

// Section Navigation - Show/Hide Sections
const mainSections = ['home', 'feature-cards', 'about'];
const contentSections = ['welcome', 'assets', 'tips', 'guides', 'community', 'visualizer', 'pools', 'ambassador', 'leaderboard', 'events', 'city'];

// Test function - can be called from console
window.testShowAssets = function() {
    console.log('TEST: Showing assets section');
    showSection('assets');
};

function showSection(sectionId) {
    console.log('=== SHOW SECTION ===', sectionId);
    
    // Hide main sections first
    mainSections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            console.log(`Hiding main section: ${id}`);
            section.style.setProperty('display', 'none', 'important');
            section.style.setProperty('visibility', 'hidden', 'important');
        } else {
            console.warn(`Main section not found: ${id}`);
        }
    });
    
    // Hide all other content sections
    contentSections.forEach(id => {
        const section = document.getElementById(id);
        if (section && id !== sectionId) {
            section.style.setProperty('display', 'none', 'important');
            section.style.setProperty('visibility', 'hidden', 'important');
            section.classList.remove('active');
        }
    });
    
    // Show footer
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.style.setProperty('display', 'block', 'important');
    }
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    console.log('Target section element:', targetSection);
    console.log('Section ID requested:', sectionId);
    console.log('Available content sections:', contentSections);
    
    if (targetSection) {
        // Force show with important flags
        targetSection.style.setProperty('display', 'block', 'important');
        targetSection.style.setProperty('visibility', 'visible', 'important');
        targetSection.style.setProperty('position', 'relative', 'important');
        targetSection.style.setProperty('z-index', '100', 'important');
        targetSection.classList.add('active');
        
        // Verify it's visible
        const computedDisplay = window.getComputedStyle(targetSection).display;
        const computedVisibility = window.getComputedStyle(targetSection).visibility;
        console.log('Section display after setting:', computedDisplay);
        console.log('Section visibility after setting:', computedVisibility);
        console.log('Section should be visible now');
        
        if (computedDisplay === 'none' || computedVisibility === 'hidden') {
            console.error('WARNING: Section still hidden after show attempt!');
        }
        
        // Update active link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active-link');
            }
        });
        
        // Scroll to top
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    } else {
        console.error('SECTION NOT FOUND:', sectionId);
        console.error('Checking all sections with IDs:');
        document.querySelectorAll('section[id]').forEach(s => {
            console.log(`  Found section with id="${s.id}"`);
        });
    }
}

function showMainPage() {
    console.log('=== SHOW MAIN PAGE ===');
    
    // Hide all content sections with !important
    contentSections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.style.setProperty('display', 'none', 'important');
            section.style.setProperty('visibility', 'hidden', 'important');
            section.classList.remove('active');
        }
    });
    
    // Show main sections
    mainSections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.style.setProperty('display', 'block', 'important');
            section.style.setProperty('visibility', 'visible', 'important');
        }
    });
    
    // Show footer
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.style.setProperty('display', 'block', 'important');
    }
    
    // Update active link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#home') {
            link.classList.add('active-link');
        }
    });
    
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
}

// Function to navigate to section - GLOBAL
function navigateToSection(href) {
    console.log('Navigate to:', href);
    if (href && href.startsWith('#')) {
        const sectionId = href.substring(1);
        console.log('Section ID:', sectionId);
        
        if (sectionId === 'home') {
            showMainPage();
        } else if (contentSections.includes(sectionId)) {
            console.log('Calling showSection for:', sectionId);
            showSection(sectionId);
        }
    }
}

// Initialize
(function() {
    'use strict';
    
    function initNavigation() {
        // Handle navigation menu clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const sectionId = href.substring(1);
                    if (sectionId === 'home') {
                        showMainPage();
                    } else if (contentSections.includes(sectionId)) {
                        showSection(sectionId);
                    }
                }
            });
        });
        
        // Handle footer links
        document.querySelectorAll('.footer-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const sectionId = href.substring(1);
                    if (sectionId === 'home') {
                        showMainPage();
                    } else if (contentSections.includes(sectionId)) {
                        showSection(sectionId);
                    }
                }
            });
        });
        
        // Handle clicks on feature cards - CRITICAL
        function attachCardHandlers() {
            const cards = document.querySelectorAll('.feature-card');
            console.log('Cards found for navigation:', cards.length);
            
            if (cards.length === 0) {
                console.error('NO CARDS FOUND! Retrying in 500ms...');
                setTimeout(attachCardHandlers, 500);
                return;
            }
            
            cards.forEach((card, idx) => {
                // Find any link inside the card
                const cardLink = card.querySelector('a[href^="#"]');
                
                if (cardLink) {
                    const href = cardLink.getAttribute('href');
                    const sectionId = href.substring(1);
                    
                    console.log(`Setting up card ${idx}: href="${href}", sectionId="${sectionId}"`);
                    
                    // Make entire card clickable
                    card.style.cursor = 'pointer';
                    card.setAttribute('data-section', sectionId);
                    
                    // Use the original card directly
                    const targetCard = card;
                    const targetLink = cardLink;
                    
                    // Click handler for entire card
                    const handleCardClick = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('=== CARD CLICKED ===');
                        console.log('Card index:', idx);
                        console.log('Section ID:', sectionId);
                        console.log('Content sections:', contentSections);
                        console.log('Is in content sections?', contentSections.includes(sectionId));
                        
                        if (sectionId === 'home') {
                            showMainPage();
                        } else if (contentSections.includes(sectionId)) {
                            console.log('Calling showSection with:', sectionId);
                            showSection(sectionId);
                        } else {
                            console.error('Section not in list:', sectionId);
                            console.error('Available sections:', contentSections);
                        }
                    };
                    
                    // Also handle link clicks
                    if (targetLink) {
                        targetLink.addEventListener('click', handleCardClick, true);
                    }
                    
                    // Handle card click
                    targetCard.addEventListener('click', handleCardClick, true);
                    console.log(`✓ Card ${idx} (${sectionId}) - handlers attached`);
                } else {
                    console.warn(`✗ Card ${idx} has no link with href`);
                }
            });
        }
        
        // Try immediately, then retry after DOM is ready
        attachCardHandlers();
        setTimeout(attachCardHandlers, 100);
        setTimeout(attachCardHandlers, 500);
        
        console.log('Navigation initialization complete');
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            showMainPage();
            initNavigation();
        });
    } else {
        showMainPage();
        initNavigation();
    }
})();