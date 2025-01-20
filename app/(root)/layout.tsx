import { auth } from "@/auth";
import { EmailVerificatonButton } from "@/components/email-verification-button";
import { Header } from "@/components/header";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendVerificationEmail } from "@/lib/nodemailer";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, session?.user?.email!))
    .limit(1);

  if (user.length === 0) redirect("/sign-up");

  // if (user[0]?.isEmailVerified === false) redirect("/verify-email");

  after(async () => {
    if (!session?.user?.id) return;

    // get the user ans see if the last activity date is today
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (user[0]?.lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session.user.id));
  });

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        {!user[0]?.isEmailVerified && (
          <Alert className="flex items-center justify-between bg-transparent border-primary">
            <AlertTitle className="text-sm text-primary">
              Email is not verified
            </AlertTitle>
            <EmailVerificatonButton email={user[0].email} />
          </Alert>
        )}
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
