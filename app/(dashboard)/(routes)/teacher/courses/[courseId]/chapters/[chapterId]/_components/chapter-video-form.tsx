"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react"; // 🔴 REMOVED: unused ImageIcon import
import { useState } from "react"; // 🔴 ADDED: import useState
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client"; // 🔴 REMOVED: unused Course import
import { FileUpload } from "@/app/(dashboard)/_components/file-upload";
import * as z from "zod";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export default function ChapterVideoForm({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) {
  const [isEditing, setEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const router = useRouter();

  const toggleEdit = () => setEditing((current) => !current);

  const onSubmit = async (values: { videoUrl: string }) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      setVideoUrl(values.videoUrl);
      toast.success("Chapter updated");
      setEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost" type="button">
          {isEditing ? (
            "Cancel"
          ) : !videoUrl ? (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div className="relative aspect-video mt-2">
          {videoUrl ? (
            <MuxPlayer playbackId={initialData?.muxData?.playBackId || ""} />
          ) : (
            <div className="flex items-center justify-center h-full bg-slate-200 rounded-md">
              <Video className="h-10 w-10 text-slate-500" />
            </div>
          )}
        </div>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}

      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if the
          video does not appear.
        </div>
      )}
    </div>
  );
}
