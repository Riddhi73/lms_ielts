"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      console.log("Upload complete:", res);
      onChange(res?.[0]?.ufsUrl);
      setIsUploading(false);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      toast.error(error.message);
      setIsUploading(false);
    },
    onUploadBegin: (name) => {
      console.log("Upload started:", name);
      setIsUploading(true);
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log("Files dropped:", acceptedFiles);
      if (acceptedFiles.length > 0) {
        startUpload(acceptedFiles);
      }
    },
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 4 * 1024 * 1024, // 4MB
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-slate-100 px-6 py-10 hover:bg-slate-200 transition-colors"
      >
        <input {...getInputProps()} />

        <svg
          className="mb-3 h-10 w-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <p className="text-center text-sm font-medium text-blue-600">
          {isDragActive
            ? "Drop the image here..."
            : isUploading
              ? "Uploading..."
              : "Choose files or drag and drop"}
        </p>

        <p className="text-xs text-gray-500">image (4MB)</p>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        16:9 aspect ratio recommended
      </p>
    </div>
  );
};
