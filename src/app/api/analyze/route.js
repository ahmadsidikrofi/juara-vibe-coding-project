import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { getAnalyzeSystemInstruction } from './prompt';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada gambar yang diunggah' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File yang diunggah harus berupa gambar' }, { status: 400 });
    }

    // Limit file size to 2MB
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'Ukuran gambar maksimal 2MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY
    if (!apiKey) {
      console.error("GOOGLE_GEMINI_API_KEY is not set.");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = getAnalyzeSystemInstruction();

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: file.type,
              }
            },
            {
              text: "Mohon analisis gambar pakaian ini sesuai instruksi."
            }
          ]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      }
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(new TextEncoder().encode(chunk.text));
            }
          }
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Error in analyze API:', error);
    return NextResponse.json({ error: 'Gagal menganalisis gambar: ' + error.message }, { status: 500 });
  }
}
