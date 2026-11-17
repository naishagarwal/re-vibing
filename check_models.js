const { GoogleGenerativeAI } = require('@google/generative-ai');

async function check() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY not set!");
            return;
        }
        
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await res.json();
        
        console.log("Available Models:");
        data.models.forEach(m => {
             if (m.name.includes('gemini-1')) {
                 console.log(m.name, m.supportedGenerationMethods);
             }
        });
    } catch(e) {
        console.error(e);
    }
}
check();
