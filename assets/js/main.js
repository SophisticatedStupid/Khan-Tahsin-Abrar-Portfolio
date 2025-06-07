// main.js for NovaCore Theme

// Importing Three.js, Iridescence and TextEffect
import * as THREE from 'three';
import Iridescence from './iridescence.js';
import SquaresBG from './squares-bg.js';

// --- 1. Dark/Light Mode Toggle ---
function setupThemeToggle() {
    const themeToggleButton = document.getElementById('theme-toggle'); // Use the ID of the new button
    if (!themeToggleButton) {
        // console.log("Corner theme toggle button not found.");
        return;
    }

    const htmlElement = document.documentElement;
    const sunIcon = themeToggleButton.querySelector('.icon-sun'); 
    const moonIcon = themeToggleButton.querySelector('.icon-moon');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme); 

        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                moonIcon.style.display = 'inline-block'; 
                sunIcon.style.display = 'none';    
            } else {
                moonIcon.style.display = 'none';     
                sunIcon.style.display = 'inline-block'; 
            }
        }
    };
    
    const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    if (sunIcon && moonIcon) { // Initial icon state
         if (currentTheme === 'dark') {
            moonIcon.style.display = 'inline-block';
            sunIcon.style.display = 'none';
        } else {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline-block';
        }
    }

    themeToggleButton.addEventListener('click', () => {
        const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}


// --- 2. LRW/HRW Mode Toggle ---
let iridescenceInstance = null;

// Update the resource mode toggle to handle iridescence
function setupResourceModeToggle() {
    const toggleButton = document.getElementById('resource-mode-toggle');
    if (!toggleButton) {
        return;
    }

    const htmlElement = document.documentElement;
    const hrwSpan = toggleButton.querySelector('.mode-hrw');
    const lrwSpan = toggleButton.querySelector('.mode-lrw');

    const applyMode = (mode) => {
        if (mode === 'LRW') {
            htmlElement.classList.add('lrw-mode');
            htmlElement.classList.remove('hrw-mode'); 
            if (lrwSpan) lrwSpan.style.display = 'inline';
            if (hrwSpan) hrwSpan.style.display = 'none';
            // Destroy iridescence in LRW mode
            if (iridescenceInstance) {
                iridescenceInstance.destroy();
                iridescenceInstance = null;
            }
        } else { 
            htmlElement.classList.add('hrw-mode'); 
            htmlElement.classList.remove('lrw-mode');
            if (hrwSpan) hrwSpan.style.display = 'inline';
            if (lrwSpan) lrwSpan.style.display = 'none';
            // Initialize iridescence in HRW mode
            setupIridescence(); // Call the full setup instead of just creating instance
        }
        localStorage.setItem('resourceMode', mode); 
    };
    
    let initialMode = localStorage.getItem('resourceMode');
    if (!initialMode) { 
        initialMode = htmlElement.classList.contains('lrw-mode') ? 'LRW' : 'HRW';
    }
    applyMode(initialMode); 

    toggleButton.addEventListener('click', () => {
        const newMode = htmlElement.classList.contains('lrw-mode') ? 'HRW' : 'LRW';
        applyMode(newMode);
    });
}

// --- 3. Mobile Navigation Toggle ---
function setupMobileNavToggle() {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    if (mobileNavToggle && mobileNavMenu) {
        mobileNavToggle.addEventListener('click', () => {
            const isHidden = mobileNavMenu.classList.toggle('hidden'); 
            const isExpanded = !isHidden; 
            mobileNavToggle.setAttribute('aria-expanded', isExpanded.toString());
            
            const hamburgerIcon = mobileNavToggle.querySelector('.hamburger-icon');
            const closeIcon = mobileNavToggle.querySelector('.close-icon');
            if (hamburgerIcon && closeIcon) {
                hamburgerIcon.classList.toggle('hidden', isExpanded);
                closeIcon.classList.toggle('hidden', !isExpanded);
            }
        });
    } else {
        // console.log("Mobile nav toggle or menu not found.");
    }
}


// --- 4. Iridescence Effect Setup ---
function setupIridescence() {
    // Remove any existing container
    const existingContainer = document.getElementById('iridescence-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '0';  // Changed from -1 to 0
    container.style.pointerEvents = 'none';
    container.style.opacity = '0.8';  // Added base opacity
    container.id = 'iridescence-container';
    document.body.insertBefore(container, document.body.firstChild); // Insert at start to ensure proper stacking

    // Only initialize in HRW mode
    if (document.documentElement.classList.contains('hrw-mode')) {
        iridescenceInstance = new Iridescence(container, {
            color: [0.5, 1, 1],  // Increased blue component
            mouseReact: false,
            amplitude: 0.3,      // Increased wave amplitude
            speed: 0.3          // Adjusted for smoother animation
        });
    }
}

// --- Main Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    setupResourceModeToggle();
    setupMobileNavToggle();
    setupIridescence();
    // Squares background for intro
    const introSection = document.createElement('section');
    introSection.className = 'intro-squares-bg';
    introSection.style.position = 'relative';
    introSection.style.width = '100%';
    introSection.style.maxWidth = '1100px';
    introSection.style.margin = '40px auto 0 auto';
    introSection.style.height = '420px';
    introSection.style.display = 'flex';
    introSection.style.alignItems = 'center';
    introSection.style.justifyContent = 'center';
    introSection.style.borderRadius = '18px';
    introSection.style.overflow = 'hidden';
    // Squares background
    const squaresBG = document.createElement('div');
    squaresBG.style.position = 'absolute';
    squaresBG.style.top = 0;
    squaresBG.style.left = 0;
    squaresBG.style.width = '100%';
    squaresBG.style.height = '100%';
    squaresBG.style.zIndex = 1;
    introSection.appendChild(squaresBG);
    new SquaresBG(squaresBG, { speed: 0.7, squareSize: 44, borderColor: '#fff', direction: 'diagonal' });
    // Intro text overlay
    const introText = document.createElement('div');
    introText.style.position = 'relative';
    introText.style.zIndex = 2;
    introText.style.textAlign = 'center';
    introText.style.color = '#fff';
    introText.style.fontSize = '1.25rem';
    introText.style.fontWeight = '400';
    introText.style.maxWidth = '900px';
    introText.style.margin = '0 auto';
    introText.innerHTML = `
        <h1 style="font-size:2.8rem;font-weight:800;margin-bottom:0.5em;">Khan Tahsin Abrar</h1>
        <div style="font-size:1.3rem;font-weight:500;margin-bottom:1.2em;">Architecting the Next Wave of Innovation with AI</div>
        <div style="margin-bottom:1.2em;">Welcome to the digital space of mine!</div>
        <div style="margin-bottom:1.2em;">This portfolio is a continuously evolving showcase of my journey through the exciting realms of Artificial Intelligence, Graphics Designing, Literacy, Game Dev with UE5, Robust Python Scripting, Dynamic Web Development, Crucial CyberSecurity Practices, and Insightful Research.</div>
        <div style="font-weight:600;margin-bottom:1.2em;">This entire website, including its <b>“NovaCore”</b> and other themes, has been co-created with customized fine-tuned and RAGed advanced AI LLMs under totally sophisticated prompt engineering direction, serving as a direct demonstration of my skills in leveraging AI, ML, DL, LLMs for complex, creative, and technical projects.</div>
        <div style="font-size:1.1rem;">Dive in to explore my work and see how I’m architecting the next wave of innovation.</div>
    `;
    introSection.appendChild(introText);
    // Insert at top of main content
    const mainContent = document.querySelector('.site-content');
    if (mainContent) {
        mainContent.insertBefore(introSection, mainContent.firstChild);
    }
    console.log("NovaCore Main JS Initialized (Full Updated Version for Corner Toggles).");
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const currentResourceMode = document.documentElement.classList.contains('lrw-mode') ? 'LRW' : 'HRW';
    console.log(`Current theme on load: ${currentTheme}`);
    console.log(`Current resource mode on load: ${currentResourceMode}`);
});