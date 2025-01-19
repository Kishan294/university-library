"use client";

import { AuthForm } from "@/components/auth-form";
import { signInWithCredentails } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validation";
import React from "react";

const SignInPage = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={signInWithCredentails}
  />
);

export default SignInPage;
