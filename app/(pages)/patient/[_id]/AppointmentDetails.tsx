import { AppointmentType } from "@/types/Appointment";
import { PatientType } from "@/types/User";
import React from "react";

const AppointmentDetails = ({
  user,
  appointment,
}: {
  user: PatientType;
  appointment: AppointmentType;
}) => {
  return (
    <section className="lg:w-[80vw] w-[90vw] mx-auto h-screen flex flex-col justify-center items-center">
      <h1>مرحباً {user.name}</h1>
      <div>
        <p>الاسم: {user.name}</p>
        <p> {user.email} : البريد الالكتروني</p>
        <p> {user.phoneNumber} : رقم الهاتف</p>
        <p> رقم الهوية : {user.ssn}</p>
        <p>
          {" "}
          العمر:{" "}
          {new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()}
        </p>
      </div>
      <div>
        <p>تاريخ الحجز: {appointment.date}</p>
        <p>الوقت: {appointment.hour}</p>
        <p>الدكتور: {appointment.dentist.name}</p>
      </div>
    </section>
  );
};

export default AppointmentDetails;
