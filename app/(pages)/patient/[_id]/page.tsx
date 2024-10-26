import { auth } from "@/auth";
import Appointment from "@/models/Appointment";
import User from "@/models/User";
import { PatientType } from "@/types/User";
import { Session } from "next-auth";
import React from "react";
import AppointmentDetails from "./AppointmentDetails";
import { AppointmentType } from "@/types/Appointment";

const page = async ({ params }: { params: { _id: string } }) => {
  const _id: string = params._id;
  const session = (await auth()) as Session;
  const { email } = session?.user as PatientType;
  const user = (await User.findOne({ email })
    .select("+password")
    .lean()) as PatientType | null;
  if (!user) {
    return null;
  }
  const appointment = (await Appointment.findOne({
    _id,
  })
    .populate("dentist")
    .lean()) as AppointmentType;

  return <AppointmentDetails user={user} appointment={appointment} />;
};

export default page;
