
// --- Data URL ---
const HERB_DATA_URL = 'https://raw.githubusercontent.com/sciencewithsaucee-sudo/herb-database/refs/heads/main/herb.json';

// --- Whitelist for Explore Links ---
const finishedHerbLinks = new Set([
  "/p/tulsi.html", "/p/amla.html", "/p/ashwagandha.html", "/p/giloy.html", "/p/shatavari.html",
  "https://www.amidhaayurveda.com/2025/10/chopchini-ayurvedic-uses-benefits.html",
  "https://www.amidhaayurveda.com/2025/10/bhringraj-ayurvedic-uses-benefits.html",
  "https://www.amidhaayurveda.com/2025/10/jatamansi-ayurvedic-uses-benefits.html",
  "https://www.amidhaayurveda.com/2025/10/chandana-sandalwood-ayurvedic-uses.html",
  "https://www.amidhaayurveda.com/2025/10/kutaj-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/rasona-garlic-ayurvedic-uses-benefits.html",
  "https://www.amidhaayurveda.com/2025/10/kanchanar-ayurvedic-uses-benefits.html",
  "https://www.amidhaayurveda.com/2025/10/karpura-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/pushkarmool-ayurvedic-uses-respiratory.html",
  "https://www.amidhaayurveda.com/2025/10/bakuchi-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/vidarikand-ayurvedic-uses-rejuvenating.html",
  "https://www.amidhaayurveda.com/2025/10/ajmoda-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/patola-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/vrikshamla-ayurvedic-uses-weight-loss.html",
  "https://www.amidhaayurveda.com/2025/10/kumuda-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/shigru-moringa-ayurvedic-uses-benefits.html",
  "https://www.amidhaayurveda.com/2025/10/parpataka-ayurvedic-uses-benefits.html",
  "https://www.amidhaayurveda.com/2025/10/indrayava-ayurvedic-uses-digestive.html",
  "https://www.amidhaayurveda.com/2025/10/kapikachhu-ayurvedic-uses-benefits.html",
  "https://www.amidhaayurveda.com/2025/10/bala-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/tamalpatra-ayurvedic-uses-benefits.html",
  "https://www.amidhaayurveda.com/2025/10/chitrak-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/tagar-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/khadira-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/twak-cinnamon-ayurvedic-uses-benefits.html",
  "https://www.amidhaayurveda.com/2025/10/ela-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/sariva-ayurvedic-uses-benefits-healing.html",
  "https://www.amidhaayurveda.com/2025/10/gorakhmundi-ayurvedic-uses-benefits.html",
  "https://www.amidhaayurveda.com/2025/10/kokilaksha-ayurvedic-uses-benefits.html"
]);

// --- Global State ---
let allHerbs = [];
let currentPage = 1;
// EDITED: Default herbs per page
let herbsPerPage = 20; 
let favorites = new Set(JSON.parse(localStorage.getItem('favoriteHerbs') || '[]'));
let compareSelection = new Set();
const MAX_COMPARE_HERBS = 3;

// --- UTILITIES ---
function debounce(func, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// EDITED: Function to get herbs per page based on screen width
function getHerbsPerPage() {
    return window.innerWidth < 769 ? 10 : 20; // 10 on mobile, 20 on desktop
}

// --- FILTER & SORT ACTIONS ---
function clearAllFilters() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-content input[type=checkbox]').forEach(cb => cb.checked = false);
  const favCheckbox = document.getElementById('favoritesFilter');
  if (favCheckbox) favCheckbox.checked = false;
  
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'default';
  document.querySelectorAll('input[name="sortMobile"]').forEach(radio => {
      radio.checked = (radio.value === 'default');
  });

  currentPage = 1;
  renderHerbs();
}

// --- FAVORITES ---
function saveFavorites() {
  localStorage.setItem('favoriteHerbs', JSON.stringify([...favorites]));
}

