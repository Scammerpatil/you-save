import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";

dbConfig();

//Adding cors

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Token not found login again" },
      { status: 400 }
    );
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    if (!data) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    const { title, url } = await req.json();
    if (!title || !url) {
      return NextResponse.json(
        { message: "Please provide title and link" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    user.savedLinks.push({ title, url });
    await user.save();
    return NextResponse.json({ message: "Link saved" });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
}
