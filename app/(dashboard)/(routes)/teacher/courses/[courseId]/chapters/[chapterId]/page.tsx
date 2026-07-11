import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { IconBadge } from "@/app/(dashboard)/_components/icon-badge";
import ChapterTitleForm from "./_components/chapter-title-form";

const ChapterIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>; // 🔴 CHANGED: params is a Promise
}) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  // 🔴 ADDED: Await params before accessing properties
  const { courseId, chapterId } = await params;

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId, // 🔴 CHANGED: params.chapterId → chapterId
      courseId: courseId, // 🔴 CHANGED: params.courseId → courseId
    },
    include: { muxData: true },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionFields = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${courseId}`} // 🔴 CHANGED: params.courseId → courseId
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to course setup
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Chapter Creation</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completionFields}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your chapters</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={(await params).courseId}
              chapterId={(await params).chapterId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
