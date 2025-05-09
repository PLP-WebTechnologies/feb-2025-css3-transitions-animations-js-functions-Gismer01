// DOM elements
const themeSelect = document.getElementById('theme');
const speedSelect = document.getElementById('animation-speed');
const savePrefsBtn = document.getElementById('save-prefs');
const animateBtn = document.getElementById('animate-btn');
const addContentBtn = document.getElementById('add-content');
const contentArea = document.getElementById('content-area');
const animatedImage = document.getElementById('animated-image');
const animationBox = document.getElementById('box1');

// Load saved preferences
function loadPreferences() {
    const savedTheme = localStorage.getItem('theme');
    const savedSpeed = localStorage.getItem('animationSpeed');
    
    if (savedTheme) {
        themeSelect.value = savedTheme;
        document.body.classList.add(savedTheme);
    }
    
    if (savedSpeed) {
        speedSelect.value = savedSpeed;
        applyAnimationSpeed(savedSpeed);
    }
}

// Save preferences to localStorage
function savePreferences() {
    const theme = themeSelect.value;
    const speed = speedSelect.value;
    
    localStorage.setItem('theme', theme);
    localStorage.setItem('animationSpeed', speed);
    
    // Apply the preferences
    applyTheme(theme);
    applyAnimationSpeed(speed);
    
    alert('Preferences saved!');
    console.log(`Theme: ${theme}, Animation Speed: ${speed}`);
}

// Apply selected theme
function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('light', 'dark', 'blue');
    
    // Add the selected theme
    if (theme) {
        document.body.classList.add(theme);
    }
}

// Apply animation speed
function applyAnimationSpeed(speed) {
    // Remove all speed classes from elements that might have them
    document.querySelectorAll('.slow, .normal, .fast').forEach(el => {
        el.classList.remove('slow', 'normal', 'fast');
    });
    
    // Add speed class to elements that need it
    if (speed) {
        document.body.classList.add(speed);
        animateBtn.classList.add(speed);
        animationBox.classList.add(speed);
        animatedImage.classList.add(speed);
    }
}

// Trigger custom animation
function triggerAnimation() {
    // Add bounce animation to the box
    animationBox.style.animation = 'bounce 1s';
    
    // Add shake animation to the image
    animatedImage.style.animation = 'shake 0.5s';
    
    // Remove the animations after they complete
    setTimeout(() => {
        animationBox.style.animation = '';
        animatedImage.style.animation = '';
    }, 1000);
}

// Add new content with animation
function addNewContent() {
    const contentTypes = [
        'New article added!',
        'Updated content available.',
        'Fresh news just arrived!',
        'Check out this new feature!',
        'Latest updates for you.'
    ];
    
    const randomContent = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    const contentItem = document.createElement('div');
    contentItem.className = 'content-item';
    contentItem.textContent = randomContent;
    
    contentArea.appendChild(contentItem);
    
    // Auto-scroll to show new content
    contentItem.scrollIntoView({ behavior: 'smooth' });
}

// Add shake animation for the image (dynamically)
function addShakeAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0% { transform: translateX(0) rotate(0); }
            20% { transform: translateX(-10px) rotate(-5deg); }
            40% { transform: translateX(10px) rotate(5deg); }
            60% { transform: translateX(-10px) rotate(-5deg); }
            80% { transform: translateX(10px) rotate(5deg); }
            100% { transform: translateX(0) rotate(0); }
        }
    `;
    document.head.appendChild(style);
}

// Event listeners
savePrefsBtn.addEventListener('click', savePreferences);
animateBtn.addEventListener('click', triggerAnimation);
addContentBtn.addEventListener('click', addNewContent);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    addShakeAnimation();
    
    // Additional hover effect for the animate button
    animateBtn.addEventListener('mouseenter', () => {
        animateBtn.style.transform = 'scale(1.1)';
    });
    
    animateBtn.addEventListener('mouseleave', () => {
        animateBtn.style.transform = 'scale(1)';
    });
});