function toggleFavorite(herbName, element) {
  event.stopPropagation(); // Prevent modal open from fav click
  if (!element) return;
  const btn = element.closest('.fav-btn');
  const isFavorite = favorites.has(herbName);

  if (isFavorite) favorites.delete(herbName);
  else favorites.add(herbName);
  
  saveFavorites();

  const isCurrentlyFavorite = !isFavorite; // State after toggle

  // Update button states
  const cardFavBtn = document.querySelector(`.herb-card .fav-btn[data-herb-name="${herbName}"]`);
  if (cardFavBtn) cardFavBtn.classList.toggle('is-favorite', isCurrentlyFavorite);
  const detailModalFavBtn = document.querySelector(`#herbDetailModal .fav-btn[data-herb-name="${herbName}"]`);
  if (detailModalFavBtn) detailModalFavBtn.classList.toggle('is-favorite', isCurrentlyFavorite);

  const favCheckbox = document.getElementById('favoritesFilter');
  if (favCheckbox && favCheckbox.checked) {
    currentPage = 1;
    renderHerbs(); // Re-render grid if showing favorites
  }
}


// --- COMPARISON ---
function toggleCompare(herbName, checkboxElement) {
    event.stopPropagation(); // Prevent modal open from compare click
    if (!checkboxElement) return;
    const isChecked = checkboxElement.checked; 

    if (!isChecked) { 
        compareSelection.delete(herbName);
    } else { 
        if (compareSelection.size >= MAX_COMPARE_HERBS) {
            openAlertModal(`You can compare up to ${MAX_COMPARE_HERBS} herbs.`);
            checkboxElement.checked = false; 
            return;
        }
        compareSelection.add(herbName);
    }

    updateCompareTray();
    syncCompareCheckboxes(herbName, isChecked);
}

function syncCompareCheckboxes(herbName, isChecked) {
    const cardCheckbox = document.querySelector(`.herb-card .compare-checkbox[data-herb-name="${herbName}"]`);
    if (cardCheckbox && cardCheckbox.checked !== isChecked) cardCheckbox.checked = isChecked;
    const modalCheckbox = document.querySelector(`#herbDetailModal .compare-checkbox[data-herb-name="${herbName}"]`);
    if (modalCheckbox && modalCheckbox.checked !== isChecked) modalCheckbox.checked = isChecked;
}

function updateCompareTray() {
    const compareTray = document.getElementById('compareTray');
    const compareCount = document.getElementById('compareCount');
    if (!compareTray || !compareCount) return;
    const count = compareSelection.size;
    if (count > 0) {
        compareCount.textContent = `${count} herb${count > 1 ? 's' : ''} selected`;
        compareTray.classList.add('show');
    } else { compareTray.classList.remove('show'); }
}

function openCompareModal() {
    closeAllModals('compareModal'); // Close others first
    const compareModal = document.getElementById('compareModal');
    const compareTable = document.getElementById('compareTable');
    if (!compareModal || !compareTable) return;
    if (!Array.isArray(allHerbs) || allHerbs.length === 0) { openAlertModal("Herb data loading..."); return; }
    const herbsToCompare = allHerbs.filter(h => h && compareSelection.has(h.name));
    if (herbsToCompare.length === 0) { openAlertModal("Please select herbs to compare."); return; }

    const properties = [ /* ... properties ... */ 
        { key: 'name', label: 'Herb Name' }, { key: 'preview', label: 'Preview' },
        { key: 'pacify', label: 'Pacify Dosha' }, { key: 'aggravate', label: 'Aggravate Dosha' },
        { key: 'tridosha', label: 'Balance Tridosha' }, { key: 'rasa', label: 'Rasa' },
        { key: 'guna', label: 'Guna' }, { key: 'virya', label: 'Virya' },
        { key: 'vipaka', label: 'Vipaka' }, { key: 'prabhav', label: 'Prabhav' },
    ];
    let tableHtml = '<thead><tr><th>Property</th>';
    herbsToCompare.forEach(h => { tableHtml += `<th>${h.name || 'Unknown'}</th>`; });
    tableHtml += '</tr></thead><tbody>';
    properties.forEach(prop => {
        tableHtml += `<tr><td><b>${prop.label}</b></td>`;
        herbsToCompare.forEach(h => {
            let value = h ? h[prop.key] : undefined;
            if (Array.isArray(value)) value = value.join(', ');
            else if (prop.key === 'tridosha') value = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : 'N/A';
            const displayValue = (value !== null && typeof value !== 'undefined' && value !== '') ? value : 'N/A';
            tableHtml += `<td>${displayValue}</td>`;
        });
        tableHtml += '</tr>';
    });
    tableHtml += '</tbody>';
    compareTable.innerHTML = tableHtml;
    compareModal.classList.add('show');
    
}
function closeCompareModal() { 
    const modal = document.getElementById('compareModal'); 
    if (modal) modal.classList.remove('show'); 
     if (!document.querySelector('.modal-backdrop.show')) {
         document.body.classList.remove('modal-open');
     }
}
function clearComparisonSelection() { compareSelection.clear(); document.querySelectorAll('.compare-checkbox').forEach(cb => cb.checked = false); updateCompareTray(); }

