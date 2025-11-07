[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17553999.svg)](https://doi.org/10.5281/zenodo.17553999)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JOSS Submission](https://img.shields.io/badge/JOSS-in%20preparation-blue.svg)](https://joss.theoj.org/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/issues)

# 🔎 Ayurvedic Herb Explorer

**An Open-Source Platform for Data-Driven Research in Dravyaguna (Ayurvedic Pharmacology)**

**Ayurvedic Herb Explorer** is a citable, open-source piece of **research software** designed to make the [**Amidha Ayurveda Open Herb Database**](https://github.com/sciencewithsaucee-sudo/herb-database) accessible and useful.

This is an interactive web-based tool for students, researchers, and developers in the Digital Ayurveda field. It provides a clean interface to dynamically search, filter, and compare 700+ Ayurvedic herbs based on their classical properties — **Rasa, Guna, Virya, Vipaka, Dosha Karma, and Prabhava.**

---

## 🌟 Key Features

- **Dynamic Data Interface:** Loads the 700+ herb dataset directly from the [source JSON](https://raw.githubusercontent.com/sciencewithsaucee-sudo/herb-database/main/herb.json).
- **Advanced Multi-Filter:** A "Research Mode" panel to perform complex queries by combining filters for Rasa, Guna, Virya, Vipaka, Dosha Karma, and Prabhava.
- **Herb Comparison Tool:** Select up to 3 herbs and generate a dynamic comparison table of all their properties.
- **Favorites System:** "Favorite" herbs and save them to your browser's local storage for future reference.
- **Live Search & Sort:** Instantly search by herb name and sort results alphabetically (A–Z, Z–A).
- **Fully Responsive:** A clean two-column layout on desktop that collapses to a user-friendly modal filter on mobile.
- **Community Contribution:** Includes built-in forms for users to "Suggest an Edit" or "Request a Herb."
- **Standalone & Testable:** Runs 100% locally in any modern browser by simply opening the `index.html` file.

---

## 🚀 How to Use

This is a standalone web application. You can either use the live tool or run it locally.

🔗 **Live Tool:** [**https://sciencewithsaucee-sudo.github.io/ayurvedic-herb-explorer/**](https://sciencewithsaucee-sudo.github.io/ayurvedic-herb-explorer/)

### **Local Use**

1. Download or clone this repository.  
2. Open the `index.html` file in any modern web browser (like Chrome, Firefox, or Edge).  
3. The application will automatically fetch the latest herb data and run.

> 💡 **Note:** An active internet connection is required on first load to fetch the live herb database from GitHub.  
> Once loaded, all filtering and searching operations are processed **offline in your browser**.

---

## 🧪 JOSS - Manual Test Plan for Reviewers

As per JOSS requirements for web applications, here is a manual test plan to verify all core functionality.

**Prerequisite:** Open the `index.html` file in a web browser.

### **Test 1: Data Loading**
- **Action:** Wait for the page to load.  
- **Expected:** The “Loading...” message should be replaced by “Showing 20 of 700+ herbs” and a grid of herb cards.

### **Test 2: Live Search**
- **Action:** Type “Ashwagandha” into the search bar.  
- **Expected:** The grid should update instantly to show only the “Ashwagandha” card.

### **Test 3: Advanced Filtering**
- **Action:** Click the “Filters & Sort” button (on mobile) or use the left panel (on desktop).  
- **Expected:** Selecting “Rasa: Tikta” and “Virya: Sheeta” should show matching herbs (e.g., “Amla”, “Guduchi”).

### **Test 4: Favorites System**
- **Action (Add):** Click the heart icon on “Amla”. It should turn red.  
- **Action (View):** Enable “Show Favorites”.  
- **Expected:** Only favorite herbs appear.  
- **Action (Remove):** Unfavorite to turn gray again.

### **Test 5: Comparison Tool**
- **Action:** Open two herbs (e.g., “Amla”, “Haritaki”), check both “Compare” boxes.  
- **Expected:** A “Compare Tray” appears with both herbs. Clicking it opens a comparison table.

### **Test 6: Contribution Forms**
- **Action:** Click “Request a Herb” in the top bar.  
- **Expected:** A modal form opens for user submission.

---

## 📖 How to Cite

If you use this software in your research, please cite it.  
You can use the "Cite this repository" feature on the GitHub sidebar or use the information below.

**Plain Text Citation:**

> Varshney, S. (2025). *Ayurvedic Herb Explorer: An Open-Source Platform for Data-Driven Research in Dravyaguna (Ayurvedic Pharmacology) (v1.0.0)* [Software]. Zenodo.  
> [https://doi.org/10.5281/zenodo.17553999](https://doi.org/10.5281/zenodo.17553999)

---

## 📚 Related Projects

This software is part of the **Amidha Ayurveda Open Research Ecosystem**.

- **[Herb Database](https://github.com/sciencewithsaucee-sudo/herb-database)** *(Data)* — *Amidha Ayurveda Open Herb Database *  
  **DOI:** [10.5281/zenodo.17475352](https://doi.org/10.5281/zenodo.17475352)

- **[Siddhanta Kosha](https://github.com/sciencewithsaucee-sudo/siddhanta-kosha)** *(Data)* — *A Curated JSON Dataset of 162 Core Ayurvedic Principles*  
  **DOI:** [10.5281/zenodo.17481343](https://doi.org/10.5281/zenodo.17481343)

- **[ShlokaAI](https://github.com/sciencewithsaucee-sudo/ShlokaAI)** *(Software)* — *🕉️ ShlokaAI: The Smart Sanskrit Analysis Platform *  
  **DOI:** [10.5281/zenodo.17506829](https://doi.org/10.5281/zenodo.17506829)

---

## 🤝 Contributing & Support

This is a community-driven project — **contributions are welcome!**

- 🐞 **Found a bug?** [Open an issue here.](https://github.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/issues)  
- 💡 **Have an idea?** [Open a feature request](https://github.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/issues)  
- 🔧 **Want to contribute?** Please read the [Contributing Guidelines](https://github.com/sciencewithsaucee-sudo/ayurvedic-herb-explorer/blob/main/CONTRIBUTING.md).

---

## 👨‍💻 About the Author

**Developed by:** *Sparsh Varshney*  
Founder, **Amidha Ayurveda – Digital Ayurveda Research Initiative**

- 🌐 **Website:** [amidhaayurveda.com/p/about.html](https://amidhaayurveda.com/p/about.html)  
- 🆔 **ORCID:** [https://orcid.org/0009-0004-7835-0673](https://orcid.org/0009-0004-7835-0673)  
- 💼 **LinkedIn:** [linkedin.com/in/sparshvarshney](https://linkedin.com/in/sparshvarshney)

---

## 📄 License

This project is licensed under a **dual-license system:**

- **Software Code:** All `.js`, `.html`, `.css` files are licensed under the [MIT License](https://opensource.org/licenses/MIT).  
- **Documentation & Content:** Licensed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

---

*This repository is part of the Amidha Ayurveda Open Research Ecosystem — promoting open-source, reproducible, and data-driven Ayurveda research.*
