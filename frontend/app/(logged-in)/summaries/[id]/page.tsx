import SourceInfo from "@/components/summaries/SourceInfo";
import SummaryHeaders from "@/components/summaries/SummaryHeaders";
// import SummaryViewer from "@/components/summaries/SummaryViewer";
import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";
import React from "react";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  const summary = await getSummaryById(id);

  if (!summary) {
    return notFound();
  }

  const pages = [
    "This is the first page of the summary. It contains the introduction and main points of the document.",
    "Second page continues with more detailed analysis and key findings from the document.",
    "The third page presents conclusions and recommendations based on the document analysis.",
    "Final page wraps up the summary with additional notes and references if needed.",
  ];
  const { title, summary_text, file_name, created_at, original_file_url } =
    summary;

  return (
    <div className="relative isolate min--h-screen bg-linear-to-b from-rose-50/40 to-blue-100">
      <div className="container mx-auto flex flex-col gapt4">
        <div className="px-4 sm:px-6 lg:px-8 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeaders title={title} created_at={created_at} />
          </div>
          {file_name && (
            <SourceInfo
              fileName={file_name}
              title={title}
              summaryText={summary_text}
              createdAt={created_at}
              originalFileUrl={original_file_url}
            />
          )}
          <div className="relative mt-8 sm:mt-6 flex justify-center">
            {/* <SummaryViewer summary={summary_text} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
