import React, { useState, useEffect, useCallback } from 'react';
import { analyzeMatch } from '../matcher/matcher';
import { extractTextFromPDF } from '../common/pdfUtils';

const ScoreMeter = ({ score }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="score-container">
            <div className="score-ring-wrapper">
                <svg className="score-ring">
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="transparent"
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="8"
                    />
                    <circle
                        className="score-progress"
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="transparent"
                        stroke="url(#scoreGrad)"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform="rotate(-90 70 70)"
                    />
                    <defs>
                        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6c5ce7" />
                            <stop offset="100%" stopColor="#00cec9" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="score-text">
                    <span className="score-number">{score}</span>
                    <span className="score-percent">%</span>
                </div>
            </div>
            <div className="score-label">Match Score</div>
        </div>
    );
};

const ExperienceComparison = ({ experience }) => {
    if (!experience || (!experience.jdExperience && !experience.resumeExperience)) return null;

    const jdMin = experience.jdExperience?.min || 0;
    const have = experience.resumeExperience?.years || 0;

    let status = 'unknown';
    let label = 'Unknown';
    let percent = 0;

    if (jdMin > 0) {
        percent = Math.min((have / jdMin) * 100, 100);
        if (have >= jdMin) {
            status = 'exceeds';
            label = 'Qualified';
        } else if (have >= jdMin * 0.7) {
            status = 'close';
            label = 'Near Match';
        } else {
            status = 'gap';
            label = 'Experience Gap';
        }
    }

    return (
        <section className="card experience-card">
            <div className="card-header">
                <svg className="card-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.827c.197-.512.914-.512 1.112 0l1.464 3.793a1 1 0 00.95.68h4.045c.548 0 .776.702.333 1.025l-3.272 2.378a1 1 0 00-.363 1.118l1.248 3.791c.168.513-.418.939-.861.619l-3.272-2.378a1 1 0 00-1.112 0l-3.272 2.378c-.443.32-.1.029.106-.619l1.248-3.791a1 1 0 00-.363-1.118l-3.272-2.378c-.443-.323-.215-1.025.333-1.025h4.045a1 1 0 00.95-.68l1.464-3.793z" /></svg>
                <h2>Experience Match</h2>
            </div>
            <div className="exp-comparison">
                <div className="exp-row">
                    <span className="exp-label">Required</span>
                    <span className="exp-value">{jdMin}+ Years</span>
                </div>
                <div className="exp-row">
                    <span className="exp-label">Found</span>
                    <span className={`exp-value ${status}`}>{have} Years</span>
                </div>
                <div className="exp-bar-container">
                    <div className="exp-bar-bg">
                        <div className={`exp-bar-fill ${status}`} style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className={`exp-bar-label ${status}`}>{label}</span>
                </div>
            </div>
        </section>
    );
};

