"use client";

import React from "react";
import UploadFormInput from "./UploadFormInput";
import { z } from "zod";
import { file, string } from "zod/v4";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import { generatedPdfSummary } from "@/actions/upload-actions";

const UploadForm = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadButton
        endpoint="pdfUploader"
        onClientUploadComplete={async (res) => {
          // Do something with the response

          console.log("===========================");
          const res_final = {
            serverData: {
              userId: res[0].serverData.uploadedBy,
              file: {
                url: res[0].serverData.file,
                name: res[0].name,
              },
            },
          };
          console.log(JSON.parse(JSON.stringify(res_final)));

          const resume = await generatedPdfSummary([res_final]);
          console.log(resume);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default UploadForm;
