const { GoogleGenerativeAI } = require('@google/generative-ai');
exports.chatWithMentor = async (req, res) => {
    try {
        const { prompt } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'your_key_here') {
            return res.status(500).json({ error: "Gemini API Key is missing. Please create a .env file and add GEMINI_API_KEY=your_copied_api_key_here!" });
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const formattedInstruction = `You are the highly intelligent UniSkills AI Mentor. You exist inside a full-stack mentorship and skill-exchange platform. Provide professional, short, and highly actionable advice. Be encouraging. User says: ${prompt}`;
        const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-1.5-pro", "gemini-1.0-pro", "gemini-pro"];
        let finalResponse = null;
        for (let m of modelsToTry) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent(formattedInstruction);
                finalResponse = result.response.text();
                console.log(`🟢 Successfully connected to brain using model: ${m}`);
                break; 
            } catch (e) {
                console.log(`🔴 Model ${m} unavailable for this API Key, falling back to next...`);
            }
        }
        if (!finalResponse) {
             return res.status(500).json({ error: "Your API Key is valid, but Google has blocked all Gemini models for your region. Use a VPN or generate a fresh key from a different account." });
        }
        res.status(200).json({ reply: finalResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Brain connection failed. " + err.message });
    }
}
