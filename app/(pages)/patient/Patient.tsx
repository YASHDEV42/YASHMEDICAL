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
    <section className="lg:w-[80vw] w-[90vw] h-screen flex flex-col justify-start items-center">
      <h1
        className="mt-28
      lg:text-6xl md:text-4xl text-2xl font-semibold text-center
      "
      >
        مرحباً {user.name}
      </h1>
      <div className="flex flex-row justify-center items-center gap-5 mt-7 mb-3">
        <button
          onClick={() => setSubPage("settings")}
          className={subPage === "settings" ? "underline" : ""}
        >
          البيانات الشخصية
        </button>
        <button
          onClick={() => setSubPage("appointments")}
          className={subPage === "appointments" ? "underline" : ""}
        >
          الحجوزات
        </button>
      </div>

      {subPage === "settings" ? (
        <div>
          <p>الاسم: {user.name}</p>
          <p> {user.email} : البريد الالكتروني</p>
          <p> {user.phoneNumber} : رقم الهاتف</p>
          <p> رقم الهوية : {user.ssn}</p>
          <p>
            {" "}
            العمر:{" "}
            {new Date().getFullYear() -
              new Date(user.dateOfBirth).getFullYear()}
          </p>
        </div>
      ) : (
        <div>
          <p>ليس لديك حجوزات حالياً</p>
        </div>
      )}
    </section>
  );
};

export default Patient;
