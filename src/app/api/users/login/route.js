import Connection from "@/database/config";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

Connection();

export const POST = async (NextRequest) => {
  console.log("login route called");
  try {
    const body = await NextRequest.json();

    const { username, password } = body;

    if (!username || !password) {
      // return new Response("username and password is required", { status: 400});
      return new Response(
        JSON.stringify({ message: "username and password is required" }),
        { status: 400 }
      );
    }
    const user = await User.findOne({ username });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 400 }
        // return new Response("user not found", { status: 400 });
      );
    }
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: "invalid password" }), {
        status: 400,
      });
    }
    // JWT token generation

    const tokenData = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ message: "login successful", token });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ message: "something went worong." }), {
      status: 500,
    });
  }
};
