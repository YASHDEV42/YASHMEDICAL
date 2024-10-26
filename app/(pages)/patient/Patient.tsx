"use client";
import { AppointmentType } from "@/types/Appointment";
import { PatientType } from "@/types/User";
import Link from "next/link";
import React from "react";

type Props = {
  user: PatientType;
  appointments: AppointmentType[] | [];
};

const Patient = (props: Props) => {
  const user = props.user;
  console.log("user with multiple populates", user);

  const appointments = props.appointments;
  console.log(appointments);

  const [subPage, setSubPage] = React.useState<"settings" | "appointments">(
    "appointments"
  );

  return (
    <section className="lg:w-[80vw] w-[90vw] mx-auto py-28 min-h-screen flex flex-col justify-start items-center">
      <h1 className="lg:text-6xl md:text-4xl text-2xl font-semibold text-center">
        مرحباً {user.name}
      </h1>
      <div className="flex flex-row justify-center items-center gap-5 mt-16 mb-7">
        <button
          onClick={() => setSubPage("settings")}
          className={
            subPage === "settings" ? "primary-btn underline" : "secondary-btn"
          }
        >
          البيانات الشخصية
        </button>
        <button
          onClick={() => setSubPage("appointments")}
          className={
            subPage === "appointments"
              ? "primary-btn underline"
              : "secondary-btn"
          }
        >
          الحجوزات
        </button>
      </div>

      {subPage === "settings" ? (
        <div className=" text-lg flex flex-col gap-3 items-end justify-center">
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
        <div className="flex lg:flex-row flex-wrap flex-col justify-center items-center gap-10 lg:w-full w-56">
          {appointments && appointments.length !== 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="border-2 border-slate-400 p-2 lg:w-1/4 w-full h-40 flex flex-col gap-2 justify-center items-end rounded-md shadow-md
                hover:scale-105 hover:border-slate-800 transform transition-transform  duration-300 ease-in-out"
              >
                <p className="font-semibold">
                  الطبيب: {appointment.dentist?.name}
                </p>
                <p className=" italic opacity-90">
                  التاريخ: {appointment.date}
                </p>
                <p>الساعة: {appointment.hour}</p>
                <Link
                  href={`/patient/${appointment._id}`}
                  className="secondary-btn"
                >
                  المزيد
                </Link>
              </div>
            ))
          ) : (
            <p>لا يوجد لديك حجوزات</p>
          )}
        </div>
      )}
      <Link href="/patient/book-appointment" className="primary-btn mt-10">
        احجز موعد
      </Link>
    </section>
  );
};

export default Patient;
