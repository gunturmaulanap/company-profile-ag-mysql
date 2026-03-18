import { randomUUID } from "node:crypto";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const runtime = "nodejs";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

function getExtensionFromMime(mime: string): string | null {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return null;
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const rawFile = formData.get("file");

  if (!(rawFile instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.has(rawFile.type)) {
    return NextResponse.json(
      { error: "Unsupported image type" },
      { status: 415 },
    );
  }

  if (rawFile.size <= 0 || rawFile.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: "Invalid file size (max 5MB)" },
      { status: 400 },
    );
  }

  const extension = getExtensionFromMime(rawFile.type);
  if (!extension) {
    return NextResponse.json({ error: "Invalid extension" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const safeFilename = `${Date.now()}-${randomUUID()}.${extension}`;
  const fullFilePath = path.join(uploadDir, safeFilename);

  const buffer = Buffer.from(await rawFile.arrayBuffer());
  await writeFile(fullFilePath, buffer);

  const url = `/uploads/${safeFilename}`;
  return NextResponse.json({ url }, { status: 201 });
}
