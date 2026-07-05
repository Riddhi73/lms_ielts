import { UTApi } from "uploadthing/server";
import { NextResponse } from "next/server";

const utapi = new UTApi();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    console.log("Uploading file:", file.name, file.size, file.type);

    const res = await utapi.uploadFiles(file);
    console.log("UTApi response:", res);

    const url = res.data?.ufsUrl || res.data?.url;

    if (!url) {
      return new NextResponse("No URL returned", { status: 500 });
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload API error:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Upload failed",
      { status: 500 },
    );
  }
}