// --- STANDARD MODALS (Suggestion, Request, Alert) ---
function setupModal(modalId, formId, successId, formAction) {
    const modal = document.getElementById(modalId);
    const formContent = document.getElementById(`${formId}-content`);
    const successMsg = document.getElementById(successId);
    const form = document.getElementById(formId);
    if (!modal || !form || !formContent || !successMsg) { 
        console.error("Modal setup failed for:", modalId);
        return { openModal: ()=>{ console.error("Cannot open modal:", modalId)}, closeModal: ()=>{}, handleSubmit: ()=>{} }; 
    }

    function openModal(context = null) {
        closeAllModals(modalId); 
        document.body.classList.add('modal-open'); 

        if (context && modalId === 'suggestionModal') {
            modal.querySelector('#modal-herb-name').value = context;
            modal.querySelector('#modal-herb-title').innerText = `Suggest Edit: ${context}`;
        }
        formContent.style.display = 'block';
        successMsg.style.display = 'none';
        form.reset();
        modal.classList.add('show');
    }
    function closeModal() { 
        if (modal) modal.classList.remove('show'); 
        if (!document.querySelector('.modal-backdrop.show')) {
            document.body.classList.remove('modal-open');
        }
    }
    function handleSubmit(event) {
        event.preventDefault(); const formData = new FormData(form);
        fetch(formAction, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } })
            .then(response => {
                if (response.ok) {
                    if (formContent) formContent.style.display = 'none';
                    if (successMsg) successMsg.style.display = 'block';
                } else { throw new Error('Form submission failed'); }
            })
            .catch(error => { console.error('Form submission error:', error); openAlertModal("Oops! Problem submitting form."); })
            .finally(() => { /* Remove loading state */ });
    }
    form.addEventListener('submit', handleSubmit);

    const cancelBtn = form.querySelector('.btn-cancel');
    if(cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
     const successCloseBtn = successMsg?.querySelector('.btn-primary');
     if(successCloseBtn) {
       successCloseBtn.addEventListener('click', closeModal);
     }


    return { openModal, closeModal }; 
}

// Helper to close all modals except the filter sidebar AND optionally one other
function closeAllModals(excludeId = null) {
    let anyModalOpen = false;
    ['suggestionModal', 'requestModal', 'compareModal', 'alertModal', 'herbDetailModal'].forEach(id => {
        if (id !== excludeId) {
            const modal = document.getElementById(id);
            if (modal && modal.classList.contains('show')) {
                 modal.classList.remove('show');
            }
        } else if (document.getElementById(id)?.classList.contains('show')) {
            anyModalOpen = true; 
        }
    });
    if (!anyModalOpen) {
        document.body.classList.remove('modal-open');
    }
}


// Initialize modals after DOM content is loaded
let openSuggestionModal, closeSuggestionModal, openRequestModal, closeRequestModal;
document.addEventListener('DOMContentLoaded', () => {
    const suggestion = setupModal('suggestionModal', 'suggestionForm', 'suggestionSuccessMessage', 'https://formspree.io/f/xzzjgkoe');
    const request = setupModal('requestModal', 'requestForm', 'requestSuccessMessage', 'https://formspree.io/f/movkwpze');
    openSuggestionModal = suggestion.openModal;
    closeSuggestionModal = suggestion.closeModal;
    openRequestModal = request.openModal;
    closeRequestModal = request.closeModal;

    // Add listeners for close buttons AFTER initializing modals
    document.getElementById('suggestionModal')?.querySelector('.modal-close-btn')?.addEventListener('click', closeSuggestionModal);
    document.getElementById('requestModal')?.querySelector('.modal-close-btn')?.addEventListener('click', closeRequestModal);
    document.getElementById('compareModal')?.querySelector('.modal-close-btn')?.addEventListener('click', closeCompareModal);
    document.getElementById('alertModal')?.querySelector('.modal-close-btn')?.addEventListener('click', closeAlertModal);
    document.getElementById('herbDetailModal')?.querySelector('.modal-close-btn')?.addEventListener('click', closeHerbDetailModal);
    
    // Add backdrop click listener
      document.addEventListener('click', (event) => {
        if(event.target.classList.contains('modal-backdrop')) {
           closeAllModals(); 
        }
    });

});


