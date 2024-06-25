import { getDataFromToken } from "@/helper/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usermodel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId:any = await getDataFromToken(request);
    const user:any = await User.findOne({ _id: userId }).select("password username email");
    console.log(user,"user")
    return NextResponse.json({
      message: "User Found",
      data:user
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
