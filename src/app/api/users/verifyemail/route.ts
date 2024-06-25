import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { redirect } from "next/navigation";
import { NextRequest,NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest){
    try{
        const requeBody = await request.json()

        const {token}= requeBody

        console.log(token)
       const user= await User.findOne({verifyToken:token,verifyTokenexpiry:{$gt:Date.now()}})

       if(!user){
        return NextResponse.json({error:"Invalid Token",status:400})
       }

       console.log(user)

       user.isVerified=true;
       user.verifyToken=undefined
       user.verifyTokenexpiry=undefined

       await user.save()

       return NextResponse.redirect('/login')

    }catch(error:any){
        return NextResponse.json({error:error.message,status:500})

    }
}