import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import { use } from "react";

connect();

export async function GET(request:NextRequest){
    try{
        //get user ID or nickname from the token
        const userId = await getDataFromToken(request);

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

    }catch(error:any){
         console.error("API Error:", error);
         return NextResponse.json({ error: error.message || "Server error" },{status:500});
    }
}