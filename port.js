// --- Advanced Accent Theme Customizer Logic ---
const configBtn = document.getElementById('theme-config-btn');
const themeMenu = document.getElementById('theme-menu');
const colorDots = document.querySelectorAll('.color-dot');
const universalPicker = document.getElementById('universal-color-picker');
const pickerWrapper = document.querySelector('.custom-color-picker-wrapper');

// Toggle dropdown panel
configBtn.addEventListener('click', () => {
    themeMenu.classList.toggle('open');
});

// Helper to calculate bright, matching gradient combinations dynamically
function getLightenColor(hex, percent) {
    let num = parseInt(hex.replace("#",""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x10 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

// Applies theme update across CSS Root Engine variables
function applyNewThemeColor(hexColor) {
    const secondaryColor = getLightenColor(hexColor, 15);
    document.documentElement.style.setProperty('--accent-color', hexColor);
    document.documentElement.style.setProperty('--accent-gradient', `linear-gradient(45deg, ${hexColor}, ${secondaryColor})`);
}

// Handle click selections on the static preset dots
colorDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        // Clear active states on all selection items
        document.querySelector('.color-dot.active')?.classList.remove('active');
        pickerWrapper.classList.remove('active');
        
        e.target.classList.add('active');
        const color = e.target.getAttribute('data-color');
        universalPicker.value = color; // Synchronize infinite wheel selector input state
        applyNewThemeColor(color);
    });
});

// Handle changing color through the Infinite Color Wheel Input
universalPicker.addEventListener('input', (e) => {
    document.querySelector('.color-dot.active')?.classList.remove('active');
    pickerWrapper.classList.add('active');
    
    const color = e.target.value;
    applyNewThemeColor(color);
});

// Hide widget frame if user clicks into external spaces
window.addEventListener('click', (e) => {
    if (!e.target.closest('.theme-configurator')) {
        themeMenu.classList.remove('open');
    }
});

// --- Contact Form Submission Handler ---
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the page from refreshing
    
    // Extract values typed by the user
    const name = this.querySelector('input[placeholder="Full Name"]').value;
    const email = this.querySelector('input[placeholder="Email"]').value;
    const phone = this.querySelector('input[placeholder="Phone Number"]').value;
    const subject = this.querySelector('input[placeholder="Subject"]').value;
    const message = this.querySelector('textarea').value;
    
    // Format the email layout text body cleanly
    const bodyMessage = `Hello Anmol,\n\n${message}\n\nFrom,\n${name}\nEmail: ${email}\nPhone: ${phone}`;
    
    // Generate direct deep-link straight into a Gmail compose tab
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=anmol2105mehta@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyMessage)}`;
    
    // Open the draft inside a clean new browser tab
    window.open(mailtoUrl, '_blank');
});

// --- Dynamic Typer Text Animation ---
const targetSpan = document.getElementById('typing-text');
const titles = [
    "Computer Science Student.",
    "Web Developer.",
    "Mechatronics Specialist.",
    "Problem Solver."
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeAnimation() {
    const currentFullText = titles[titleIndex];
    
    if (isDeleting) {
        targetSpan.textContent = currentFullText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40; 
    } else {
        targetSpan.textContent = currentFullText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; 
    }

    if (!isDeleting && charIndex === currentFullText.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 400; 
    }

    setTimeout(typeAnimation, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeAnimation, 500);
});