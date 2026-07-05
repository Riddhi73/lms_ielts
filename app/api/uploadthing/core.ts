// app/api/uploadthing/core.ts
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      // Empty — don't do anything server-side
      console.log("Server callback: upload by", metadata.userId);
      return { uploadedBy: metadata.userId };
    }),

  courseAttachment: f({
    text: { maxFileSize: "4MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    video: { maxFileSize: "16MB", maxFileCount: 1 },
    audio: { maxFileSize: "8MB", maxFileCount: 1 },
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(async () => {
      return {};
    }),

  chapterVideo: f({
    video: { maxFileCount: 1, maxFileSize: "512MB" },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(async () => {
      return {};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
