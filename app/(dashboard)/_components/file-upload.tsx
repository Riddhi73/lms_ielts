"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFiles } from "@/lib/uploadthing";
import { UploadCloud, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: "courseImage" | "courseAttachment" | "chapterVideo";
}

export default function FileUpload({ onChange, endpoint }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      setIsUploading(true);
      try {
        const res = await uploadFiles(endpoint, {
          files: acceptedFiles,
        });

        const url = res[0]?.url;
        if (url) {
          onChange(url);
        }
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [endpoint, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    disabled: isUploading,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center w-full min-h-40 rounded-xl border-2 border-dashed p-6 gap-3 cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:bg-accent/30 hover:border-primary/50",
        isUploading && "opacity-50 pointer-events-none",
      )}
    >
      <input {...getInputProps()} />

      {isUploading ? (
        <>
          <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          <p className="text-sm font-medium text-foreground">Uploading...</p>
        </>
      ) : (
        <>
          <div className="p-2.5 rounded-full bg-primary/10">
            <UploadCloud
              className={cn(
                "h-6 w-6 transition-colors",
                isDragActive ? "text-primary" : "text-muted-foreground",
              )}
            />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm font-medium text-foreground">
              {isDragActive ? "Drop it here" : "Drag & drop your image"}
            </p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
          </div>
        </>
      )}
    </div>
  );
}
