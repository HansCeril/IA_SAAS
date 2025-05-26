'use server';


import { fetchAndExtractPdfText } from "@/lib/longchain";
import { generateResumeFromopenAI } from "@/lib/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { success } from "zod/v4";

export async function generatedPdfSummary(uploadResponse: [{
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string
        };
    };
}]) {

    if (!uploadResponse) {
        return {
            success: false,
            message: 'File upload failed',
            data: null
        }
    }

    const {
        serverData: {
            userId,
            file: {url: pdfUrl, name: fileName}
        },
    } = uploadResponse[0];

    if (!pdfUrl) {
        return {
            success: false,
            message: 'File upload failed',
            data: null
        }
    }

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log("*****************")
        console.log(pdfText)

        try {
            const resume = await generateResumeFromopenAI(pdfText)
            console.log("----------------------")
            console.log(resume)

            

            if(resume) {
                alert(" AI finished to resume your dcument, we are saving your resume.")

            }
        } catch(error) {
            console.log(error)
            return {
                success: false,
                message: 'Failed generate resume',
                data: null
            }

        }


    } catch (err) {
        return {
            success: false,
            message: 'File upload failed',
            data: null
        }
        
    }
}