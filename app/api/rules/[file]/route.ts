import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(_: Request, { params }: { params: { file: string } }) {
  const fileName = params.file;
  if (!/^[a-z-]+\.yml$/i.test(fileName)) {
    return new NextResponse("Invalid file", { status: 400 });
  }
  const filePath = path.join(process.cwd(), "rules", fileName);
  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const content = await fs.promises.readFile(filePath, "utf8");
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/yaml",
      "Cache-Control": "public, max-age=60"
    }
  });
}
