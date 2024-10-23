"use client";
import { PatientType } from "@/types/User";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BookAppointment = ({
  patientDetails,
  doctors,
}: {
  patientDetails: PatientType;
  doctors: PatientType[];
}) => {
  const [patient, setPatient] = useState<PatientType | null>(patientDetails);
  const [stepsCounter, setStepsCounter] = useState(0);
  console.log("patient", patient);
  console.log("doctors", doctors);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPatient((prev) => {
      if (!prev) return patientDetails;
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const stepOneHandler = () => {
    toast("ابدأ بتعبئة بياناتك", {
      icon: "👋",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#000",
      },
      duration: 7000,
    });
    setStepsCounter(1);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("تم تأكيد البيانات بنجاح");
    setTimeout(() => {
      toast.dismiss();
      setStepsCounter(2);
      toast("اختر الطبيب", {
        icon: "👋",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#000",
        },
        duration: 7000,
      });
    }, 2000);
  };
  return (
    <section className="min-h-screen lg:w-[80vw] w-[90vw] mx-auto flex flex-col gap-10 justify-center items-center py-20">
      <div className="w-full flex flex-col items-center justify-center">
        {stepsCounter === 0 && (
          <div>
            <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold">
              احجز موعدك
              <p className="lg:text-lg md:text-base text-sm">
                خطوات بسيطة وواضحة
              </p>
            </h1>
            <button
              className="px-8 py-1 border-2 border-slate-400 font-semibold mt-5"
              onClick={stepOneHandler}
            >
              ابدأ
            </button>
          </div>
        )}
        {stepsCounter === 1 && (
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="lg:text-3xl md:text-xl text-lg font-semibold">
              بيانات المريض
            </h2>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center">
                <label htmlFor="name">الاسم</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={patient?.name}
                  onChange={handleInputChange}
                  className="my-input"
                />
              </div>

              <div className="flex flex-col items-center justify-center">
                <label htmlFor="email">البريد الالكتروني</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={patient?.email}
                  className="my-input"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col items-center justify-center">
                <label htmlFor="phoneNumber">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={patient?.phoneNumber}
                  className="my-input"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col items-center justify-center">
                <label htmlFor="ssn">رقم الهوية</label>
                <input
                  type="text"
                  name="ssn"
                  id="ssn"
                  value={patient?.ssn}
                  className="my-input"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col items-center justify-center">
                <label htmlFor="dateOfBirth">تاريخ الميلاد</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={patient?.dateOfBirth}
                  className="my-input"
                  onChange={handleInputChange}
                />
              </div>
              <p className=" text-center mt-5">
                البيانات قد تعود لصاحب الحساب او لمريض اخر
              </p>
              <label
                htmlFor=""
                className="flex flex-row justify-center items-center gap-3 w-full"
              >
                <input
                  type="checkbox"
                  name="confirm"
                  value="confirm"
                  required
                />
                <span className=" font-medium text-sm">
                  اوافق على ان هذه البيانات صحيحة اي غلط تقع مسؤوليته على
                  المستخدم
                </span>
              </label>
              <div className="flex flex-col items-center justify-center">
                <button
                  className="px-8 py-1 border-2 border-slate-400 font-semibold mt-5"
                  type="submit"
                >
                  تأكيد
                </button>
              </div>
            </form>
          </div>
        )}

        {stepsCounter === 2 && (
          <div>
            <h2 className="lg:text-3xl md:text-xl text-lg font-semibold">
              اختر الطبيب
            </h2>

            <select name="" id="">
              {doctors &&
                doctors.map((doctor: PatientType | null) => (
                  <option key={doctor?.id} value={doctor?.name}>
                    {doctor?.name}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookAppointment;
