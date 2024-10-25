import Appointment from "@/models/Appointment";
import React from "react";
import AppointmentDetailsDoctor from "./AppointmentDetailsDoctor";
import { AppointmentType } from "@/types/Appointment";

const page = async ({ params }: { params: { _id: string } }) => {
  const _id = params._id;
  await Appointment.findByIdAndUpdate(_id, { isNew: false });
  const appointment = (await Appointment.findOne({
    _id,
  })
    .populate("patient")
    .lean()) as AppointmentType;
  return <AppointmentDetailsDoctor appointment={appointment} />;
};

export default page;
