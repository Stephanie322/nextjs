import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      status: true,
    });

    // Clear the token cookie globally
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // expire immediately
      path: "/",            // important: clear for all routes
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error?error.message:"Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
