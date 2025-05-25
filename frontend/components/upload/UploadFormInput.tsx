"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadFormInput = ({ onSubmit }: UploadFormInputProps) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-center items-center gap-1.5">
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required
          className=""
        />
        <Button> Upload your Document </Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
