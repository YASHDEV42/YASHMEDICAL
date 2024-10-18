"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [showHamburger, setShowHamburger] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth > 768) {
        setShowHamburger(false);
      } else {
        setShowHamburger(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHamburgerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-[100vw] mx-auto h-16 flex justify-between items-center flex-row fixed top-0 left-0 px-[10vw] bg-slate-50 z-50">
      <h1 className=" text-xl font-semibold">مجمع البشير</h1>
      {showHamburger ? (
        <button className="text-2xl ml-5" onClick={handleHamburgerClick}>
          {isOpen ? <X /> : <Menu />}
        </button>
      ) : (
        <ul className="w-1/3 text-lg font-semibold flex justify-between items-end">
          <li>
            <Link passHref legacyBehavior href="/">
              الرئيسية
            </Link>
          </li>
          <li>
            <Link href="/about" passHref legacyBehavior>
              عن المجمع
            </Link>
          </li>
          <li>
            <Link href="/contact" passHref legacyBehavior>
              اتصل بنا
            </Link>
          </li>
          <li></li>
          <li className=" border-b-2 border-slate-800"></li>
        </ul>
      )}
      {isOpen && (
        <ul className="w-full h-screen bg-slate-50 fixed top-16 left-0 flex flex-col items-center gap-8 justify-center font-semibold text-lg">
          <li>
            <Link href="/" passHref onClick={() => setIsOpen(!isOpen)}>
              الرئيسية
            </Link>
          </li>
          <li>
            <Link href="/about" passHref onClick={() => setIsOpen(!isOpen)}>
              عن المجمع
            </Link>
          </li>
          <li>
            <Link href="/contact" passHref onClick={() => setIsOpen(!isOpen)}>
              اتصل بنا
            </Link>
          </li>
          <li></li>
          <li className=" border-b-2 border-slate-800"></li>
        </ul>
      )}
    </nav>
  );
};
export default Navbar;
