"use client";

import { useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { useUploadThing } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

// 🔴 CHANGED: Removed 'as const' from the entire object
const endpointConfig = {
  courseImage: {
    // 🔴 CHANGED: Added 'as string[]' to make array mutable (not readonly)
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] as string[],
    },
    maxSize: 4 * 1024 * 1024,
    maxFiles: 1,
    label: "image",
    subtext: "16:9 aspect ratio recommended",
    dropText: "Drop the image here...",
  },
  courseAttachment: {
    accept: {
      // 🔴 CHANGED: Added 'as string[]' on every array
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] as string[],
      "application/pdf": [".pdf"] as string[],
      "text/*": [".txt", ".doc", ".docx"] as string[],
      "video/*": [".mp4", ".mov", ".avi"] as string[],
      "audio/*": [".mp3", ".wav", ".aac"] as string[],
    },
    maxSize: 16 * 1024 * 1024,
    maxFiles: 1,
    label: "file",
    subtext: "Add anything your students need to complete the course",
    dropText: "Drop the file here...",
  },
  chapterVideo: {
    // 🔴 CHANGED: Added 'as string[]'
    accept: { "video/*": [".mp4", ".mov", ".avi", ".mkv"] as string[] },
    maxSize: 512 * 1024 * 1024,
    maxFiles: 1,
    label: "video",
    subtext: "Max 512MB",
    dropText: "Drop the video here...",
  },
  // 🔴 REMOVED: 'as const' that was here before
};

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const config = endpointConfig[endpoint];

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
    accept: config.accept, // 🔴 This now works because arrays are mutable string[]
    maxFiles: config.maxFiles,
    maxSize: config.maxSize,
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
            ? config.dropText
            : isUploading
              ? "Uploading..."
              : "Choose files or drag and drop"}
        </p>

        <p className="text-xs text-gray-500">
          {config.label} ({formatFileSize(config.maxSize)})
        </p>
      </div>

      <p className="mt-2 text-xs text-gray-500">{config.subtext}</p>
    </div>
  );
};

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(0)}GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(0)}MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${bytes}B`;
}
