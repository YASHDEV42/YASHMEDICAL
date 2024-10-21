import { auth } from "@/auth";
import User from "@/models/User";
import { PatientType } from "@/types/User";
import React from "react";
import Doctor from "./doctor";

const page = async () => {
  const session = await auth();
  const { email } = session?.user as PatientType;
  const sampleData = await User.findOne({ email }).select("+password");
  const user = JSON.parse(JSON.stringify(sampleData));
  return <Doctor user={user} />;
};

export default page;
