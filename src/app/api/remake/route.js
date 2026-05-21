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
Jika masuk akal (misal: celana jadi tas, kemeja jadi rompi), berikan output berupa JSON rapi berisi:
- "recipe": array (langkah-langkah potong, pola, dan jahit dalam bahasa Indonesia yang mudah dipahami pemula)
- "title": string (nama desain baru)
- "imagePrompt": string (deskripsi visual berbahasa Inggris yang sangat detail dan estetik tentang wujud baru pakaian hasil upcycling tersebut untuk di-generate oleh AI. Contoh: "A high-quality studio lookbook photo of a modern tote bag made from repurposed distressed black denim jeans, clean stitching, minimalist eco-friendly fashion style").
Output harus selalu valid JSON.`;

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

    // Langsung return jika Gemini mendeteksi error dari prompt
    if (parsedData.error) {
      return Response.json(parsedData);
    }

    // 2. Generate Image using Imagen 3 based on imagePrompt
    let generatedImageUrl = originalImageUrl; // Fallback jika gagal generate gambar

    try {
      if (parsedData.imagePrompt) {
        const imageResult = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: parsedData.imagePrompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '3:4', // Ideal untuk foto fashion/lookbook
          }
        });

        if (imageResult.generatedImages && imageResult.generatedImages.length > 0) {
          const imageBytes = imageResult.generatedImages[0].image.imageBytes;
          generatedImageUrl = `data:image/jpeg;base64,${imageBytes}`;
        }
      }
    } catch (imgError) {
      console.error("Imagen API Error (Fallback to Original Image):", imgError);
    }

    // Gabungkan URL gambar hasil generate ke objek response
    parsedData.generatedImageUrl = generatedImageUrl;
    return Response.json(parsedData);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({ error: "Gagal menghasilkan desain karena kendala server." }, { status: 500 });
  }
}
