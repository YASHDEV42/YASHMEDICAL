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
    <section className="lg:w-[80vw] w-[90vw] mx-auto h-screen flex flex-col justify-start items-center">
      <h1 className="mt-28 lg:text-6xl md:text-4xl text-2xl font-semibold text-center">
        مرحباً {user.name}
      </h1>
      <div className="flex flex-row justify-center items-center gap-5 mt-16 mb-7">
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
        <div className="flex flex-col justify-center items-center w-56">
          {appointments && appointments.length !== 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="border-2 border-slate-400 p-2 my-2 w-full"
              >
                <p>الطبيب: {appointment.dentist?.name}</p>
                <p>التاريخ: {appointment.date}</p>
                <p>الوقت: {appointment.hour}</p>
                <Link href={`/patient/${appointment._id}`}>المزيد</Link>
              </div>
            ))
          ) : (
            <p>لا يوجد لديك حجوزات</p>
          )}
          <Link
            href="/patient/book-appointment"
            className="p-2 border-2 border-slate-400"
          >
            احجز موعدك
          </Link>
        </div>
      )}
    </section>
  );
};

export default Patient;
