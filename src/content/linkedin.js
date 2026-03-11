// LinkedIn Content Script - Job Matcher Extension
(function () {
  'use strict';

  // CSS selectors for LinkedIn job pages (updated for 2024/2025 compatibility)
  const SELECTORS = {
    jobTitle: `
      .job-details-jobs-unified-top-card__job-title, 
      .t-24.job-details-jobs-unified-top-card__job-title,
      h1.top-card-layout__title,
      .top-card-layout__title,
      h1,
      .d71bc234.c64973c1:nth-child(1),
      ._8af6450d a.efe78101._172cfafd:nth-child(1),
      a[href*="/jobs/view/"]
    `.trim().replace(/\s+/g, ' '),
    companyName: `
      .job-details-jobs-unified-top-card__company-name a, 
      .job-details-jobs-unified-top-card__company-name,
      .topcard__org-name-link,
      .top-card-layout__first-subline a:first-child,
      .jobs-unified-top-card__company-name,
      ._6704926a._09fcfb3f._85cbca70._521edcf5,
      p._8af6450d ._0bdf4b7c._0b67ec2a.e904d853._172cfafd,
      p a[href*="/company/"]
    `.trim().replace(/\s+/g, ' '),
    jobDescription: `
      .jobs-description-content__text,
      .jobs-description__content, 
      .jobs-box__html-content, 
      #job-details,
      .show-more-less-html__markup,
      .fe8efb7f ._0b26a91a._1b363267.cf0f471a,
      ._23a2cc5c.a12ebf65.a95ca79c,
      [data-testid="expandable-text-box"]
    `.trim().replace(/\s+/g, ' '),
    location: `
      .job-details-jobs-unified-top-card__bullet, 
      .topcard__flavor--bullet,
      .job-details-jobs-unified-top-card__workplace-type
    `.trim().replace(/\s+/g, ' ')
  };

  // State to track if we've handled the current URL to prevent duplicate scans
  let lastHandledUrl = '';

  function scrapeJobData() {
    // Check if we've already scraped this exact URL within this session
    // if (window.location.href === lastHandledUrl) {
    //   console.log('Job Matcher: URL already handled, skipping redundant scrape.');
    //   // We still resolve with a special flag or null to indicate skip
    //   return Promise.resolve({ skipped: true });
    // }

    lastHandledUrl = window.location.href;

    const jobTitle = document.querySelector(SELECTORS.jobTitle);
    const companyName = document.querySelector(SELECTORS.companyName);
    const location = document.querySelector(SELECTORS.location);

    console.log('Job Matcher: Scraping job data...', {
      title: jobTitle?.innerText.trim(),
      company: companyName?.innerText.trim()
    });

    // Helper to get description from multiple potential elements
    const getDescriptionText = () => {
      // 1. User specific obfuscated selector check first
      const specialSelector = '.fe8efb7f ._0b26a91a._1b363267.cf0f471a';
      const specialElements = document.querySelectorAll(specialSelector);
      if (specialElements.length > 0) {
        return Array.from(specialElements).map(e => e.innerText || e.textContent).join('\n').trim();
      }

      // 2. Standard descriptions — grab ALL matching elements to capture split content
      const descElements = document.querySelectorAll(SELECTORS.jobDescription);
      if (descElements.length > 0) {
        const combined = Array.from(descElements)
          .map(el => (el.innerText || el.textContent || '').trim())
          .filter(t => t.length > 0)
          .join('\n');
        if (combined) return combined;
      }

      // 3. Fallback to any large text block in the job details area
      const detailsArea = document.querySelector('#job-details, .jobs-description');
      if (detailsArea) return detailsArea.innerText.trim();

      return '';
    };

    const initialDesc = getDescriptionText();

    // Try to expand "Show more" if present
    const showMoreBtn = document.querySelector('.jobs-description__footer-button, button[aria-label="Show more"], .jobs-description__content button.artdeco-button--muted');
    if (showMoreBtn && showMoreBtn.innerText.toLowerCase().includes('show more')) {
      showMoreBtn.click();
    }

    // Wait briefly then re-scrape description in case it expanded
    return new Promise((resolve) => {
      setTimeout(() => {
        const expandedDesc = getDescriptionText();
        resolve({
          platform: 'LinkedIn',
          jobTitle: jobTitle ? jobTitle.innerText.trim() : 'Unknown Title',
          companyName: companyName ? companyName.innerText.trim() : 'Unknown Company',
          jobDescription: expandedDesc || initialDesc,
          location: location ? location.innerText.trim() : '',
          url: window.location.href,
          scrapedAt: new Date().toISOString()
        });
      }, 600);
    });
  }

  // Check if we are on a relevant page (LinkedIn domain or has job title selector)
  const isLinkedIn = window.location.hostname.includes('linkedin') ||
    document.querySelector(SELECTORS.jobTitle);

  if (isLinkedIn) {
    // Listen for messages from popup or background
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'scrapeJob') {
        scrapeJobData().then((data) => {
          if (data && data.skipped) {
            // If skipped, we can return null or an empty indicator
            sendResponse(null);
          } else {
            sendResponse(data);
          }
        });
        return true; // Keep the message channel open for async response
      }
      if (message.action === 'ping') {
        sendResponse({ platform: 'LinkedIn', ready: true });
        return true;
      }
    });

    // Notify background that content script is loaded
    chrome.runtime.sendMessage({
      action: 'contentScriptReady',
      platform: 'LinkedIn',
      url: window.location.href
    });

    // Reset lastHandledUrl on URL change (SPA handling)
    let lastUrl = window.location.href;
    setInterval(() => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        // When URL changes, we might want to allow a new scrape
        // but we don't clear lastHandledUrl immediately if it's the same job ID
      }
    }, 1000);
  }
})();
