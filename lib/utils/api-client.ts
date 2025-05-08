const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface SummarizeResponse {
  summary: string;
}

export async function summarizeText(text: string): Promise<string> {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key is missing");
    }

    if (!text || text.trim().length < 50) {
      throw new Error("Text must be at least 50 characters long");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that summarizes text. Provide a concise summary in 2-3 sentences.",
          },
          {
            role: "user",
            content: `Summarize the following text in 2-3 sentences:\n\n${text}`,
          },
        ],
        max_tokens: 150,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const sentences = text.split(/[.!?]+/).filter(Boolean);
      const fallback = sentences.slice(0, 2).join(". ") + ".";
      return fallback.length > 10
        ? fallback
        : "Summary could not be generated.";
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error summarizing text:", error);
    return "Failed to generate summary. Please try again later.";
  }
}
