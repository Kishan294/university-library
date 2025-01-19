"use client";

import { AuthForm } from "@/components/auth-form";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validation";

const SignUpPage = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullname: "",
      university_id: 0,
      university_card: "",
    }}
    onSubmit={signUp}
  />
);
export default SignUpPage;
