// Background Service Worker - Job Matcher Extension
'use strict';

// Cache for scraped job data per tab
const tabJobData = {};

// Listen for content script ready notifications
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'contentScriptReady') {
        const tabId = sender.tab?.id;
        if (tabId) {
            tabJobData[tabId] = {
                platform: message.platform,
                url: message.url,
                ready: true
            };
        }
        sendResponse({ status: 'acknowledged' });
        return true;
    }

    if (message.action === 'getTabInfo') {
        // Popup asks for info about current tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0]?.id;
            const info = tabJobData[tabId] || null;
            sendResponse({ tabId, info, url: tabs[0]?.url });
        });
        return true;
    }

    if (message.action === 'cacheJobData') {
        // Cache scraped job data
        const tabId = message.tabId;
        if (tabId) {
            tabJobData[tabId] = { ...tabJobData[tabId], ...message.data };
        }
        sendResponse({ status: 'cached' });
        return true;
    }
});

// Clean up when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
    delete tabJobData[tabId];
});

// Set badge on supported pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const isSupported =
            tab.url.includes('linkedin.com/jobs') ||
            tab.url.includes('linkedin.com/job') ||
            tab.url.includes('indeed.com') ||
            tab.url.includes('naukri.com');

        if (isSupported) {
            chrome.action.setBadgeBackgroundColor({ color: '#6c5ce7', tabId });
            chrome.action.setBadgeText({ text: 'JM', tabId });
        } else {
            chrome.action.setBadgeText({ text: '', tabId });
        }
    }
});
