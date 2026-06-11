import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    const dataFolder = path.join(process.cwd(), "src", "data-rag");

    const files = fs.readdirSync(dataFolder);

    let context = "";

    for (const file of files) {
      if (file.endsWith(".txt")) {
        const filePath = path.join(dataFolder, file);
        const content = fs.readFileSync(filePath, "utf-8");

        context += `
======== ${file} ========

${content}

`;
      }
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
You are Nandan's Portfolio AI Assistant.

Rules:
- Answer only using the provided portfolio information.
- If information is not available, say:
  "I don't have that information in Nandan's portfolio."
- Be concise and professional.
- Answer as if you know Nandan personally.
              `,
            },
            {
              role: "user",
              content: `
PORTFOLIO INFORMATION:

${context}

QUESTION:
${question}
              `,
            },
          ],
          temperature: 0.5,
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      answer:
        data?.choices?.[0]?.message?.content ||
        "Sorry, I could not generate a response.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        answer: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}