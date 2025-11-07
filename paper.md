---
title: "Ayurvedic Herb Explorer: An Open-Source Platform for Data-Driven Research in Dravyaguna (Ayurvedic Pharmacology)"
authors:
  - name: Sparsh Varshney
    orcid: 0009-0004-7835-0673
    affiliation: 1
affiliations:
 - name: Amidha Ayurveda – Digital Ayurveda Research Initiative
   index: 1
date: 2025-11-07
keywords:
  - Ayurveda
  - Digital Humanities
  - Herbal Database
  - Ayurvedic Pharmacology
  - Research Software
  - JavaScript
bibliography: paper.bib
---

# Summary

The *Ayurvedic Herb Explorer* is an open-source, browser-based application that enables interactive exploration of classical Ayurvedic pharmacological data. It provides a clean and responsive interface to search, filter, and compare over 700 herbs from the *Amidha Ayurveda Open Herb Database* [@varshney_sparsh_2025_herb_database]. Users can perform complex queries based on classical properties such as Rasa (taste), Guna (qualities), Virya (potency), Vipaka (post-digestive effect), Dosha Karma (dosha effect), and Prabhava (specific action).  

Built entirely with lightweight JavaScript, HTML, and CSS, the application requires no installation or backend server, making it fully portable and reproducible. The tool’s goal is to make Ayurvedic data easily explorable, comparable, and citable for students, educators, and researchers in the field of Dravyaguna (Ayurvedic Pharmacology).

# Statement of Need

Classical Ayurvedic knowledge, particularly concerning medicinal herbs (Dravyaguna), is vast but largely distributed across textual sources and non-standardized digital repositories. This fragmentation limits reproducibility, data integration, and cross-disciplinary analysis. While open-source datasets such as the *Amidha Ayurveda Open Herb Database* [@varshney_sparsh_2025_herb_database] have begun to standardize this knowledge, there has been a lack of accessible, testable, and citable *tools* to interact with these datasets.  

Recent work in **evidence-based and data-driven Ayurveda** emphasizes the need for computationally accessible frameworks that bridge classical Ayurvedic principles with modern scientific methods [@patwardhan2014]. The *Ayurvedic Herb Explorer* addresses this challenge by serving as a user-friendly interface for querying, filtering, and visualizing Ayurvedic herb data. It allows researchers to answer questions such as:  

> “List all herbs with *Tikta* (Bitter) Rasa and *Sheeta* (Cooling) Virya that pacify the *Pitta* dosha.”

This software is part of the broader *Amidha Ayurveda Open Research Ecosystem*, which includes projects such as *ShlokaAI* [@varshney_shloka_ai] and *Siddhanta Kosha* [@varshney_siddhant_kosha]. By providing a citable, open-source, and extensible tool for exploring herb properties, *Ayurvedic Herb Explorer* aims to advance the development of reproducible, data-driven research methodologies in Ayurveda.

# Implementation and Testability

The *Ayurvedic Herb Explorer* is a standalone client-side application built with HTML5, CSS3, and modern JavaScript (ES6+). It intentionally avoids any backend dependencies or build steps, ensuring maximum portability, reproducibility, and ease of use. A user can run the software locally by simply opening the `index.html` file in any modern browser.

The architecture is modular, separating structure (`index.html`), styling (`assets/css/style.css`), and logic. The core application logic—including data fetching, filtering, state management, and UI rendering—is contained in `assets/js/app.js`, which is activated by the `assets/js/main.js` entry point. This separation demonstrates a substantial software effort beyond a simple static page.

To ensure correctness and facilitate JOSS review, the repository includes a full automated test suite (`tests/tests.js`). Reviewers can verify all core functionality (filtering, pagination, favorites, and comparison logic) by opening the `tests/tests.html` file in a browser and observing the passing tests.

# Acknowledgements

The author acknowledges the open-source community and early users of the *Amidha Ayurveda* platform for valuable feedback and testing support that contributed to improving this software.

# References
