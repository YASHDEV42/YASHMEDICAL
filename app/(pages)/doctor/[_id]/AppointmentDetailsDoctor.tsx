import { AppointmentType } from "@/types/Appointment";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const AppointmentDetailsDoctor = ({
  appointment,
}: {
  appointment: AppointmentType;
}) => {
  return (
    <section
      className="
    lg:w-[80vw] w-[90vw] mx-auto h-screen flex flex-col justify-center items-center
    "
    >
      <h1>مرحباً {appointment.patient.name}</h1>
      <div>
        <p>الاسم: {appointment.patient.name}</p>
        <p> {appointment.patient.email} : البريد الالكتروني</p>
        <p> {appointment.patient.phoneNumber} : رقم الهاتف</p>
        <p> رقم الهوية : {appointment.patient.ssn}</p>
        <p>
          {" "}
          العمر:{" "}
          {new Date().getFullYear() -
            new Date(appointment.patient.dateOfBirth).getFullYear()}
        </p>
      </div>
      <div>
        <p>تاريخ الحجز: {appointment.date}</p>
        <p>الوقت: {appointment.hour}</p>
      </div>
      <Link
        href="/doctor"
        className="flex flex-row justify-center items-center"
      >
        <ArrowBigRight />
        عودة
      </Link>
    </section>
  );
};

export default AppointmentDetailsDoctor;
