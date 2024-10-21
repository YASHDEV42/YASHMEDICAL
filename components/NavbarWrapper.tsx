import { auth } from "@/auth";
import { PatientType } from "@/types/User";
import User from "@/models/User";
import dynamic from "next/dynamic";

import React from "react";
const DynamicNavbar = dynamic(() => import("./Navbar"), {
  ssr: false,
});

const NavbarWrapper = async () => {
  const session = await auth();
  const { email } = session?.user as PatientType;
  const sampleData = await User.findOne({ email }).select("+password");
  const user = JSON.parse(JSON.stringify(sampleData));

  return <DynamicNavbar user={user} />;
};

export default NavbarWrapper;
