import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";


connect();

export async function GET(request:NextRequest){
    try{
        //get user ID or nickname from the token
        const userId = await getDataFromToken(request);
         console.log(userId);

        if(!userId){
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }
        const user = await User.findById(userId).select("-password"); //find user in the db
        if(!user){
             return NextResponse.json({error:"user not found"},{status:404});

        }
        return NextResponse.json({
            message: "User Found",
            data:user,
        });

    }catch(error:unknown){
        const message = error instanceof Error?error.message:"Server error";
         console.error("API Error:", error);
         return NextResponse.json({ error:message},{status:500});
    }
}