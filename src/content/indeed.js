// Indeed Content Script - Job Matcher Extension
(function () {
    'use strict';

    const SELECTORS = {
        jobTitle: '.jobsearch-JobInfoHeader-title, h1[data-testid="jobsearch-JobInfoHeader-title"], .icl-u-xs-mb--xs h1',
        companyName: '[data-testid="inlineHeader-companyName"] a, .jobsearch-InlineCompanyRating-companyHeader a, .css-1ioi40n',
        jobDescription: '#jobDescriptionText, .jobsearch-jobDescriptionText, .jobsearch-JobComponent-description',
        location: '[data-testid="inlineHeader-companyLocation"], .jobsearch-JobInfoHeader-subtitle .css-6z8o9s, .jobsearch-InlineCompanyRating > div:last-child'
    };

    function scrapeJobData() {
        const jobTitle = document.querySelector(SELECTORS.jobTitle);
        const companyName = document.querySelector(SELECTORS.companyName);
        const jobDescription = document.querySelector(SELECTORS.jobDescription);
        const location = document.querySelector(SELECTORS.location);

        return {
            platform: 'Indeed',
            jobTitle: jobTitle ? jobTitle.innerText.trim() : 'Unknown Title',
            companyName: companyName ? companyName.innerText.trim() : 'Unknown Company',
            jobDescription: jobDescription ? jobDescription.innerText.trim() : '',
            location: location ? location.innerText.trim() : '',
            url: window.location.href,
            scrapedAt: new Date().toISOString()
        };
    }

    // Check if we are on a relevant page
    const isIndeed = window.location.hostname.includes('indeed') ||
        document.querySelector(SELECTORS.jobTitle);

    if (isIndeed) {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.action === 'scrapeJob') {
                const data = scrapeJobData();
                console.log(data, 'this is data')
                sendResponse(data);
                return true;
            }
            if (message.action === 'ping') {
                sendResponse({ platform: 'Indeed', ready: true });
                return true;
            }
        });

        chrome.runtime.sendMessage({
            action: 'contentScriptReady',
            platform: 'Indeed',
            url: window.location.href
        });
    }
})();
