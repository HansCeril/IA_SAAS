"use client";

import React from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface DownloadSummaryButtonprops {
  title: string;
  summaryText: string;
  fileName: string;
  createdAt: string;
}

const DownloadSummaryButton = ({
  title,
  summaryText,
  fileName,
  createdAt,
}: DownloadSummaryButtonprops) => {
  const handleDownload = () => {
    const summaContent = `# ${title}
Generated Summary
Generated on: ${new Date(createdAt).toLocaleDateString()}

${summaryText}

orignal File: ${fileName}

Generated by ResumeAI
    `;

    const blob = new Blob([summaContent], { type: "text/plain" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Resume-${title.replace(/[^a-z0-9]/gi, "_")}.txt`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };
  return (
    <Button
      size={"sm"}
      className="h-8 px-3 bg-rose-400 text-shadow-rose-600
        hover:text-rose-700 hover:bg-rose-100"
      onClick={handleDownload}
    >
      <Download className="h-4 w-4 mr-1" />
      Download summary Text{" "}
    </Button>
  );
};

export default DownloadSummaryButton;
