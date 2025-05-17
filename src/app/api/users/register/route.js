import Connection from "@/database/config";
import User from "@/models/user";
import bcryptjs from "bcryptjs";

Connection();

export const POST = async (NextRequest) => {
  try {
    const body = await NextRequest.json();
    const { name, username, password } = body;
    if (!name || !username || !password) {
      return new Response("name, username and password is required", {
        status: 400,
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return new Response("user already exit", { status: 400 });
    }
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return new Response("user created successfully", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
