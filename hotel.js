// Hotel Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Form handling
    initForms();
    
    // Animations
    initAnimations();
    
    // Interactive features
    initInteractiveFeatures();
    
    // Date picker setup
    initDatePickers();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Form handling
function initForms() {
    // Booking form
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    // Contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Reservation buttons
    const reserveButtons = document.querySelectorAll('.reserve-btn');
    reserveButtons.forEach(btn => {
        btn.addEventListener('click', handleReservation);
    });
    
    // Room view buttons
    const viewRoomButtons = document.querySelectorAll('.view-room');
    viewRoomButtons.forEach(btn => {
        btn.addEventListener('click', handleViewRoom);
    });
    
    // Book Now buttons
    const bookNowButtons = document.querySelectorAll('.book-now-btn, .btn-primary');
    bookNowButtons.forEach(btn => {
        btn.addEventListener('click', scrollToBooking);
    });
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    const roomtype = document.getElementById('roomtype').value;
    
    // Validate dates
    if (!checkin || !checkout) {
        showNotification('Please select check-in and check-out dates', 'error');
        return;
    }
    
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkinDate < today) {
        showNotification('Check-in date cannot be in the past', 'error');
        return;
    }
    
    if (checkoutDate <= checkinDate) {
        showNotification('Check-out date must be after check-in date', 'error');
        return;
    }
    
    // Simulate booking search
    showNotification('Searching for available rooms...', 'info');
    
    setTimeout(() => {
        showNotification('Great! We found available rooms for your dates. Redirecting to booking page...', 'success');
        // Here you would typically redirect to a booking page or show available rooms
    }, 2000);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || e.target.querySelector('textarea').value;
    
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Sending your message...', 'info');
    
    setTimeout(() => {
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        e.target.reset();
    }, 1500);
}

function handleReservation(e) {
    e.preventDefault();
    const restaurantName = e.target.closest('.restaurant').querySelector('h3').textContent;
    showNotification(`Opening reservation system for ${restaurantName}...`, 'info');
    
    setTimeout(() => {
        showNotification('Reservation system opened! Please select your preferred time.', 'success');
    }, 1000);
}

function handleViewRoom(e) {
    e.preventDefault();
    const roomName = e.target.closest('.room-card').querySelector('h3').textContent;
    showNotification(`Loading detailed view for ${roomName}...`, 'info');
    
    setTimeout(() => {
        showNotification('Room details loaded! Virtual tour available.', 'success');
    }, 1000);
}

function scrollToBooking() {
    const bookingSection = document.querySelector('.booking-widget');
    if (bookingSection) {
        const offsetTop = bookingSection.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(`
        .room-card,
        .amenity-card,
        .testimonial,
        .restaurant,
        .about-content,
        .contact-content
    `);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Counter animation for statistics (if you want to add them)
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Interactive features
function initInteractiveFeatures() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Image gallery for rooms (if implemented)
    initImageGallery();
    
    // Testimonial slider
    initTestimonialSlider();
    
    // Loading animations
    initLoadingAnimations();
}

function initImageGallery() {
    const roomImages = document.querySelectorAll('.room-image img');
    
    roomImages.forEach(img => {
        img.addEventListener('click', (e) => {
            // Create modal for full-size image view
            createImageModal(e.target.src, e.target.alt);
        });
    });
}

function createImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <img src="${src}" alt="${alt}">
                <button class="close-modal">&times;</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            document.body.removeChild(modal);
        }
    });
}

function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length <= 1) return;
    
    // Auto-rotate testimonials
    setInterval(() => {
        testimonials[currentTestimonial].style.opacity = '0.7';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.opacity = '1';
    }, 5000);
}

function initLoadingAnimations() {
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!btn.classList.contains('loading')) {
                btn.classList.add('loading');
                
                setTimeout(() => {
                    btn.classList.remove('loading');
                }, 2000);
            }
        });
    });
}

// Date picker functionality
function initDatePickers() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        checkinInput.setAttribute('min', today);
        checkoutInput.setAttribute('min', today);
        
        // Update checkout minimum when checkin changes
        checkinInput.addEventListener('change', (e) => {
            const checkinDate = new Date(e.target.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            const minCheckout = checkinDate.toISOString().split('T')[0];
            checkoutInput.setAttribute('min', minCheckout);
            
            // Clear checkout if it's before the new minimum
            if (checkoutInput.value && checkoutInput.value <= e.target.value) {
                checkoutInput.value = '';
            }
        });
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS for notifications and animations
function addDynamicStyles() {
    const styles = `
        <style>
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-info {
            border-left: 4px solid #3498db;
        }
        
        .notification-success {
            border-left: 4px solid #27ae60;
        }
        
        .notification-error {
            border-left: 4px solid #e74c3c;
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        }
        
        .modal-backdrop {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .modal-content img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 8px;
        }
        
        .close-modal {
            position: absolute;
            top: -10px;
            right: -10px;
            background: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .loading {
            position: relative;
            pointer-events: none;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid transparent;
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .notification {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Initialize dynamic styles
addDynamicStyles();