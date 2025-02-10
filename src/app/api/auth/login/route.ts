import brcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    // find user by email
    const exisitingUser = await User.findOne({ email });
    if (!exisitingUser) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }
    if (!brcyrpt.compareSync(password, exisitingUser.password)) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    } else {
      const data = {
        _id: exisitingUser._id,
        name: exisitingUser.name,
        email: exisitingUser.email,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });
      const response = NextResponse.json({
        message: "Login Successfull",
        exisitingUser,
        route: `user/dashboard`,
        token,
      });
      response.cookies.set("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
      });
      return response;
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
