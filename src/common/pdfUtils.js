import * as pdfjs from 'pdfjs-dist';

// Use chrome.runtime.getURL for reliable worker loading in extension environment
pdfjs.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('lib/pdf.worker.min.mjs');

/**
 * Extract text from a PDF ArrayBuffer
 */
export const extractTextFromPDF = async (arrayBuffer) => {
    try {
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map(item => item.str)
                .join(' ');
            fullText += pageText + '\n';
        }

        const trimmed = fullText.trim();
        if (!trimmed) throw new Error('PDF appears to be empty or scanned (image-only)');

        return trimmed;
    } catch (error) {
        console.error('PDF Extraction Error:', error);
        throw new Error('Failed to parse PDF. Please ensure it is a text-based PDF.');
    }
};
