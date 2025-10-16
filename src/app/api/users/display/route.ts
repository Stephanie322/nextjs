import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import DiaryEntry from "@/models/diaryEntryModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function POST(request:NextRequest){
    try{
        const userId = await getDataFromToken(request);
        if(!userId){
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }
        const body:{date?:string} = await request.json();
        const dateString = body.date;

        if(!dateString){
            return NextResponse.json({error:"Data is required"},{status:400});
        }
        const queryDate = new Date(dateString);
        const entry = await DiaryEntry.findOne({userId,date:queryDate});

        return NextResponse.json({entry});
    }catch(err:any){
         console.error("API Error:", err);
         return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });

    }
}
