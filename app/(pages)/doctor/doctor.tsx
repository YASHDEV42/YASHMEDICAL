"use client";
import { AppointmentType } from "@/types/Appointment";
import { PatientType } from "@/types/User";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Doctor = ({
  user,
  appointments,
}: {
  user: PatientType;
  appointments: AppointmentType[] | [];
}) => {
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
        {/* <button
          onClick={() => setSubPage("patients")}
          className={subPage === "patients" ? "underline" : ""}
        >
          المرضى
        </button> */}
        <button
          onClick={() => setSubPage("appointments")}
          className={subPage === "appointments" ? "underline" : ""}
        >
          الحجوزات
        </button>
      </div>
      {/* {subPage === "patients" && (
        <div>
          {
            <div className=" flex flex-col justify-center items-center gap-4">
              {patients && patients.length !== 0 ? (
                patients.map((patient) => (
                  <div
                    key={patient._id}
                    className="border-2 border-slate-400 p-5 flex flex-col gap-2"
                  >
                    <p>المريض: {patient.name}</p>
                   <Link
                      href={`/doctor/${appointment._id}`}
                      className="flex flex-row"
                    >
                      <ArrowBigLeft />
                      المزيد
                    </Link>
                  </div>
                ))
              ) : (
                <p>لا يوجد مرضى بعد</p>
              )}
            </div>
          }
        </div>
      )} */}
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
        <div className=" flex flex-col justify-center items-center gap-4">
          {appointments && appointments.length !== 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="border-2 border-slate-400 p-5 flex flex-col gap-2"
              >
                <span>{appointment.isNew && "جديد"}</span>
                <p>تاريخ الموعد: {appointment.date}</p>
                <p>الوقت: {appointment.hour}</p>
                <p>المريض: {appointment.patient.name}</p>
                <Link
                  href={`/doctor/${appointment._id}`}
                  className="flex flex-row"
                >
                  <ArrowBigLeft />
                  المزيد
                </Link>
              </div>
            ))
          ) : (
            <p>لا يوجد حجوزات</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Doctor;
