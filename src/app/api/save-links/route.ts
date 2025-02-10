import dbConfig from "@/middlewares/db.config";
import { NextRequest, NextResponse } from "next/server";

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
  const { email, savedLinks } = await req.json();
  console.log(email, savedLinks);
}
