import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { compareResumeAndJD } from "./matcher.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Custom error handler for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('JSON Parsing Error:', err.message);
        return res.status(400).json({ error: 'Malformed JSON payload. Please clean text of control characters.' });
    }
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'Job Matcher API is running' });
});
app.post("/compare", async (req, res) => {
    try {
        const { resume, jd } = req.body;

        if (!resume || !jd) {
            return res.status(400).json({
                error: "Resume and JD text are required."
            });
        }

        const score = await compareResumeAndJD(resume, jd);

        res.json({
            matchPercentage: score
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});
// Example route for future matching logic
app.post('/api/analyze', (req, res) => {
    const { jd, resume } = req.body;
    // placeholder for future backend-side analysis
    res.json({
        status: 'success',
        received: {
            jdLength: jd?.length || 0,
            resumeLength: resume?.length || 0
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});