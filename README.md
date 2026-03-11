# 🎯 Job Matcher - AI Resume Analysis Extension

Job Matcher is a powerful, privacy-first Chrome Extension built with **React** and **NLP** that helps job seekers instantly analyze how well their resume matches a job description. It extracts key skills, identifies experience gaps, and calculates a semantic match score—all processed locally on your device.

![Job Matcher Preview](https://github.com/2MS8/AI-Job-Matcher/raw/main/public/icons/icon128.png)

## 🚀 Key Features

*   **Privacy-First (Local NLP):** Uses `wink-nlp` to perform heavy-duty text analysis and similarity scoring directly in the browser. No data ever leaves your machine.
*   **Multi-Platform Support:** Seamlessly integrates with **LinkedIn**, **Indeed**, and **Naukri**.
*   **Smart Semantic Matching:** Goes beyond keyword counting. Uses vector-based cosine similarity to understand the relationship between your resume and the job requirements.
*   **Skill Detection:** Categorizes matched and missing keywords across Programming Languages, Frameworks, Tools, and Soft Skills.
*   **Experience Gap Analysis:** Automatically detects required years of experience from the JD and compares it with your resume history.
*   **Premium Glassmorphism UI:** A sleek, modern sidebar with smooth animations and intuitive feedback.

## 🛠️ Technical Stack

*   **Frontend:** React 18, Vanilla CSS (Glassmorphism)
*   **NLP Engine:** [wink-nlp](https://winkjs.org/wink-nlp/) (tokenization, stemming, vector math)
*   **Build System:** Webpack 5 (Optimized with code splitting & shared chunks)
*   **PDF Parsing:** [pdfjs-dist](https://mozilla.github.io/pdf.js/)
*   **Manifest V3:** Fully compliant with the latest Chrome extension standards.

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/2MS8/AI-Job-Matcher.git

    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Build the extension:**
    ```bash
    # For development (with watch mode)
    npm run dev

    # For production
    npm run build
    ```

4.  **Load in Chrome:**
    *   Open `chrome://extensions/`
    *   Enable **Developer mode** (toggle in top right).
    *   Click **Load unpacked**.
    *   Select the `dist` folder generated in the project directory.

## 💡 How to Use

1.  **Upload Resume:** Open the extension popup or use the floating button on job sites to upload your PDF resume.
2.  **Browse Jobs:** Visit any job posting on LinkedIn, Indeed, or Naukri.
3.  **Analyze:** The sidebar will automatically detect the job details. Click **Compare & Analyse** to see your score and feedback.

## ⚡ Performance Optimization

The production build is optimized to be lightweight and fast:
*   **Size Reduction:** Bundle size reduced from ~20MB to ~5.4MB through aggressive Webpack optimization.
*   **Deduplication:** Shared libraries (React, wink-nlp, PDF.js) are extracted into a `shared/vendor.js` chunk to prevent redundant loading.
*   **Local Processing:** Zero network latency for analysis by avoiding external API dependencies.

---

Made with ❤️ for better job searching.
