"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/app/(dashboard)/_components/file-upload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

export default function ImageForm({ initialData, courseId }: ImageFormProps) {
  const [isEditing, setEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const router = useRouter();

  const toggleEdit = () => setEditing((current) => !current);

  const onSubmit = async (values: { imageUrl: string }) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      setImageUrl(values.imageUrl); // Update local state immediately
      toast.success("Course updated");
      setEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost" type="button">
          {isEditing ? (
            <>Cancel</>
          ) : !imageUrl ? (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div className="relative aspect-video mt-2">
          {imageUrl ? (
            <Image
              alt="Course image"
              fill
              className="object-cover rounded-md"
              src={imageUrl}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-slate-200 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          )}
        </div>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
}
