// Injector Script - Job Matcher Extension
(function () {
    'use strict';

    // ID constants
    const FAB_ID = 'job-matcher-fab';
    const SIDEBAR_ID = 'job-matcher-sidebar-container';
    const IFRAME_ID = 'job-matcher-sidebar-frame';

    // Safeguard: Check if already injected
    if (document.getElementById(FAB_ID)) return;

    // -- 1. Inject CSS (Handled by manifest.json in dist) --

    // -- 2. Create Floating Action Button (FAB) --
    const fab = document.createElement('div');
    fab.id = FAB_ID;
    fab.title = 'Open Job Matcher';

    const icon = document.createElement('img');
    icon.src = chrome.runtime.getURL('icons/icon48.png');

    const label = document.createElement('span');
    label.textContent = 'Job Matcher';

    fab.appendChild(icon);
    fab.appendChild(label);
    document.body.appendChild(fab);

    // -- 3. Create Sidebar Container (iframe created fresh each time) --
    const container = document.createElement('div');
    container.id = SIDEBAR_ID;
    document.body.appendChild(container);

    // -- 4. Drag and Click Logic --
    let isVisible = false;
    let isDragging = false;
    let startY = 0;
    let startTop = 0;
    const DRAG_THRESHOLD = 5; // pixels

    // Load saved position
    chrome.storage.local.get(['fabTop'], (result) => {
        if (result.fabTop) {
            fab.style.top = result.fabTop;
            fab.style.transform = 'none'; // Disable the default centering
        }
    });

    fab.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only left click
        isDragging = false;
        startY = e.clientY;
        const rect = fab.getBoundingClientRect();
        startTop = rect.top;

        const onMouseMove = (moveEvent) => {
            const deltaY = moveEvent.clientY - startY;
            if (Math.abs(deltaY) > DRAG_THRESHOLD) {
                isDragging = true;
                fab.classList.add('dragging');
            }

            if (isDragging) {
                let newTop = startTop + deltaY;
                // Boundary checks
                const margin = 10;
                newTop = Math.max(margin, Math.min(window.innerHeight - fab.offsetHeight - margin, newTop));

                fab.style.top = `${newTop}px`;
                fab.style.transform = 'none';
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (isDragging) {
                fab.classList.remove('dragging');
                // Save position
                chrome.storage.local.set({ fabTop: fab.style.top });
                // Prevent the click event from firing if we were dragging
                setTimeout(() => { isDragging = false; }, 0);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    fab.addEventListener('click', (e) => {
        if (isDragging) return;
        isVisible = !isVisible;
        toggleSidebar(isVisible);
    });

    function toggleSidebar(show) {
        if (show) {
            // Destroy old iframe if any
            const oldFrame = document.getElementById(IFRAME_ID);
            if (oldFrame) oldFrame.remove();

            // Create a brand new iframe — this forces a full fresh render
            const iframe = document.createElement('iframe');
            iframe.id = IFRAME_ID;
            iframe.src = chrome.runtime.getURL('sidebar/sidebar.html');
            container.appendChild(iframe);

            container.classList.add('visible');
            fab.style.right = '400px';
            fab.style.borderRadius = '8px 0 0 8px';
        } else {
            container.classList.remove('visible');
            fab.style.right = '0';

            // Destroy iframe on close so next open is always fresh
            const oldFrame = document.getElementById(IFRAME_ID);
            if (oldFrame) oldFrame.remove();
        }
    }

    // Listen for close message from sidebar iframe
    window.addEventListener('message', (event) => {
        if (event.data === 'close-sidebar') {
            isVisible = false;
            toggleSidebar(false);
        }
    });

    // Listen for extension messages
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === 'toggleSidebar') {
            isVisible = !isVisible;
            toggleSidebar(isVisible);
        }
        if (message.action === 'closeSidebar') {
            isVisible = false;
            toggleSidebar(false);
        }
    });

})();
