import { pipeline } from "@xenova/transformers";


let embedder = null;

// Load model once
async function loadModel() {
    if (!embedder) {
        console.log("Loading BGE model...");
        embedder = await pipeline(
            "feature-extraction",
            "Xenova/bge-base-en"
        );
        console.log("Model loaded.");
    }
}

// Cosine similarity
function cosineSimilarity(a, b) {
    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Mean pooling (BGE returns token embeddings)
function meanPooling(embeddings) {
    // embeddings.dims = [batch, sequence, hidden]
    const [batch, seq, hidden] = embeddings.dims;
    const data = embeddings.data;

    const pooled = new Float32Array(hidden).fill(0);

    // Sum across sequence
    for (let s = 0; s < seq; s++) {
        for (let h = 0; h < hidden; h++) {
            pooled[h] += data[s * hidden + h];
        }
    }

    // Divide by sequence length
    return pooled.map(v => v / seq);
}

// Main comparison function
export async function compareResumeAndJD(resumeText, jdText) {
    await loadModel();

    const resumeExt = await embedder(resumeText);
    const jdExt = await embedder(jdText);

    const resumeEmbedding = meanPooling(resumeExt);
    const jdEmbedding = meanPooling(jdExt);
    console.log(resumeEmbedding, jdEmbedding, 'jjj');
    const similarity = cosineSimilarity(resumeEmbedding, jdEmbedding);
    return Number((similarity * 100).toFixed(2));
}