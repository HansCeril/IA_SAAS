import { FileText } from "lucide-react";
import React from "react";

const EmptySummaries = () => {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-4">
        <FileText className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-600"> No resume yet </h2>
        <p className="text-gray-500 max-w-md"> Upload your first PDF</p>
      </div>
    </div>
  );
};

export default EmptySummaries;