function openAlertModal(message) {
    closeAllModals('alertModal'); 
    document.body.classList.add('modal-open'); 
    const modal = document.getElementById('alertModal');
    const msgElement = document.getElementById('alertModalMessage');
    if (modal && msgElement) { msgElement.textContent = message; modal.classList.add('show'); }
}
function closeAlertModal() {
    const modal = document.getElementById('alertModal');
    if (modal) modal.classList.remove('show');
     if (!document.querySelector('.modal-backdrop.show')) {
         document.body.classList.remove('modal-open');
     }
}

// --- MOBILE FILTER MODAL ---
function openMobileFilter() {
    closeAllModals(); 
    const modal = document.getElementById('filterSidebar');
    if (modal) {
        document.body.classList.add('modal-open'); 
        requestAnimationFrame(() => modal.classList.add('show'));
    }
}
function closeMobileFilter() {
    const modal = document.getElementById('filterSidebar');
    if (modal) modal.classList.remove('show');
    document.body.classList.remove('modal-open'); 
}

// --- HERB DETAIL MODAL ---
function openHerbDetailModal(herbName) {
     if (!Array.isArray(allHerbs)) return;
     const herb = allHerbs.find(h => h && h.name === herbName);
     if (!herb) return;

     closeAllModals('herbDetailModal'); 
     document.body.classList.add('modal-open'); 

     const modal = document.getElementById('herbDetailModal');
     const titleEl = document.getElementById('herbModalTitle');
     const previewEl = document.getElementById('herbModalPreview');
     const propsEl = document.getElementById('herbModalProperties');
     const actionsEl = document.getElementById('herbModalActions');
     if (!modal || !titleEl || !previewEl || !propsEl || !actionsEl) return;

     titleEl.textContent = herb.name || 'Herb Details';
     previewEl.textContent = herb.preview || '';

     const propKeys = ['pacify', 'aggravate', 'tridosha', 'rasa', 'guna', 'virya', 'vipaka', 'prabhav'];
     propsEl.innerHTML = propKeys.map(key => {
         let value = herb[key];
         if (key === 'tridosha') value = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : 'N/A';
         else if (Array.isArray(value)) value = value.join(', ');
         const displayValue = (value !== null && typeof value !== 'undefined' && value !== '') ? value : 'N/A';
         const label = key.charAt(0).toUpperCase() + key.slice(1); 
         return `<b>${label}:</b> <span>${displayValue}</span><br>`;
     }).join('');
     
     const safeName = herbName.replace(/'/g, "\\'");
     const link = herb.link || '#';
     const exploreButtonHtml = finishedHerbLinks.has(link)
      ? `<a href="${link}" class="btn btn-primary explore-btn" data-herb-name="${safeName}" onclick="event.stopPropagation()">Explore Herb</a>`
      : `<button type="button" class="btn btn-coming-soon" data-herb-name="${safeName}" disabled>Coming Soon</button>`;
     
     const suggestButtonHtml = `<button type="button" class="btn btn-secondary suggest-btn" data-herb-name="${safeName}" onclick="event.stopPropagation(); openSuggestionModal('${safeName}');">Suggest Edit</button>`;
     
     const isCompared = compareSelection.has(herbName);
     const compareChecked = isCompared ? 'checked' : '';
     const compareCheckboxHtml = `
         <label class="compare-checkbox-wrapper">
           <input type="checkbox" class="compare-checkbox" ${compareChecked} data-herb-name="${safeName}" onchange="toggleCompare('${safeName}', this)"> Compare
         </label>`;
     
     actionsEl.innerHTML = exploreButtonHtml + suggestButtonHtml + compareCheckboxHtml;
     
     modal.classList.add('show');
}

function closeHerbDetailModal() {
    const modal = document.getElementById('herbDetailModal');
    if (modal) modal.classList.remove('show');
     if (!document.querySelector('.modal-backdrop.show')) {
         document.body.classList.remove('modal-open');
     }
}

// --- FILTERING LOGIC ---
function getChecked(cls) { return [...document.querySelectorAll(`.${cls}:checked`)].map(cb => cb.value); }

function updateFilterButtonStates() {
    try {
        const allFilters = document.querySelectorAll('#allFiltersContent .filter-content-body input[type=checkbox]:checked');
        const sortValue = getSortValue(); 
        const favCheckbox = document.getElementById('favoritesFilter');
        const filterBtn = document.getElementById('mobileFilterBtn');
        const isFilterActive = allFilters.length > 0 || sortValue !== 'default' || (favCheckbox && favCheckbox.checked);
        if (filterBtn) filterBtn.classList.toggle('active', isFilterActive);
    } catch (e) { console.error("Error updating filter states:", e); }
}

function getSortValue() {
    if (window.innerWidth < 769) {
        const checkedRadio = document.querySelector('input[name="sortMobile"]:checked');
        return checkedRadio ? checkedRadio.value : 'default';
    } else {
        const sortSelect = document.getElementById('sortSelect');
        return sortSelect ? sortSelect.value : 'default';
    }
}

function matchesFilters(h) {
   if (!h || typeof h !== 'object') return false;
   const q = document.getElementById("searchInput")?.value.toLowerCase().trim() || '';
   if (q && (!h.name || !h.name.toLowerCase().includes(q))) return false;
   const showFavorites = document.getElementById('favoritesFilter')?.checked || false;
   if (showFavorites && (!h.name || !favorites.has(h.name))) return false;
   const filters = {
       pacify: getChecked("pacify-filter"), aggravate: getChecked("aggravate-filter"),
       rasa: getChecked("rasa-filter"), guna: getChecked("guna-filter"),
       virya: getChecked("virya-filter"), vipaka: getChecked("vipaka-filter"),
       prabhav: getChecked("prabhav-filter")
   };
   const tridosha = document.querySelector(".tridosha-filter:checked") ? true : false;
   if (tridosha && !h.tridosha) return false;
   for (const key in filters) {
       if (filters[key].length > 0) {
           const herbValue = h[key];
           if (Array.isArray(herbValue)) { if (!filters[key].every(v => herbValue.includes(v))) return false; }
           else if (typeof herbValue === 'string') { if (!filters[key].includes(herbValue)) return false; }
           else if (herbValue === null || typeof herbValue === 'undefined') { return false; } 
           else { return false; } 
       }
   }
   return true;
}


// --- RENDERING ---
function renderHerbs() {
  const grid = document.getElementById("herbGrid");
  const herbCountBox = document.getElementById("herbCountBox");
  const paginationControls = document.getElementById('paginationControls');
  if (!grid || !herbCountBox || !paginationControls) return;
  grid.innerHTML = "";
  updateFilterButtonStates();

  if (!Array.isArray(allHerbs) || allHerbs.length === 0) {
        herbCountBox.innerText = 'Loading Herb Database...';
        grid.innerHTML = `<div class="no-results-message">Loading herb data...</div>`;
        paginationControls.style.display = 'none';
        return;
  }

  herbsPerPage = getHerbsPerPage(); 

  const filtered = allHerbs.filter(matchesFilters);
  const sortValue = getSortValue(); 
  if (sortValue === 'name-asc') filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  else if (sortValue === 'name-desc') filtered.sort((a, b) => (b.name || '').localeCompare(a.name || ''));

  const totalHerbs = filtered.length;
  const totalPages = Math.ceil(totalHerbs / herbsPerPage); 
  currentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (currentPage - 1) * herbsPerPage; 
  const endIndex = startIndex + herbsPerPage; 
  const visible = filtered.slice(startIndex, endIndex);

  herbCountBox.innerText = `Showing ${visible.length} of ${totalHerbs} herbs`;
  
  const showResultsBtn = document.getElementById('showResultsBtn');
  if (showResultsBtn) showResultsBtn.textContent = `Show ${totalHerbs} Result${totalHerbs !== 1 ? 's' : ''}`;
  
  const statsTotalEl = document.getElementById('stats-total-herbs');
  if (statsTotalEl && allHerbs.length > 0) statsTotalEl.textContent = allHerbs.length; 

  if (visible.length === 0) {
        grid.innerHTML = `<div class="no-results-message">No herbs match filters.</div>`;
  } else {
        grid.innerHTML = visible.map(h => {
          const name = h?.name || 'Unknown Herb';
          const preview = h?.preview || '';
          const safeName = name.replace(/'/g, "\\'");
          const isFavorite = favorites.has(name);
          const favoriteButtonHtml = `
            <button class="fav-btn ${isFavorite ? 'is-favorite' : ''}" data-herb-name="${safeName}" aria-label="Toggle Favorite"> 
               <svg class="heart-icon" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>`;
        
        return `
         <div class="herb-card" data-herb-name="${safeName}"> 
           ${favoriteButtonHtml}
           <div class="herb-header"><h3>${name}</h3><p>${preview}</p></div>
         </div>`;
        }).join('');
  }
  updatePaginationControls(totalPages);
}


function updatePaginationControls(totalPages) {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageInfo = document.getElementById('pageInfo');
    const paginationControls = document.getElementById('paginationControls');
    if (!prevBtn || !nextBtn || !pageInfo || !paginationControls) return;
    paginationControls.style.display = totalPages <= 1 ? 'none' : 'flex';
    pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
    prevBtn.disabled = (currentPage <= 1);
    nextBtn.disabled = (currentPage >= totalPages || totalPages === 0);
}

function goToPrevPage() { 
    if (currentPage > 1) { 
        currentPage--; 
        renderHerbs(); 
        document.getElementById('topControls')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    } 
}
function goToNextPage() {
    if (!Array.isArray(allHerbs)) return;
    herbsPerPage = getHerbsPerPage(); 
    const filteredCount = allHerbs.filter(matchesFilters).length;
    const totalPages = Math.ceil(filteredCount / herbsPerPage);
    if (currentPage < totalPages) { 
        currentPage++; 
        renderHerbs(); 
        document.getElementById('topControls')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    }
}


// --- INITIALIZATION ---
function initializeApp() {
    herbsPerPage = getHerbsPerPage(); 
    renderHerbs(); 
    updateCompareTray();

    const searchInput = document.getElementById("searchInput");
    const filterControls = document.querySelectorAll('.filter-content input, .filter-content select, input[name="sortMobile"]'); 
    const herbGrid = document.getElementById('herbGrid'); 

    if (searchInput) {
        searchInput.addEventListener("input", debounce(() => { currentPage = 1; renderHerbs(); }, 300));
    }
    filterControls.forEach(el => el.addEventListener("change", () => { currentPage = 1; renderHerbs(); }));

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            document.querySelectorAll('input[name="sortMobile"]').forEach(radio => {
                radio.checked = (radio.value === e.target.value);
            });
        });
    }
     document.querySelectorAll('input[name="sortMobile"]').forEach(radio => {
         radio.addEventListener('change', (e) => {
             if (e.target.checked && sortSelect) { sortSelect.value = e.target.value; }
         });
     });

    if (herbGrid) {
        herbGrid.addEventListener('click', (event) => {
            const card = event.target.closest('.herb-card');
            if (!card) return; 

            const herbName = card.dataset.herbName;
            if (!herbName) return; 

            const favButton = event.target.closest('.fav-btn');
            if (favButton) {
                toggleFavorite(herbName, favButton); 
            } else {
                openHerbDetailModal(herbName);
            }
        });
    }
    
    window.addEventListener('resize', debounce(() => {
        const newHerbsPerPage = getHerbsPerPage();
        if (newHerbsPerPage !== herbsPerPage) {
            herbsPerPage = newHerbsPerPage;
            currentPage = 1; 
            renderHerbs();
        }
    }, 300));

}

async function fetchHerbData() {
    const herbCountBox = document.getElementById("herbCountBox");
    const paginationControls = document.getElementById('paginationControls');
    const statsTotalEl = document.getElementById('stats-total-herbs'); 

    if (herbCountBox) herbCountBox.innerText = 'Loading Herb Database...';
    if (paginationControls) paginationControls.style.display = 'none';
    if (statsTotalEl) statsTotalEl.textContent = 'Loading...'; 

    try {
        const response = await fetch(HERB_DATA_URL); 
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid data format");
        allHerbs = data;
        initializeApp(); 
    } catch (error) {
        console.error("CRITICAL ERROR fetching data:", error);
        if (herbCountBox) herbCountBox.innerText = `Error loading data. Please refresh.`;
        if (paginationControls) paginationControls.style.display = 'none';
        if (statsTotalEl) statsTotalEl.textContent = 'Error';
    }
}

document.addEventListener('DOMContentLoaded', fetchHerbData);
