import { RESUME_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";


const client = new OpenAI(
    {
        apiKey: process.env.OPENAIKEY
    }
);

export async function generateResumeFromopenAI(pdfText: string) {

    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "system",
                    content: RESUME_SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: `tansform this document into an engaging, easy-to-read \
                        summmary    with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
                }
            ],
            temperature: 0.7,
            max_completion_tokens: 1500
        });
        return completion.choices[0].message.content;

    } catch (error: any) {
        if (error?.status == 429) {
            throw new Error('RATE_LIMIT_EXEEDED')
        }
        throw Error;
    }
    
}



