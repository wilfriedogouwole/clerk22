// app/api/generateLetter/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json(); // Récupère les données de la requête POST

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    return NextResponse.json({ result: completion.choices[0].message?.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to generate letter' }, { status: 500 });
  }
}
