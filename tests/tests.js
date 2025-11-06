// This code runs when the tests.html page is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOCK DATA ---
    const mockHerbs = [
        { name: "Amla", rasa: ["Amla", "Tikta"], virya: "Sheeta", prabhav: ["Rasayan"], tridosha: false },
        { name: "Ashwagandha", rasa: ["Tikta"], virya: "Ushna", prabhav: ["Rasayan", "Balya"], tridosha: false },
        { name: "Pippali", rasa: ["Katu"], virya: "Ushna", prabhav: [], tridosha: false }
    ];

    // --- TEST RUNNER ELEMENTS ---
    const runTestsBtn = document.getElementById('runTestsBtn');
    const resultsList = document.getElementById('testResultsList');

    if (!runTestsBtn) {
        console.error("Test Error: 'Run Tests' button not found!");
        return;
    }
    
    // --- HELPER FUNCTIONS ---
    let testSuite = '';

    function beginSuite(name) {
        testSuite = name;
        const li = document.createElement('li');
        li.innerHTML = `<div class="test-suite"><h3>${name}</h3><ul id="suite-${name.replace(' ', '')}"></ul></div>`;
        resultsList.appendChild(li);
    }
    
    function logResult(message, passed) {
        const suiteList = document.getElementById(`suite-${testSuite.replace(' ', '')}`);
        if (!suiteList) {
            console.error(`Test suite list not found for ${testSuite}`);
            return;
        }
        const li = document.createElement('li');
        li.textContent = `[${passed ? 'PASS' : 'FAIL'}] ${message}`;
        li.className = passed ? 'test-pass' : 'test-fail';
        suiteList.appendChild(li);
    }

    // This function MUST be called before every test to ensure a clean state
    function resetFilters() {
        // Reset DOM elements
        document.querySelectorAll('#allFiltersContent input[type="checkbox"]').forEach(cb => cb.checked = false);
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) sortSelect.value = 'default';
        document.querySelectorAll('input[name="sortMobile"]').forEach(radio => {
            radio.checked = (radio.value === 'default');
        });

        // Reset state variables
        currentPage = 1;
        if(typeof favorites !== 'undefined') favorites.clear();
        if(typeof compareSelection !== 'undefined') compareSelection.clear();
        if(typeof localStorage !== 'undefined') localStorage.clear();
        
        // Reset UI elements
        const compareCount = document.getElementById('compareCount');
        if (compareCount) compareCount.textContent = '';
    }

    // --- TEST FUNCTIONS (all are pure, no side-effects) ---

    function test_Filtering() {
        beginSuite('Filtering Logic');

        // Test 1: Search
        resetFilters();
        document.getElementById('searchInput').value = 'Amla';
        renderHerbs();
        let count = document.querySelectorAll('#herbGrid .herb-card').length;
        logResult(`test_Search(): Searching for "Amla" should return 1 herb. (Found: ${count})`, count === 1);

        // Test 2: Rasa Filter
        resetFilters();
        document.getElementById('f_rasa_tikta').checked = true;
        renderHerbs();
        count = document.querySelectorAll('#herbGrid .herb-card').length;
        logResult(`test_Filter_Rasa(): Filtering for "Tikta" should return 2 herbs. (Found: ${count})`, count === 2);
        
        // Test 3: Virya Filter
        resetFilters();
        document.getElementById('f_virya_ushna').checked = true;
        renderHerbs();
        count = document.querySelectorAll('#herbGrid .herb-card').length;
        logResult(`test_Filter_Virya(): Filtering for "Ushna" should return 2 herbs. (Found: ${count})`, count === 2);

        // Test 4: Combined Filter
        resetFilters();
        document.getElementById('f_rasa_tikta').checked = true;
        document.getElementById('f_virya_ushna').checked = true;
        renderHerbs();
        count = document.querySelectorAll('#herbGrid .herb-card').length;
        logResult(`test_Filter_Combined(): Filtering for "Tikta" AND "Ushna" should return 1 herb. (Found: ${count})`, count === 1);
        
        // Test 5: Prabhav Filter
        resetFilters();
        document.getElementById('f_prabhav_rasayan').checked = true;
        renderHerbs();
        count = document.querySelectorAll('#herbGrid .herb-card').length;
        logResult(`test_Filter_Prabhav(): Filtering for "Rasayan" should return 2 herbs. (Found: ${count})`, count === 2);
        
        // Test 6: No Results
        resetFilters();
        document.getElementById('searchInput').value = 'Garlic';
        renderHerbs();
        const message = document.querySelector('.no-results-message');
        const passed = (message && message.textContent.includes("No herbs match filters."));
        logResult(`test_NoResults(): Searching for "Garlic" should show "No results" message.`, passed);
    }

    function test_Favorites() {
        beginSuite('Favorites System');
        resetFilters();
        
        const mockFavButton = document.createElement('button');
        mockFavButton.className = 'fav-btn';
        
        toggleFavorite('Amla', mockFavButton);
        let passed = favorites.has('Amla');
        logResult('toggleFavorite() should add "Amla" to favorites Set.', passed);

        const stored = localStorage.getItem('favoriteHerbs');
        passed = (stored && stored.includes('Amla'));
        logResult('saveFavorites() should store "Amla" in localStorage.', passed);

        toggleFavorite('Amla', mockFavButton);
        passed = !favorites.has('Amla');
        logResult('toggleFavorite() should remove "Amla" from favorites Set.', passed);
    }

    function test_Comparison() {
        beginSuite('Comparison System');
        resetFilters();

        const mockCheckbox = document.createElement('input');
        mockCheckbox.type = 'checkbox';
        mockCheckbox.checked = true;

        toggleCompare('Amla', mockCheckbox);
        let passed = compareSelection.has('Amla');
        logResult('toggleCompare() should add "Amla" to compareSelection Set.', passed);
        
        let countEl = document.getElementById('compareCount');
        passed = (countEl && countEl.textContent === '1 herb selected');
        logResult('updateCompareTray() should show "1 herb selected".', passed);

        toggleCompare('Pippali', mockCheckbox);
        passed = (countEl && countEl.textContent === '2 herbs selected');
        logResult('updateCompareTray() should show "2 herbs selected".', passed);

        clearComparisonSelection();
        passed = (compareSelection.size === 0);
        logResult('clearComparisonSelection() should clear the Set.', passed);
    }

    function test_Pagination() {
        beginSuite('Pagination System');
        resetFilters();
        
        herbsPerPage = 1; // Force pagination
        renderHerbs(); // Renders page 1

        let pageInfo = document.getElementById('pageInfo');
        let passed = (pageInfo && pageInfo.textContent === 'Page 1 of 3');
        logResult('Initial render with herbsPerPage=1 should show "Page 1 of 3".', passed);

        goToNextPage();
        passed = (currentPage === 2 && pageInfo.textContent === 'Page 2 of 3');
        logResult('goToNextPage() should advance to "Page 2 of 3".', passed);

        goToNextPage();
        passed = (currentPage === 3 && pageInfo.textContent === 'Page 3 of 3');
        logResult('goToNextPage() should advance to "Page 3 of 3".', passed);

        goToNextPage(); // Try to go past the end
        passed = (currentPage === 3);
        logResult('goToNextPage() should not advance past the last page.', passed);

        goToPrevPage();
        passed = (currentPage === 2 && pageInfo.textContent === 'Page 2 of 3');
        logResult('goToPrevPage() should go back to "Page 2 of 3".', passed);

        herbsPerPage = 20; // Reset for other tests
    }

    // --- MAIN TEST FUNCTION ---
    function runAllTests() {
        resultsList.innerHTML = ''; // Clear old results
        
        // 1. Manually inject the mock data
        allHerbs = mockHerbs; 
        
        // 2. Manually render the initial state (shows "3 of 3 herbs")
        // This MUST come before running tests
        renderHerbs();
            
        // 3. Run all test suites
        test_Filtering();
        test_Favorites();
        test_Comparison();
        test_Pagination();
    }

    // --- INITIALIZE THE TEST PAGE ---
    
    // 1. Initialize the core app logic
    // We call both, just like main.js, to attach all listeners
    initializeApp();
    setupAppModals();
    
    // 2. Attach the listener for the "Run Tests" button
    runTestsBtn.addEventListener('click', runAllTests);
    
    console.log("Test suite initialized. Ready to run tests.");
});
