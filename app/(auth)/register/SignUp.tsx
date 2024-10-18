"use client";
import Link from "next/link";
import { register } from "@/actions/authentication";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
const initialState = {
  message: null,
};
const SignUp = () => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(register as any, initialState);

  return (
    <section className="lg:w-[80vw] w-[90vw] mx-auto flex flex-col items-center justify-center gap-2 mb-8">
      <div className="h-1/2 w-full flex items-center justify-center mb-8 mt-20">
        <h1 className="lg:text-6xl md:text-4xl text-2xl font-bold mb-9">
          انشاء حساب جديد
        </h1>
      </div>
      <form
        className="flex flex-col justify-center items-center  w-full"
        action={formAction}
      >
        <div className="w-full flex items-center justify-center flex-col">
          <label htmlFor="name" className="my-label">
            : الاسم
          </label>
          <input
            className="my-input"
            placeholder=""
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="w-full flex items-center justify-center flex-col">
          <label htmlFor="ssn" className="my-label">
            : رقم الاقامة
          </label>
          <input
            className="my-input"
            placeholder=""
            type="text"
            name="ssn"
            id="ssn"
          />
        </div>
        <div className="w-full flex items-center justify-center flex-col">
          <label htmlFor="date_of_birth" className="my-label">
            : تاريخ الميلاد
          </label>
          <input
            className="my-input"
            placeholder="day/month/year"
            type="text"
            name="date_of_birth"
            id="date_of_birth"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
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
          <label htmlFor="confirmPassword">: تاكيد كلمة المرور</label>
          <input
            className="my-input"
            placeholder=""
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
          <label htmlFor="phone_number">: رقم الجوال</label>
          <input
            className="my-input"
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder="996 888 888 88 88"
            maxLength={12}
            required
          />
        </div>
        {state.message && (
          <p className="text-red-700 text-lg md:text-xl lg:text-2xl font-bold">
            {state.message}
          </p>
        )}
        <div className="flex flex-row items-center justify-center h-full w-full mt-4 gap-4">
          <Link href="/login" className=" text-blue-400 hover:underline">
            تسجيل الدخول
          </Link>
          <span>أو</span>
          <button
            type="submit"
            className="flex flex-row items-center justify-center gap-2 w-28 h-10 border-2 border-slate-400 rounded-md"
          >
            {pending ? "جاري اشاء حساب" : "انشاء حساب"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
