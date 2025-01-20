"use client";

import { sendVerificationEmail } from "@/lib/nodemailer";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export const EmailVerificatonButton = ({ email }: { email: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    await sendVerificationEmail({ to: email });
    toast({
      title: "Verification Email Sent",
      description: "Please check your email for the verification link",
    });
    setIsLoading(false);
  };

  return (
    <Button disabled={isLoading} variant={"link"} onClick={handleClick}>
      Click to verify
    </Button>
  );
};
