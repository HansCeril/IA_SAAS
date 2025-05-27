'use server';


import { getDbConnection } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/longchain";
import { generateResumeFromopenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { revalidatePath } from "next/cache";
import { title } from "process";
import { success } from "zod/v4";



interface PdfSummaryType {
    userId?: string,
    fileUrl: string,
    summary: string,
    title: string,
    filename: string
}


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

        let summary;

        try {
            const summary = await generateResumeFromopenAI(pdfText)
            console.log("----------------------")
            console.log(summary)

            const formattedFileName = formatFileNameAsTitle(fileName)

            if (!summary) {
                return {
                    success: false,
                    message: 'Failed generate resume',
                    data: null
                }
            }

            return {
                success: true,
                message: 'Summary generated sucessfully',
                data: {
                    title: formattedFileName,
                    summary,
                }
            }

        } catch(error) {
            console.log(error)
        }
    } catch (err) {
        return {
            success: false,
            message: 'File upload failed',
            data: null
        }
        
    }
}


async function savePdfSummary(
    {
        userId,
        fileUrl,
        summary,
        title,
        filename
    }: 
        PdfSummaryType
    ) {

    try {
        const sql = await getDbConnection();

        await sql`
            INSERT INTO pdf_summaries (
                user_id,
                original_file_url,
                summary_text,
                title,
                file_name
            )
            VALUES (
                ${userId},
                ${fileUrl},
                ${summary},
                ${title},
                ${filename}
            );`

    } catch (error) {
        console.error('Error saving PDF summary', error);
        throw error;
    }
}



export async function storePdfSummaryAction({
    fileUrl,
    summary,
    title,
    filename
    }: PdfSummaryType) {
    
    let saveSummary: any;
    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: 'User not found',
            };
        }

        saveSummary = await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            filename
        });

        if (!saveSummary) {
            return {
                success: false,
                message: 'Failed to save PDF Summary, please try Again',
            };
        }
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error ? error.message :
                    'Error saving PDF summary',
        }
    }

    // Revalidate ou cache
    revalidatePath(`resumes/${saveSummary.id}`);

    return {
        success: true,
        message: 'PDF summary saved successfully',
        data: {
            id: saveSummary.id
        }
    };
}

