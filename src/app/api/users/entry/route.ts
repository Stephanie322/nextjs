import { NextRequest,NextResponse } from "next/server";
import DiaryEntry from "@/models/diaryEntryModel";
import {connect} from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req:NextRequest){
   try{
    await connect();

    const userId = getDataFromToken(req);

    const {title,content,date}=await req.json();

    if(!content){
        return NextResponse.json({error:"Content required"},{status:400});
    }

    const entry = await DiaryEntry.create({
        userId,
        title,
        content,
        date: date || new Date(),
    });

    return NextResponse.json(entry,{status:201});

   }catch(err:any){
     return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 400 });
   }
}
