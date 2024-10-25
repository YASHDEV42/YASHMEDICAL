import React from "react";
import BookAppointment from "./BookAppointment";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PatientType } from "@/types/User";
import { Session } from "next-auth";
import User from "@/models/User";
import Appointment from "@/models/Appointment";
import { AppointmentType } from "@/types/Appointment";
interface UserInterface {
  email: string;
  name: string;
  id: string;
  role: string;
}

const page = async () => {
  const session: Session | null = await auth();
  const user: UserInterface | null = session?.user as UserInterface | null;

  if (!user) {
    redirect("/login");
  }
  const patientDetails = (await User.findOne({
    email: user.email,
  }).lean()) as PatientType | null;

  const doctors = (await User.find({ role: "doctor" }).lean()) as
    | PatientType[]
    | [];

  const appointments = (await Appointment.find().populate("dentist").lean()) as
    | AppointmentType[]
    | [];
  console.log("appointments", appointments);

  return (
    patientDetails &&
    doctors &&
    appointments && (
      <BookAppointment
        patientDetails={patientDetails}
        doctors={doctors}
        appointments={appointments}
      />
    )
  );
};

export default page;
