import React from "react";

const UploadHeader = () => {
  return (
    <div className="felx flex-col items-center justify-center gap-6 text-center">
      <div className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        <h1>
          <span className="relative inline-block bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Start Uploading your document
          </span>
        </h1>
        <p className="py-10"> Upload your document and let's AI resume it </p>
      </div>
    </div>
  );
};

export default UploadHeader;
