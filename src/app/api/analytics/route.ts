import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import SavedLinks from "@/models/SavedLinks";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
  if (!data) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const links = await SavedLinks.find({ user: data._id });

    // **Dynamic Platform Stats**
    const platformStats: Record<string, number> = {};
    links.forEach((link) => {
      platformStats[link.platform] = (platformStats[link.platform] || 0) + 1;
    });

    // **Dynamic Daily Links Count**
    const weeklyLinks: Record<string, number> = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };

    links.forEach((link) => {
      const day = new Date(link.createdAt).toLocaleString("en-US", {
        weekday: "long",
      });
      weeklyLinks[day] = (weeklyLinks[day] || 0) + 1;
    });

    const resData = {
      totalLinks: links.length,
      weeklyLinks,
      platformStats,
    };

    return NextResponse.json(
      { message: "Success", data: resData },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching analytics", error);
    return NextResponse.json(
      { message: "Error fetching analytics" },
      { status: 500 }
    );
  }
}
