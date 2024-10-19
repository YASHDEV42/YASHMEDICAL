"use client";
import Link from "next/link";
import React from "react";
import { login } from "@/actions/authentication";
import { useFormState, useFormStatus } from "react-dom";
type RegisterFormState = {
  message: string | null;
};
const initialState: RegisterFormState = {
  message: null,
};
const LoginPage = () => {
  const { pending } = useFormStatus();

  const [state, formAction] = useFormState(login, initialState);

  return (
    <section
      className="
    lg:w-[80vw] w-[90vw] h-screen mx-auto flex flex-col items-center justify-start gap-2 mb-8"
    >
      <div className="h-1/2 w-full flex items-center justify-center">
        <h1 className="lg:text-6xl md:text-4xl text-2xl font-bold">
          تسجيل الدخول
        </h1>
      </div>
      <form
        className="flex flex-col items-center justify-center w-full"
        action={formAction}
      >
        <div className="w-full flex flex-col items-center justify-center">
          <label htmlFor="email">: الايميل</label>
          <input
            className="my-input"
            placeholder=""
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="w-full flex items-center justify-center flex-col">
          <label htmlFor="password">: كلمة المرور</label>
          <input
            className="my-input"
            placeholder=""
            type="password"
            name="password"
            id="password"
          />
        </div>
        {state.message && (
          <p className="text-red-700 text-lg md:text-xl lg:text-2xl font-bold">
            {state.message}
          </p>
        )}
        <div className="flex flex-row items-center justify-center h-full w-full mt-4 gap-4">
          <Link href="/register" className=" text-blue-400 hover:underline">
            انشاء حساب جديد
          </Link>
          <span>أو</span>
          <button
            type="submit"
            className="flex flex-row items-center justify-center gap-2 w-28 h-10 border-2 border-slate-400 rounded-md"
          >
            {pending ? " ...يتم تسجيل الدخول" : "تسجيل الدخول"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
