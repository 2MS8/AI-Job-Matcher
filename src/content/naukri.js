// Naukri Content Script - Job Matcher Extension
(function () {
    'use strict';

    const SELECTORS = {
        jobTitle: '.styles_jd-header-title__rZwM1 h1, .jd-header-title h1, h1.styles_jhc__job-title__VEMnP,h1.styles_jd-header-title__rZwM1',
        companyName: '.styles_jd-header-comp-name__MvqAI a, .jd-header-comp-name a, a.styles_jhc__comp-name__zAaKP',
        jobDescription: '.styles_JDC__dang-inner-html__h0K4t, .dang-inner-html, .styles_job-desc-container__txpYf',
        location: '.styles_jhc__loc___Du2H, .location .loc, .ni-job-tuple-icon-srp-location'
    };

    function scrapeJobData() {
        const jobTitle = document.querySelector(SELECTORS.jobTitle);
        const companyName = document.querySelector(SELECTORS.companyName);
        const jobDescription = document.querySelector(SELECTORS.jobDescription);
        const location = document.querySelector(SELECTORS.location);

        // Also try to get key skills if available on Naukri
        const keySkillsEl = document.querySelector('.styles_key-skill__GIPn_, .key-skill, .chip-container');
        let keySkills = [];
        if (keySkillsEl) {
            const skillTags = keySkillsEl.querySelectorAll('a, span.chip-body, .styles_chip-list__JMXMH a');
            keySkills = Array.from(skillTags).map(el => el.innerText.trim()).filter(s => s);
        }

        return {
            platform: 'Naukri',
            jobTitle: jobTitle ? jobTitle.innerText.trim() : 'Unknown Title',
            companyName: companyName ? companyName.innerText.trim() : 'Unknown Company',
            jobDescription: jobDescription ? jobDescription.innerText.trim() : '',
            location: location ? location.innerText.trim() : '',
            keySkills: keySkills,
            url: window.location.href,
            scrapedAt: new Date().toISOString()
        };
    }

    // Check if we are on a relevant page
    const isNaukri = window.location.hostname.includes('naukri') ||
        document.querySelector(SELECTORS.jobTitle);

    if (isNaukri) {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === 'scrapeJob') {
                const data = scrapeJobData();
                sendResponse(data);
                return true;
            }
            if (message.action === 'ping') {
                sendResponse({ platform: 'Naukri', ready: true });
                return true;
            }
        });

        chrome.runtime.sendMessage({
            action: 'contentScriptReady',
            platform: 'Naukri',
            url: window.location.href
        });
    }
})();
