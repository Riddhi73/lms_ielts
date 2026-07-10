import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// 🔴 REMOVED: Unused import 'error' from "node:console"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }, // 🔴 CHANGED: params is a Promise
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    // 🔴 ADDED: Await params before using
    const { courseId } = await params;

    // 🔴 CHANGED: findUnique → findFirst (findUnique can't filter by userId)
    const ownCourse = await db.course.findFirst({
      where: {
        id: courseId, // 🔴 CHANGED: params.courseId → courseId
        userId: userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
