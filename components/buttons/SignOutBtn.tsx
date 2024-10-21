import React from "react";
import { SignOut } from "@/actions/authentication";

const SignOutBtn = () => {
  return (
    <form action={SignOut}>
      <button type="submit">تسجيل خروج</button>
    </form>
  );
};

export default SignOutBtn;
