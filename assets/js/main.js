// main.js for NovaCore Theme

// --- 1. Dark/Light Mode Toggle ---
function setupThemeToggle() {
    const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn'); // Targets any button with this class
    if (themeToggleButtons.length === 0) {
        // console.log("No theme toggle buttons found."); // For debugging
        return;
    }

    const htmlElement = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme); // Save user preference

        // Update icons on ALL toggle buttons
        themeToggleButtons.forEach(button => {
            const sunIcon = button.querySelector('.icon-sun');
            const moonIcon = button.querySelector('.icon-moon');
            if (sunIcon && moonIcon) {
                if (theme === 'dark') {
                    moonIcon.style.display = 'inline-block'; // Moon visible in dark mode
                    sunIcon.style.display = 'none';    // Sun hidden in dark mode
                } else {
                    moonIcon.style.display = 'none';     // Moon hidden in light mode
                    sunIcon.style.display = 'inline-block'; // Sun visible in light mode
                }
            }
        });
    };
    
    // Set initial state of icons based on current theme when page loads
    // The inline script in head.html sets the initial class on <html> for FOUC prevention.
    // This part ensures the button icons are correct on load.
    const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    themeToggleButtons.forEach(button => {
        const sunIcon = button.querySelector('.icon-sun');
        const moonIcon = button.querySelector('.icon-moon');
        if (sunIcon && moonIcon) { // Ensure icons exist before trying to style
            if (currentTheme === 'dark') {
                moonIcon.style.display = 'inline-block';
                sunIcon.style.display = 'none';
            } else {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'inline-block';
            }
        }
    });

    // Add event listeners to all theme toggle buttons
    themeToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    });
}


// --- 2. LRW/HRW Mode Toggle ---
function setupResourceModeToggle() {
    const toggleButton = document.getElementById('resource-mode-toggle');
    if (!toggleButton) {
        // console.log("No resource mode toggle button found."); // For debugging
        return;
    }

    const htmlElement = document.documentElement;
    const hrwSpan = toggleButton.querySelector('.mode-hrw');
    const lrwSpan = toggleButton.querySelector('.mode-lrw');

    const applyMode = (mode) => {
        if (mode === 'LRW') {
            htmlElement.classList.add('lrw-mode');
            htmlElement.classList.remove('hrw-mode'); // Remove hrw-mode if it exists
            if (lrwSpan) lrwSpan.style.display = 'inline';
            if (hrwSpan) hrwSpan.style.display = 'none';
        } else { // Default to HRW
            htmlElement.classList.add('hrw-mode'); // Add hrw-mode for explicit styling
            htmlElement.classList.remove('lrw-mode');
            if (hrwSpan) hrwSpan.style.display = 'inline';
            if (lrwSpan) lrwSpan.style.display = 'none';
        }
        localStorage.setItem('resourceMode', mode); // Save user preference
        // console.log(`Resource mode set to: ${mode}`); // For debugging
    };
    
    // Initialize mode from localStorage or default from class on <html> (set in baseof.html)
    let initialMode = localStorage.getItem('resourceMode');
    if (!initialMode) { // If nothing in localStorage, check the class on <html>
        initialMode = htmlElement.classList.contains('lrw-mode') ? 'LRW' : 'HRW';
    }
    applyMode(initialMode); // Apply the determined mode

    // Event listener for the button
    toggleButton.addEventListener('click', () => {
        const newMode = htmlElement.classList.contains('lrw-mode') ? 'HRW' : 'LRW';
        applyMode(newMode);
        // Optional: Dispatch a custom event if other scripts need to react
        // window.dispatchEvent(new CustomEvent('resourcemodechanged', { detail: { mode: newMode } }));
    });
}

// --- 3. Mobile Navigation Toggle ---
function setupMobileNavToggle() {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    if (mobileNavToggle && mobileNavMenu) {
        mobileNavToggle.addEventListener('click', () => {
            const isHidden = mobileNavMenu.classList.toggle('hidden'); // Toggle 'hidden' class
            // Toggle ARIA attributes for accessibility
            const isExpanded = !isHidden; // If not hidden, it's expanded
            mobileNavToggle.setAttribute('aria-expanded', isExpanded.toString());
            // Optionally change icon or text on toggle button itself
        });
    } else {
        // console.log("Mobile nav toggle or menu not found."); // For debugging
    }
}


// --- Initialize all scripts on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle(); 
    setupResourceModeToggle();
    setupMobileNavToggle(); 

    console.log("NovaCore Main JS Initialized (Full Updated Version).");
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const currentResourceMode = document.documentElement.classList.contains('lrw-mode') ? 'LRW' : 'HRW';
    console.log(`Current theme on load: ${currentTheme}`);
    console.log(`Current resource mode on load: ${currentResourceMode}`);
});