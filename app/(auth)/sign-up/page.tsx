"use client";

import { AuthForm } from "@/components/auth-form";
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
    onSubmit={() => {}}
  />
);
export default SignUpPage;
