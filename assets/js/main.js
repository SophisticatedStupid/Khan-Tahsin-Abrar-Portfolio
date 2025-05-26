// main.js for NovaCore Theme

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
function setupResourceModeToggle() {
    const toggleButton = document.getElementById('resource-mode-toggle');
    if (!toggleButton) {
        // console.log("No resource mode toggle button found.");
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
        } else { 
            htmlElement.classList.add('hrw-mode'); 
            htmlElement.classList.remove('lrw-mode');
            if (hrwSpan) hrwSpan.style.display = 'inline';
            if (lrwSpan) lrwSpan.style.display = 'none';
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


// --- Initialize all scripts on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle(); 
    setupResourceModeToggle();
    setupMobileNavToggle(); 

    console.log("NovaCore Main JS Initialized (Full Updated Version for Corner Toggles).");
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const currentResourceMode = document.documentElement.classList.contains('lrw-mode') ? 'LRW' : 'HRW';
    console.log(`Current theme on load: ${currentTheme}`);
    console.log(`Current resource mode on load: ${currentResourceMode}`);
});