"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { ratelimit } from "../rate-limit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import { config } from "../config";

export const signInWithCredentails = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return redirect("/too-fast");
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log({ error });
    return { success: false, error: "Signin error" };
  }
};

export const signUp = async (
  params: AuthCredentials
): Promise<{ success: boolean; error?: string }> => {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return redirect("/too-fast");
  }

  const { fullname, email, university_id, university_card, password } = params;

  // if existing user

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullname,
      email,
      university_id,
      university_card,
      password: hashedPassword,
    });

    await workflowClient.trigger({
      url: `${process.env.NODE_ENV === "development" ? config.env.apiEndpoint : config.env.prodApiEndpoint}/api/workflow/onboarding`,
      body: {
        email,
        fullname,
      },
    });

    await signInWithCredentails({ email, password });

    return { success: true };
  } catch (error) {
    console.log({ error });
    return { success: false, error: "Signup error" };
  }
};
