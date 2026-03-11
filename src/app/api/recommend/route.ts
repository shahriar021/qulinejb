import { NextRequest, NextResponse } from "next/server";

const FREE_MODELS = [
  "openrouter/free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "google/gemma-3-4b-it:free",
  "mistralai/mistral-7b-instruct:free",
];

export async function POST(req: NextRequest) {
  const { mood } = await req.json();

  for (const model of FREE_MODELS) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "user",
              content: `You are a movie expert. Based on this mood: "${mood}", recommend 5 movies.
              Return ONLY a JSON array, nothing else:
              [{"title": "Movie Name", "year": 2020, "reason": "why it matches the mood", "genre": "Action"}]`,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) continue; // try next model

      const text = data.choices[0].message.content;
      const clean = text.replace(/```json|```/g, "").trim();
      const movies = JSON.parse(clean);
      return NextResponse.json({ movies });
    } catch {
      continue; // try next model
    }
  }

  return NextResponse.json({ error: "All models failed, try again." }, { status: 500 });
}
