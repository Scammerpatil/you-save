import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import SavedLinks from "@/models/SavedLinks";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      _id: string;
    };
    if (!data) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const links = await SavedLinks.find({ user: data._id });
    return NextResponse.json({ links }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!!!" },
      { status: 500 }
    );
  }
}
