// test-models.js
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

async function run() {
    try {
        console.log("=== DAFTAR MODEL YANG BISA KAMU AKSES ===");

        const models = await ai.models.list();

        for await (const model of models) {
            console.log(`- ${model.name}`);
        }

    } catch (error) {
        console.error("Gagal mengambil daftar model:", error);
    }
}

run();