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
  const data: PatientType | null = await User.findOne({ email: user.email });
  const patientDetails = JSON.parse(JSON.stringify(data));

  const doctorsData = await User.find({ role: "doctor" });
  const doctors: PatientType[] | null = JSON.parse(JSON.stringify(doctorsData));

  const appointmentsData = await Appointment.find();
  const appointments: AppointmentType[] | null = JSON.parse(
    JSON.stringify(appointmentsData)
  );
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
