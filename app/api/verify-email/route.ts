import jwt from "jsonwebtoken";
import { config } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");
  try {
    const decoded = jwt.verify(token as string, config.env.secret) as {
      email: string;
    };

    if (!decoded) {
      throw new Error("Invalid token");
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, decoded.email))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.redirect(new URL("/sign-up", req.nextUrl));
    }

    await db
      .update(users)
      .set({ isEmailVerified: true })
      .where(eq(users.email, decoded.email));

    // return NextResponse.redirect("/");
    return NextResponse.redirect(new URL("/", req.nextUrl));

    // Mark the user's email as verified in your database
  } catch (error) {
    return NextResponse.json({ message: "Invalid or expired token" });
  }
};
