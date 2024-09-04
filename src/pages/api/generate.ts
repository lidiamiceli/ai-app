import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  if (!process.env.NEXT_PUBLIC_GEMINI_KEY) {
    return res.status(500).json({ error: 'API key not found' });
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key= ${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: {
            text: prompt,
          },
        }),
      }
    );

    const data = await response.json();
    res.status(200).json({ text: data?.candidates?.[0]?.output ?? 'No output' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating content' });
  }
}
