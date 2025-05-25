"use client";

import React from "react";
import UploadFormInput from "./UploadFormInput";

const UploadForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    console.log("submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // validating the fields

    // Schema with zod

    // upload the file ro uploadthing

    // parse the pdf using langchain

    // resume the doc pdf using openai/geminiAI

    // Save the resume to the database

    // redirect to the [id] reume page
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
