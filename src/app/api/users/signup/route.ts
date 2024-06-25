import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sentEmail } from "@/helper/mailer";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    //Check if user already exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    //hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });
    console.log(newUser, "newUser");
    const savedUser = await newUser.save();

    //send verification email

    await sentEmail({email,emailType:'VERIFY',userId:savedUser?._id})

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

connect();
