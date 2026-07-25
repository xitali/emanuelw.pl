import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nie przesłano pliku" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize extension and generate unique filename
    const ext = path.extname(file.name) || ".png";
    const cleanExt = ext.toLowerCase();
    const filename = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${cleanExt}`;
    const uploadDir = path.join(process.cwd(), "public", "projects");

    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/projects/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Błąd podczas przesyłania pliku" }, { status: 500 });
  }
}
