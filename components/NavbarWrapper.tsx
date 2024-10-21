import { auth } from "@/auth";
import { PatientType } from "@/types/User";
import User from "@/models/User";
import dynamic from "next/dynamic";

import React from "react";
import connectDB from "@/lib/db";
const DynamicNavbar = dynamic(() => import("./Navbar"), {
  ssr: false,
});

const NavbarWrapper = async () => {
  await connectDB();
  const session = await auth();
  console.log("auth()", await auth());

  console.log("session from navbarwrapper", session);
  const { email } = (session?.user as PatientType) || {};
  console.log();

  const sampleData =
    (await User.findOne({ email }).select("+password")) || null;
  const user = JSON.parse(JSON.stringify(sampleData));

  return <DynamicNavbar user={user} />;
};

export default NavbarWrapper;
