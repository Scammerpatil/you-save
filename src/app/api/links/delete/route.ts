import SavedLinks from "@/models/SavedLinks";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Link not found" }, { status: 404 });
  }
  try {
    await SavedLinks.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Link deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while deleting the link" },
      { status: 500 }
    );
  }
}
