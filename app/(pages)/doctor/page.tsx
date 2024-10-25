import { auth } from "@/auth";
import User from "@/models/User";
import { PatientType } from "@/types/User";
import React from "react";
import Doctor from "./doctor";
import Appointment from "@/models/Appointment";
import { AppointmentType } from "@/types/Appointment";

const page = async () => {
  const session = await auth();
  const { email } = session?.user as PatientType;
  const user = (await User.findOne({ email })
    .select("+password")
    .lean()) as PatientType;
  const appointments = (await Appointment.find({
    dentist: user._id,
  })
    .populate("patient")
    .lean()) as AppointmentType[] | [];
  return <Doctor user={user} appointments={appointments} />;
};

export default page;
