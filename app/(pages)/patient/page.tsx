import React from "react";
import { auth } from "@/auth";
import User from "@/models/User";
import { PatientType } from "@/types/User";
import Patient from "./Patient";
import Appointment from "@/models/Appointment";
import { AppointmentType } from "@/types/Appointment";

const page = async () => {
  const session = await auth();
  const { email } = session?.user as PatientType;
  const user = (await User.findOne({ email })
    .select("+password")
    .lean()) as PatientType;
  const appointments = (await Appointment.find({
    patient: user._id,
  })
    .populate("dentist")
    .lean()) as AppointmentType[];
  return <Patient user={user} appointments={appointments} />;
};

export default page;
