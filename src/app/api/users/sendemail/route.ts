import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer"; // your mailer.ts

connect();

console.log("sendemail route loaded");

export async function POST(request: NextRequest) {
  try {
    const { email, emailType } = await request.json();

    if (!email || !emailType) {
      return NextResponse.json(
        { error: "Email and emailType are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Call the mailer
    await sendEmail({ email, emailType, userId: user._id });

    return NextResponse.json({
      success: true,
      message: `Email sent to ${email} successfully`,
    });
  } catch (err: any) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
