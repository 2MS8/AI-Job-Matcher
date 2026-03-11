import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './popup.css';

const container = document.getElementById('root');
if (!container) {
    // Add a root div if it doesn't exist in the HTML template (though it should)
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
}

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
