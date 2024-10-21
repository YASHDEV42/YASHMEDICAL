import React from "react";
import { auth } from "@/auth";
import User from "@/models/User";
import { PatientType } from "@/types/User";
import Patient from "./Patient";

const page = async () => {
  const session = await auth();
  const { email } = session?.user as PatientType;
  const sampleData = await User.findOne({ email }).select("+password");
  const user = JSON.parse(JSON.stringify(sampleData));
  return <Patient user={user} />;
};

export default page;
