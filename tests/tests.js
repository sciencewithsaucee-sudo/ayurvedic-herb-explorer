// This code runs when the tests.html page is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOCK DATA ---
    const mockHerbs = [
        { name: "Amla", rasa: ["Amla", "Tikta"], virya: "Sheeta", prabhav: ["Rasayan"] },
        { name: "Ashwagandha", rasa: ["Tikta"], virya: "Ushna", prabhav: ["Rasayan", "Balya"] },
        { name: "Pippali", rasa: ["Katu"], virya: "Ushna", prabhav: [] }
    ];

    // --- TEST RUNNER ELEMENTS ---
    const runTestsBtn = document.getElementById('runTestsBtn');
    const resultsList = document.getElementById('testResultsList');
    const herbDetailModalCloseBtn = document.querySelector('#herbDetailModal .modal-close-btn');

    if (!runTestsBtn) {
        console.error("Test Error: 'Run Tests' button not found!");
        return;
    }
    
    if (!herbDetailModalCloseBtn) {
        console.error("Test Error: 'Herb Detail Modal Close Button' not found!");
        return;
    }

    // --- HELPER FUNCTION ---
    function logResult(message, passed) {
        const li = document.createElement('li');
        li.textContent = `[${passed ? 'PASS' : 'FAIL'}] ${message}`;
        li.className = passed ? 'test-pass' : 'test-fail';
        resultsList.appendChild(li);
    }

    // This function MUST be called before every test to ensure a clean state
    function resetFilters() {
        document.querySelectorAll('.filter-content input[type="checkbox"]').forEach(cb => cb.checked = false);
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        currentPage = 1; // reset pagination
        
        if(typeof favorites !== 'undefined') favorites.clear();
        if(typeof compareSelection !== 'undefined') compareSelection.clear();
    }

    // --- TEST FUNCTIONS (all are pure, no side-effects) ---

    function test_Search() {
        resetFilters();
        document.getElementById('searchInput').value = 'Amla';
        renderHerbs();
        const count = document.querySelectorAll('#herbGrid .herb-card').length;
        const passed = (count === 1);
        logResult(`test_Search(): Searching for "Amla" should return 1 herb. (Found: ${count})`, passed);
    }

    function test_Filter_Rasa() {
        resetFilters();
        document.getElementById('f_rasa_tikta').checked = true;
        renderHerbs();
        const count = document.querySelectorAll('#herbGrid .herb-card').length;
        const passed = (count === 2); // Amla and Ashwagandha
        logResult(`test_Filter_Rasa(): Filtering for "Tikta" should return 2 herbs. (Found: ${count})`, passed);
    }
    
    function test_Filter_Virya() {
        resetFilters();
        document.getElementById('f_virya_ushna').checked = true;
        renderHerbs();
        const count = document.querySelectorAll('#herbGrid .herb-card').length;
        const passed = (count === 2); // Ashwagandha and Pippali
        logResult(`test_Filter_Virya(): Filtering for "Ushna" should return 2 herbs. (Found: ${count})`, passed);
    }

    function test_Filter_Combined() {
        resetFilters();
        document.getElementById('f_rasa_tikta').checked = true;
        document.getElementById('f_virya_ushna').checked = true;
        renderHerbs();
        const count = document.querySelectorAll('#herbGrid .herb-card').length;
        const passed = (count === 1); // Only Ashwagandha
        logResult(`test_Filter_Combined(): Filtering for "Tikta" AND "Ushna" should return 1 herb. (Found: ${count})`, passed);
    }
    
    function test_Filter_Prabhav() {
        resetFilters();
        document.getElementById('f_prabhav_rasayan').checked = true;
        renderHerbs();
        const count = document.querySelectorAll('#herbGrid .herb-card').length;
        const passed = (count === 2); // Amla and Ashwagandha
        logResult(`test_Filter_Prabhav(): Filtering for "Rasayan" should return 2 herbs. (Found: ${count})`, passed);
    }
    
    function test_NoResults() {
        resetFilters();
        document.getElementById('searchInput').value = 'Garlic';
        renderHerbs();
        const message = document.querySelector('.no-results-message');
        const passed = (message && message.textContent.includes("No herbs match filters."));
        logResult(`test_NoResults(): Searching for "Garlic" should show "No results" message.`, passed);
    }

    // --- MAIN TEST FUNCTION ---
    function runAllTests() {
        resultsList.innerHTML = ''; // Clear old results
        
        // 1. Manually inject the mock data
        allHerbs = mockHerbs; 
        
        // 2. Manually render the initial state (shows "3 of 3 herbs")
        // This MUST come before running tests
        renderHerbs();
            
        // 3. Run all tests sequentially, each one resetting the state first
        test_Search();
        test_Filter_Rasa();
        test_Filter_Virya();
        test_Filter_Combined();
        test_Filter_Prabhav();
        test_NoResults();
    }

    // --- INITIALIZE THE TEST PAGE ---
    
    // 1. Initialize the core app logic (e.g., card click listeners)
    // This only needs to run ONCE
    initializeApp();
    
    // 2. Attach the listener for the "Run Tests" button
    runTestsBtn.addEventListener('click', runAllTests);
    
    // 3. *** THIS IS THE FIX ***
    // Manually attach the close modal function, because main.js isn't loaded
    herbDetailModalCloseBtn.addEventListener('click', () => {
        closeHerbDetailModal(); // This function exists in app.js
    });
    
    console.log("Test suite initialized. Ready to run tests.");
});
