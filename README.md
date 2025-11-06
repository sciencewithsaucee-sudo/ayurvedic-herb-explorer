[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.YOUR_NEW_DOI.svg)](https://doi.org/10.5281/zenodo.YOUR_NEW_DOI)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JOSS Submission](https://img.shields.io/badge/JOSS-in%20preparation-blue.svg)](https://joss.theoj.org/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/issues)

# 🔎 Ayurvedic Herb Explorer

**Ayurvedic Herb Explorer** is a citable, open-source piece of **research software** designed to make the **[Amidha Ayurveda Open Herb Database](https://github.com/sciencewithsaucee-sudo/herb-database)** accessible and useful.

This is an interactive web-based tool for students, researchers, and developers in the Digital Ayurveda field. It provides a clean interface to dynamically search, filter, and compare 700+ Ayurvedic herbs based on their classical properties (Rasa, Guna, Virya, Vipaka, Dosha Karma, and Prabhava).

---

## 🌟 Key Features

* **Dynamic Data Interface:** Loads the 700+ herb dataset directly from the [source JSON](httpsa://raw.githubusercontent.com/sciencewithsaucee-sudo/herb-database/refs/heads/main/herb.json).
* **Advanced Multi-Filter:** A "Research Mode" panel to perform complex queries by combining filters for Rasa, Guna, Virya, Vipaka, Dosha Karma, and Prabhava.
* **Herb Comparison Tool:** Select up to 3 herbs and generate a dynamic comparison table of all their properties.
* **Favorites System:** "Favorite" herbs and save them to your browser's local storage for future reference.
* **Live Search & Sort:** Instantly search by herb name and sort results alphabetically (A-Z, Z-A).
* **Fully Responsive:** A clean two-column layout on desktop that collapses to a user-friendly modal filter on mobile.
* **Community Contribution:** Includes built-in forms for users to "Suggest an Edit" or "Request a Herb."
* **Standalone & Testable:** Runs 100% locally in any modern browser by simply opening the `index.html` file.

---

## 🚀 How to Use

This is a standalone web application. You can either use the live tool or run it locally.

🔗 **Live Tool:** [**https://sciencewithsaucee-sudo.github.io/ayurvedic-herb-explorer/**](https://sciencewithsaucee-sudo.github.io/ayurvedic-herb-explorer/)
*(Note: You will need to enable GitHub Pages in your repository settings for this link to work)*

**Local Use:**
1.  Download or clone this repository.
2.  Open the `index.html` file in any modern web browser (like Chrome, Firefox, or Edge).
3.  The application will automatically fetch the latest herb data and run.

---

## 🧪 JOSS - Manual Test Plan for Reviewers

As per JOSS requirements for web applications, here is a manual test plan to verify all core functionality.

**Prerequisite:** Open the `index.html` file in a web browser.

* **Test 1: Data Loading:**
    * **Action:** Wait for the page to load.
    * **Expected:** The "Loading..." message should be replaced by "Showing 20 of 700+ herbs" and a grid of 20 herb cards.

* **Test 2: Live Search:**
    * **Action:** Type "Ashwagandha" into the search bar.
    * **Expected:** The grid should update instantly to show only the "Ashwagandha" card.

* **Test 3: Advanced Filtering:**
    * **Action:** Click the "Filters & Sort" button (on mobile) or use the left panel (on desktop). Check "Rasa: Tikta" and "Virya: Sheeta".
    * **Expected:** The grid will update to show only herbs matching both filters (e.g., "Amla", "Guduchi"). The count will update (e.g., "Showing X of Y herbs").

* **Test 4: Favorites System:**
    * **Action (Add):** Click the heart icon on the "Amla" card. It should turn red. Check the "Show Favorites" toggle in the filter panel.
    * **Expected (Add):** The grid will show only the "Amla" card.
    * **Action (Remove):** Un-toggle "Show Favorites". Click the "Amla" heart icon again. It should turn gray.
    * **Expected (Remove):** The herb is no longer a favorite.

* **Test 5: Comparison Tool:**
    * **Action:** Click the "Amla" card to open its detail modal. Check the "Compare" box. Close the modal. Click the "Haritaki" card, open its modal, and check "Compare."
    * **Expected:** A "Compare Tray" appears at the bottom of the screen showing "2 herbs selected."
    * **Action:** Click the "Compare" button in the tray.
    * **Expected:** A modal appears showing a table with "Amla" and "Haritaki" side-by-side, comparing all their properties.

* **Test 6: Contribution Forms:**
    * **Action:** Click the "Request a Herb" button in the top bar.
    * **Expected:** A modal form appears, allowing a user to submit a request.

---

## 📖 How to Cite

If you use this software in your research, please cite it. This helps support the project. **(Note: You will get this DOI from Zenodo after creating the release).**

**Plain Text Citation:**
> Varshney, S. (2025). *Ayurvedic Herb Explorer (Version 1.0.0)* [Software]. Zenodo.
> [https://doi.org/10.5281/zenodo.YOUR_NEW_DOI](https://doi.org/10.5281/zenodo.YOUR_NEW_DOI)

**BibTeX (for researchers):**
```bibtex
@software{varshney_sparsh_2025_AYURVEDA_EXPLORER,
  author       = {Varshney, Sparsh},
  title        = {{Ayurvedic Herb Explorer}},
  month        = nov,
  year         = 2025,
  publisher    = {Zenodo},
  version      = {1.0.0},
  doi          = {10.5281/zenodo.YOUR_NEW_DOI},
  url          = {[https://doi.org/10.5281/zenodo.YOUR_NEW_DOI](https://doi.org/10.5281/zenodo.YOUR_NEW_DOI)}
}
```
---
## 📚 Related Projects

This software is the primary interface for the **Amidha Ayurveda Open Herb Database**.

* **Dataset Repository:** [github.com/sciencewithsaucee-sudo/herb-database](https://github.com/sciencewithsaucee-sudo/herb-database)
* **Dataset DOI:** [10.5281/zenodo.17475352](https://doi.org/10.5281/zenodo.17475352)

---

## 🤝 Contributing & Support

This is a community project — **contributions are welcome!**

* 🐞 **Found a bug?** [Report it as an Issue](../../issues).
* 💡 **Have an idea?** Suggest a new feature.
* 🔧 **Want to help?** Please read our `CONTRIBUTING.md` (we will create this next).

---

## 👨‍💻 About the Author

**Developed by:** *Sparsh Varshney* (Founder, Amidha Ayurveda)

* 🌐 **Website:** [amidhaayurveda.com/p/about.html](https://amidhaayurveda.com/p/about.html)
* 🆔 **ORCID:** [https://orcid.org/0009-0004-7835-0673](https://orcid.org/0009-0004-7835-0673)
* 💼 **LinkedIn:** [linkedin.com/in/sparshvarshney](https://linkedin.com/in/sparshvarshney)

---

## 📄 License

This project is licensed in two parts:

* **Software Code:** All code in this repository (e.g., `.js`, `.html`, `.css` files) is licensed under the [**MIT License**](LICENSE).
* **Documentation & Content:** All documentation (like this `README.md`) is licensed under the [**Creative Commons Attribution 4.0 International (CC BY 4.0)**](https://creativecommons.org/licenses/by/4.0/).
