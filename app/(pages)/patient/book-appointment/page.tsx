import React from "react";
import BookAppointment from "./BookAppointment";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PatientType } from "@/types/User";
import { Session } from "next-auth";
import User from "@/models/User";
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
  const data: PatientType | null = await User.findOne({
    email: user.email,
  });
  const doctorsData = await User.find({ role: "doctor" });
  const doctors: PatientType[] | null = JSON.parse(JSON.stringify(doctorsData));
  const patientDetails = JSON.parse(JSON.stringify(data));
  return (
    patientDetails &&
    doctors && (
      <BookAppointment patientDetails={patientDetails} doctors={doctors} />
    )
  );
};

export default page;
