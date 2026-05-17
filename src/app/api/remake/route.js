import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { originalImageUrl, userPrompt } = await req.json();

    if (!originalImageUrl || !userPrompt) {
      return Response.json({ error: "originalImageUrl dan userPrompt diperlukan" }, { status: 400 });
    }

    // Ambil gambar dari URL dan ubah menjadi Buffer untuk inlineData
    const imageResp = await fetch(originalImageUrl);
    if (!imageResp.ok) {
      throw new Error(`Gagal mengambil gambar: ${imageResp.statusText}`);
    }

    const arrayBuffer = await imageResp.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = imageResp.headers.get('content-type') || 'image/jpeg';

    const systemInstruction = `Anda adalah Perancang Busana Upcycling Professional. 
Tugas Anda adalah mengubah pakaian asli yang ada di foto berdasarkan request/prompt dari pengguna.
Jika pengguna meminta sesuatu yang tidak masuk akal di luar konteks garmen/tekstil (misal: diubah jadi HP atau makanan), berikan respon JSON dengan properti "error" yang berisi penolakan sopan.
Jika masuk akal (misal: celana jadi tas, kemeja jadi rompi), berikan output berupa JSON rapi berisi array "recipe" (langkah-langkah potong, pola, dan jahit dalam bahasa Indonesia yang mudah dipahami pemula) dan "title" (nama desain baru). Output harus selalu valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { data: base64Image, mimeType } },
            { text: `Prompt Pengguna: ${userPrompt}` }
          ]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      }
    });

    const responseText = response.text;
    const parsedData = JSON.parse(responseText);

    return Response.json(parsedData);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({ error: "Gagal menghasilkan desain karena kendala server." }, { status: 500 });
  }
}
