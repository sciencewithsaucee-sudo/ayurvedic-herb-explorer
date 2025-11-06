# Contributing to the Ayurvedic Herb Explorer

We are thrilled that you're interested in contributing to this open-source research tool. Your help is valuable for making this software better for students and researchers everywhere.

By contributing, you agree to abide by our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). (We can create this file next).

---

## ❗ Software Repository vs. Data Repository

This is a very important distinction:

* **This Repository (`ayurvedic-herb-explorer`)** contains the **SOFTWARE** (the HTML, CSS, and JavaScript web application) that *displays* the data.
* **The Data Repository (`herb-database`)** contains the **DATA** (the `herb.json` file) that the software *reads*.

### To Fix Herb Data:
If you found an error in an herb's properties (e.g., "Amla's Rasa is incorrect"), please contribute to the **Data Repository**:
* **Best way:** Use the "Suggest an Edit" button inside the app.
* **Or:** Submit an Issue or Pull Request to the [herb-database repository](https://github.com/sciencewithsaucee-sudo/herb-database).

### To Fix the App Itself:
If you found a bug in the app (e.g., "The filter button is broken," "The search is slow," "A modal doesn't close"), **you are in the right place!** Please follow the steps below.

---

## 🐞 How to Report a Bug

1.  **Search the [Issues](../../issues)** to see if someone has already reported the bug.
2.  If not, [file a new issue](../../issues/new).
3.  Please be descriptive. Include:
    * What browser you are using.
    * What steps you took to make the bug happen.
    * What you expected to happen.
    * What actually happened (a screenshot is very helpful!).

## 💡 How to Suggest a Feature

1.  [File a new issue](../../issues/new) to start a discussion.
2.  Clearly describe the feature you'd like to see and *why* it would be useful for researchers or students (the "Statement of Need").

## 💻 How to Contribute Code (Pull Requests)

1.  **Fork** this repository.
2.  **Create a new branch** for your feature or fix:
    * `git checkout -b feature/my-new-feature`
    * `git checkout -b bugfix/fix-the-modal`
3.  **Make your changes**, following the Style Guide below.
4.  **Test your changes** manually using the "Manual Test Plan" in the `README.md` file to ensure you haven't broken any other part of the app.
5.  **Submit a Pull Request** to the `main` branch with a clear description of what you've done.

---

## 🎨 Style Guide & File Structure

This project's modularity is critical. To make sure we pass the JOSS review, all contributions **must** follow this file structure:

* **`index.html`:** This file is for **HTML structure only**.
* **`assets/css/style.css`:** This file is for **CSS styling only**.
* **`assets/js/app.js`:** This file is for **JavaScript logic only**.

**Rule:** Do not add any inline `<style>` or `<script>` tags to `index.html`. All code must go into its respective `assets/` file.
