import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './sidebar.css';

const container = document.getElementById('root');
if (!container) {
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
