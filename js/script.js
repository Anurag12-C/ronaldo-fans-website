// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            if (navMenu) navMenu.style.display = 'none';
        }
    });
});

// Newsletter Subscribe Handler
function handleSubscribe(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (email) {
        // Simulate API call
        console.log('Subscribing email:', email);
        
        // Show success message
        const successMessage = document.getElementById('subscribe-message');
        successMessage.style.display = 'block';
        
        // Clear input
        event.target.querySelector('input[type="email"]').value = '';
        
        // Hide message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
        
        // In a real application, you would send this data to a backend server
        // Example:
        // fetch('/api/subscribe', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email: email })
        // })
    }
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for animation
const cardsToObserve = document.querySelectorAll('.bio-card, .stat-card, .news-card, .gallery-item');
cardsToObserve.forEach(card => {
    observer.observe(card);
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Social Media Integration - Loading Latest Posts
function loadSocialFeed() {
    // In a real application, you would fetch data from social media APIs
    // This is a placeholder for demonstration
    console.log('Loading social media feed...');
    
    // Example of integrating with Instagram API:
    // You would need to get an Instagram Graph API token and call:
    // fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${token}`)
    
    // For Twitter/X API:
    // fetch(`https://api.twitter.com/2/tweets/search/recent?query=from:cristiano&max_results=10&tweet.fields=created_at,public_metrics`, {
    //     headers: { 'Authorization': `Bearer ${bearerToken}` }
    // })
}

// Call social feed loader when page loads
window.addEventListener('load', loadSocialFeed);

// Share Functionality
function shareOnSocial(platform) {
    const pageUrl = window.location.href;
    const pageTitle = 'Check out CR7 Legends - The Ultimate Cristiano Ronaldo Fan Site';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle + ' ' + pageUrl)}`;
            break;
        case 'instagram':
            alert('Copy the link and share it on Instagram!');
            navigator.clipboard.writeText(pageUrl);
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, 'social-share', 'width=600,height=400');
    }
}

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Analytics Tracking (for tracking social media engagement)
function trackSocialClick(platform) {
    if (window.gtag) {
        gtag('event', 'social_media_click', {
            'platform': platform,
            'page_title': document.title
        });
    }
    console.log('Tracked click on:', platform);
}

// Add click tracking to social buttons
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const platform = button.classList[1]; // Gets the platform class
        trackSocialClick(platform);
    });
});

// Search Functionality
function searchContent(query) {
    // Placeholder for search functionality
    console.log('Searching for:', query);
    // In a real application, you would implement actual search logic
}

// Dark Mode Toggle (optional feature)
function toggleDarkMode() {
    const htmlElement = document.documentElement;
    htmlElement.style.colorScheme = htmlElement.style.colorScheme === 'dark' ? 'light' : 'dark';
}

// Parallax Scrolling Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded successfully!');
    // Initialize any additional features here
});