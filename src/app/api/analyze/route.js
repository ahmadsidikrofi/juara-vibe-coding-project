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

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Ups... Format file tidak didukung. Fotonya pake format JPG atau PNG yaa 😊' }, { status: 400 });
    }

    // Limit file size to 1MB
    if (file.size > 1 * 1024 * 1024) {
      return NextResponse.json({ error: 'Ups... Ukuran gambar melebihi batas 1MB. Silahkan kompres foto kamu yaa 😊' }, { status: 400 });
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
    const errMessage = error.message || '';
    if (errMessage.includes('spending cap') || errMessage.includes('spending-cap') || errMessage.includes('429') || errMessage.includes('quota') || errMessage.includes('Quota') || errMessage.includes('limit')) {
      return NextResponse.json({
        error: 'Ups... kuota penggunaan AI kamu sudah habis nih. Silahkan coba lagi besok yaa 😊'
      }, { status: 429 });
    }
    return NextResponse.json({ error: 'Gagal menganalisis gambar: ' + error.message }, { status: 500 });
  }
}
