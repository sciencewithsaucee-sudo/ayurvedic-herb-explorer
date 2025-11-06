// This code runs when the tests.html page is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOCK DATA ---
    // A small, predictable dataset to test against
    const mockHerbs = [
        { name: "Amla", rasa: ["Amla", "Tikta"], virya: "Sheeta", prabhav: ["Rasayan"] },
        { name: "Ashwagandha", rasa: ["Tikta"], virya: "Ushna", prabhav: ["Rasayan", "Balya"] },
        { name: "Pippali", rasa: ["Katu"], virya: "Ushna", prabhav: [] }
    ];

    // --- TEST RUNNER ELEMENTS ---
    const runTestsBtn = document.getElementById('runTestsBtn');
    const resultsList = document.getElementById('testResultsList');

    // --- HELPER FUNCTION ---
    // A simple function to print test results to the page
    function logResult(message, passed) {
        const li = document.createElement('li');
        li.textContent = `[${passed ? 'PASS' : 'FAIL'}] ${message}`;
        li.className = passed ? 'test-pass' : 'test-fail';
        resultsList.appendChild(li);
    }

    // Helper to reset all filters before each test
    function resetFilters() {
        document.querySelectorAll('#allFiltersContent input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.getElementById('searchInput').value = '';
        currentPage = 1; // reset pagination
    }

    // --- TEST FUNCTIONS ---

    function test_Search() {
        resetFilters();
        document.getElementById('searchInput').value = 'Amla';
        renderHerbs(); // This function comes from app.js
        
        const cards = document.querySelectorAll('#herbGrid .herb-card');
        const count = cards.length;
        const passed = (count === 1);
        logResult(`test_Search(): Searching for "Amla" should return 1 herb. (Found: ${count})`, passed);
    }

    function test_Filter_Rasa() {
        resetFilters();
        document.getElementById('f_rasa_tikta').checked = true;
        renderHerbs();
        
        const cards = document.querySelectorAll('#herbGrid .herb-card');
        const count = cards.length;
        // Amla and Ashwagandha are Tikta
        const passed = (count === 2);
        logResult(`test_Filter_Rasa(): Filtering for "Tikta" should return 2 herbs. (Found: ${count})`, passed);
    }
    
    function test_Filter_Virya() {
        resetFilters();
        document.getElementById('f_virya_ushna').checked = true;
        renderHerbs();
        
        const cards = document.querySelectorAll('#herbGrid .herb-card');
        const count = cards.length;
        // Ashwagandha and Pippali are Ushna
        const passed = (count === 2);
        logResult(`test_Filter_Virya(): Filtering for "Ushna" should return 2 herbs. (Found: ${count})`, passed);
    }

    function test_Filter_Combined() {
        resetFilters();
        // Tikta AND Ushna
        document.getElementById('f_rasa_tikta').checked = true;
        document.getElementById('f_virya_ushna').checked = true;
        renderHerbs();
        
        const cards = document.querySelectorAll('#herbGrid .herb-card');
        const count = cards.length;
        // Only Ashwagandha is Tikta AND Ushna
        const passed = (count === 1);
        logResult(`test_Filter_Combined(): Filtering for "Tikta" AND "Ushna" should return 1 herb. (Found: ${count})`, passed);
    }
    
    function test_Filter_Prabhav() {
        resetFilters();
        document.getElementById('f_prabhav_rasayan').checked = true;
        renderHerbs();
        
        const cards = document.querySelectorAll('#herbGrid .herb-card');
        const count = cards.length;
        // Amla and Ashwagandha are Rasayan
        const passed = (count === 2);
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
        
        // This is the most important part!
        // We override the real fetchHerbData with a fake one
        // that just loads our mock data.
        
        // Store the original function just in case
        const originalFetchHerbData = window.fetchHerbData;
        
        // Override
        window.fetchHerbData = async () => {
            console.log("TESTING: Overriding fetchHerbData with mock data.");
            allHerbs = mockHerbs; // Use our mock data
            initializeApp(); // This function comes from app.js
            
            // Now that the app is initialized with mock data, run the tests
            test_Search();
            test_Filter_Rasa();
            test_Filter_Virya();
            test_Filter_Combined();
            test_Filter_Prabhav();
            test_NoResults();
            
            // Restore the original function
            window.fetchHerbData = originalFetchHerbData;
        };
        
        // Call our fake function to start the test
        window.fetchHerbData();
    }

    // Attach the main function to the button
    runTestsBtn.addEventListener('click', runAllTests);
});
