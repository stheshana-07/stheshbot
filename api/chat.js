export default async function handler(req, res) {
    const { prompt, developerInfo } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY; // This stays hidden on the server

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(GEMINI_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: developerInfo + "\n\n" + prompt }] }]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to Gemini" });
    }
}
