/**
 * This is the main entry point for the Ayurvedic Herb Explorer.
 * * It waits for the DOM to be loaded, then:
 * 1. Sets up all the application's modals and event listeners.
 * 2. Fetches the live herb data to populate the app.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Check if the functions from app.js are loaded
    if (typeof setupAppModals === 'function' && typeof fetchHerbData === 'function') {
        
        // 1. Set up all the modals and click listeners
        setupAppModals();
        
        // 2. Fetch the real data and initialize the app
        fetchHerbData();
        
    } else {
        console.error("CRITICAL: app.js library failed to load.");
        document.body.innerHTML = "<h1>Error: Application files failed to load. Please refresh.</h1>";
    }
});