const SidebarApp = () => {
    const [status, setStatus] = useState({ type: 'detecting', text: 'Scanning page...' });
    const [currentJobData, setCurrentJobData] = useState(null);
    const [resumeText, setResumeText] = useState(null);
    const [resumeFileName, setResumeFileName] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const resultsRef = React.useRef(null);

    // Initialize and load saved state
    useEffect(() => {
        const init = async () => {
            const stored = await chrome.storage.local.get(['resumeText', 'resumeFileName']);
            if (stored.resumeText && stored.resumeFileName) {
                setResumeText(stored.resumeText);
                setResumeFileName(stored.resumeFileName);
            }
            detectJobPage();
        };

        const handleRefreshMessage = (event) => {
            if (event.data === 'refresh-job') {
                setCurrentJobData(null);
                setResults(null);
                setLoading(false);
                detectJobPage();
            }
        };

        init();
        window.addEventListener('message', handleRefreshMessage);
        return () => window.removeEventListener('message', handleRefreshMessage);
    }, []);

    // Auto-analyze when both JD and Resume are present
    useEffect(() => {
        if (currentJobData && resumeText && !results && !loading) {
            runAnalysis();
        }
    }, [currentJobData, resumeText, results, loading]);

    // Smooth scroll to results when they appear
    useEffect(() => {
        if (results && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [results]);

    const detectJobPage = async (force = false) => {
        setStatus({ type: 'detecting', text: 'Scanning page...' });
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab) return;
            const response = await chrome.tabs.sendMessage(tab.id, { action: 'scrapeJob' });

            if (response && response.jobTitle) {
                // If it's the same job and not forced, don't reset to avoid flicker
                if (!force && currentJobData && currentJobData.url === response.url) {
                    setStatus({ type: 'success', text: response.platform ? `Found on ${response.platform}` : 'Job Data Extracted' });
                    return;
                }
                setCurrentJobData(response);
                setResults(null); // Clear previous results for fresh analysis
                setStatus({ type: 'success', text: response.platform ? `Found on ${response.platform}` : 'Job Data Extracted' });
            } else if (response === null) {
                // Scraper skipped because URL was already handled
                if (!currentJobData) {
                    setStatus({ type: 'error', text: 'No job detected' });
                } else {
                    setStatus({ type: 'success', text: currentJobData.platform ? `Found on ${currentJobData.platform}` : 'Job Data Extracted' });
                }
            } else {
                setStatus({ type: 'error', text: 'No job detected' });
            }
        } catch (err) {
            setStatus({ type: 'error', text: 'Content script not ready' });
        }
    };

    const handleCompareAndAnalyse = async () => {
        setResults(null);
        await detectJobPage(true);
        if (currentJobData && resumeText) {
            await runAnalysis();
        }
    };

    const processFile = async (file) => {
        if (file.type !== 'application/pdf') return;
        setStatus({ type: 'active', text: 'Reading resume...' });
        try {
            const arrayBuffer = await file.arrayBuffer();
            const text = await extractTextFromPDF(arrayBuffer);
            if (text.trim()) {
                setResumeText(text);
                setResumeFileName(file.name);
                await chrome.storage.local.set({ resumeText: text, resumeFileName: file.name });
                setStatus({ type: 'success', text: 'Resume ready' });
            }
        } catch (err) {
            setStatus({ type: 'error', text: 'Parse failed' });
        }
    };

    const runAnalysis = async () => {
        if (!currentJobData || !resumeText) return;
        setLoading(true);
        setResults(null); // Reset to trigger scroll if re-analyzing

        try {
            const matchResults = await analyzeMatch(currentJobData.jobDescription, resumeText, currentJobData.jobTitle);
            setResults(matchResults);
        } catch (err) {
            console.error('Analysis failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sidebar-container">
            <header className="header">
                <div className="header-glow"></div>
                <div className="header-content">
                    <div className="logo">
                        <svg className="logo-icon" viewBox="0 0 32 32">
                            <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
                            <path d="M10 16.5L14 20.5L22 12.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <defs>
                                <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                                    <stop stopColor="#6c5ce7" />
                                    <stop offset="1" stopColor="#00cec9" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div>
                            <h1>Job Matcher</h1>
                            <p className="subtitle">Resume ↔ JD Analysis</p>
                        </div>
                    </div>
                    <button className="btn-close-sidebar" onClick={() => window.parent.postMessage('close-sidebar', '*')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </header>

            <div className="content-scroll-area">
                <div className={`status-bar ${status.type}`}>
                    <div className="status-icon"><div className="pulse-dot"></div></div>
                    <span>{status.text}</span>
                </div>

                <div className="input-sections">
                    <section className="card job-info">
                        <div className="card-header">
                            <svg className="card-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2a2 2 0 00-2 2v1H3a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H6zm0 2h8v1H6V4z" /></svg>
                            <h2>Job Details</h2>
                        </div>
                        {currentJobData ? (
                            <div className="job-details">
                                <div className="detail-row"><span className="detail-label">Title</span><span className="detail-value">{currentJobData.jobTitle}</span></div>
                                <div className="detail-row"><span className="detail-label">Company</span><span className="detail-value">{currentJobData.companyName}</span></div>
                            </div>
                        ) : <p className="text-muted">No job detected on this page.</p>}

                        <button
                            className="btn-analyze"
                            style={{ marginTop: '12px', width: '85%', padding: '10px' }}
                            disabled={loading}
                            onClick={handleCompareAndAnalyse}
                        >
                            {loading ? 'Analyzing...' : 'Compare & Analyse'}
                        </button>
                    </section>

                    <section className="card upload-section">
                        <div className="card-header">
                            <svg className="card-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
                            <h2>{resumeFileName ? 'Resume Ready' : 'Upload Resume'}</h2>
                        </div>
                        {resumeFileName ? (
                            <div className="stored-resume">
                                <span>{resumeFileName}</span>
                                <button className="btn-clear" onClick={() => { setResumeText(null); setResumeFileName(null); chrome.storage.local.remove(['resumeText', 'resumeFileName']); }}>✕</button>
                            </div>
                        ) : (
                            <div className="drop-zone" onClick={() => document.getElementById('fileInput').click()}>
                                <p>Drop PDF or click to browse</p>
                                <input type="file" id="fileInput" accept=".pdf" hidden onChange={(e) => processFile(e.target.files[0])} />
                            </div>
                        )}
                    </section>
                </div>

                {loading && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Calculating Match...</p>
                    </div>
                )}

                {results && (
                    <div className="results-view animate-in" ref={resultsRef}>
                        <ScoreMeter score={results.score} />

                        <div className="score-stats">
                            <div className="stat">
                                <span className="stat-number matched">{results.totalMatched}</span>
                                <span className="stat-label">Matched</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat">
                                <span className="stat-number missing">{results.totalMissing}</span>
                                <span className="stat-label">Missing</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat">
                                <span className="stat-number total">{results.totalKeywords}</span>
                                <span className="stat-label">Keywords</span>
                            </div>
                        </div>

                        <ExperienceComparison experience={results.experience} />

                        <section className="card skills-analysis">
                            <div className="card-header">
                                <svg className="card-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
                                <h2>Matched Skills</h2>
                            </div>
                            <div className="skills-grid">
                                {Object.entries(results.matched).map(([cat, skills]) => skills.length > 0 && (
                                    <div key={cat} className="skill-cat-block">
                                        <div className="skill-category-name">{cat}</div>
                                        <div className="skill-tags">
                                            {skills.map(s => <span key={s} className="skill-tag matched">{s}</span>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="card skills-analysis">
                            <div className="card-header">
                                <svg className="card-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" /></svg>
                                <h2>Missing Keywords</h2>
                            </div>
                            <div className="skills-grid">
                                {Object.entries(results.missing).map(([cat, skills]) => skills.length > 0 && (
                                    <div key={cat} className="skill-cat-block">
                                        <div className="skill-category-name">{cat}</div>
                                        <div className="skill-tags">
                                            {skills.map(s => <span key={s} className="skill-tag missing">{s}</span>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="card recommendations-section">
                            <div className="card-header">
                                <svg className="card-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                <h2>Recommendations</h2>
                            </div>
                            <ul className="rec-list">
                                {results.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                            </ul>
                        </section>

                        <button className="btn-secondary" onClick={() => { setResults(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Reset & New Analysis</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarApp;
