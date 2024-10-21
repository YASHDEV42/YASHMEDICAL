"use client";
import { PatientType } from "@/types/User";
import React, { useState } from "react";

const Doctor = ({ user }: { user: PatientType }) => {
  const [subPage, setSubPage] = useState<
    "patients" | "appointments" | "settings"
  >("appointments");
  return (
    <section className="lg:w-[80vw] w-[90vw] mx-auto h-screen flex flex-col justify-start items-center">
      <h1 className="mt-28 lg:text-6xl md:text-4xl text-2xl font-semibold text-center">
        مرحبا د.{user.name}
      </h1>
      <div className="flex flex-row justify-center items-center gap-5 mt-16 mb-7">
        <button
          onClick={() => setSubPage("settings")}
          className={subPage === "settings" ? "underline" : ""}
        >
          البيانات الشخصية
        </button>
        <button
          onClick={() => setSubPage("patients")}
          className={subPage === "patients" ? "underline" : ""}
        >
          المرضى
        </button>
        <button
          onClick={() => setSubPage("appointments")}
          className={subPage === "appointments" ? "underline" : ""}
        >
          الحجوزات
        </button>
      </div>
      {subPage === "patients" && (
        <div>
          <p>المرضى</p>
        </div>
      )}
      {subPage === "settings" && (
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
      )}
      {subPage === "appointments" && (
        <div>
          <p>ليس لديك حجوزات حالياً</p>
        </div>
      )}
    </section>
  );
};

export default Doctor;
