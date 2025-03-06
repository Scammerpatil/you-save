import dbConfig from "@/middlewares/db.config";
import SavedLinks from "@/models/SavedLinks";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const folder = searchParams.get("folderName");
  if (!id || !folder) {
    return NextResponse.json(
      { message: "Folder name cannot be empty" },
      { status: 400 }
    );
  }
  try {
    const link = await SavedLinks.findById(id);
    if (!link) {
      return NextResponse.json({ message: "Link not found" }, { status: 404 });
    }
    link.folder = folder;
    await link.save();
    return NextResponse.json({ message: "Folder updated successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while updating the folder" },
      { status: 500 }
    );
  }
}
