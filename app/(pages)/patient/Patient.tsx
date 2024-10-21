"use client";
import { PatientType } from "@/types/User";
import React from "react";

type Props = {
  user: PatientType;
};

const Patient = (props: Props) => {
  const user = props.user;
  const [subPage, setSubPage] = React.useState<"settings" | "appointments">(
    "appointments"
  );

  return (
    <section className="lg:w-[80vw] w-[90vw] h-screen flex flex-col justify-center items-center">
      <h1
        className="
      lg:text-6xl md:text-4xl text-2xl font-semibold text-center
      "
      >
        مرحباً {user.name}
      </h1>
      <p>هذه الصفحة مخصصة للمرضى</p>
      <div>
        <button onClick={() => setSubPage("settings")}>اعدادات الحساب</button>
        <button onClick={() => setSubPage("appointments")}>الحجوزات</button>
      </div>
      {subPage === "settings" ? (
        <div>
          <h2>اعدادات الحساب</h2>
          <p>الاسم: {user.name}</p>
          <p> {user.email}: البريد الالكتروني</p>
        </div>
      ) : (
        <div>
          <h2>الحجوزات</h2>
          <p>ليس لديك حجوزات حالياً</p>
        </div>
      )}
    </section>
  );
};

export default Patient;
