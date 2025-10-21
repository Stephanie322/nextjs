import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload | string;

    // If decodedToken is a string (unlikely in typical JWT usage), return undefined
    if (typeof decodedToken === "object" && decodedToken !== null) {
      return decodedToken.id;
    } else {
      return undefined;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Token verification failed");
    }
  }
};
