import React from 'react';

const PopupApp = () => {
    return (
        <div className="container">
            <header className="header">
                <div className="header-glow"></div>
                <div className="header-content">
                    <div className="logo">
                        <svg className="logo-icon" viewBox="0 0 32 32">
                            <rect width="32" height="32" rx="8" fill="url(#logoGradPopupInner)" />
                            <path d="M10 16.5L14 20.5L22 12.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <defs>
                                <linearGradient id="logoGradPopupInner" x1="0" y1="0" x2="32" y2="32">
                                    <stop stopColor="#6c5ce7" /><stop offset="1" stopColor="#00cec9" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div>
                            <h1>Job Matcher</h1>
                            <p className="subtitle">Setup & Instructions</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <section className="section">
                    <h2 className="section-title">How to use</h2>
                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <div className="step-text">
                                <strong>Upload Resume</strong>
                                <p>Open any supported job site and look for the Floating Action Button to upload your PDF resume.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <div className="step-text">
                                <strong>Visit Job Page</strong>
                                <p>Navigate to a job posting on LinkedIn, Indeed, or Naukri.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <div className="step-text">
                                <strong>Analyze Match</strong>
                                <p>The sidebar will automatically open and analyze how well your resume matches the job description.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <h2 className="section-title">Supported Platforms</h2>
                    <div className="platforms">
                        <div className="platform-tag">LinkedIn</div>
                        <div className="platform-tag">Indeed</div>
                        <div className="platform-tag">Naukri</div>
                    </div>
                </section>

                <div className="footer-action">
                    <p className="hint">Analysis happens entirely on your device for privacy.</p>
                </div>
            </main>

            <footer className="footer">
                <p>Version 1.2.0 • NLP Powered</p>
            </footer>
        </div>
    );
};

export default PopupApp;
