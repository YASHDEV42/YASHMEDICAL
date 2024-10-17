import Link from "next/link";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="w-[80vw] mx-auto h-16 flex justify-between items-center flex-row fixed top-0 left-[10vw]">
      <h1 className=" text-xl font-semibold">مجمع البشير</h1>
      <ul className="w-1/3 text-lg font-semibold flex justify-between items-end">
        <li>
          <Link href="/">الرئيسية</Link>
        </li>
        <li>
          <Link href="/about">عن المجمع</Link>
        </li>
        <li>
          <Link href="/contact">اتصل بنا</Link>
        </li>
        <li>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </li>
        <li className=" border-b-2 border-slate-800">
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
