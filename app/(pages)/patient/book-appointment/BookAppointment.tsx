"use client";
import { bookAppointment } from "@/actions/appointment";
import { Calendar } from "@/components/ui/calendar";
import { PatientType } from "@/types/User";
import { redirect } from "next/navigation";
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
  const [doctor, setDoctor] = useState<PatientType | null>(doctors[0] || null);
  const [stepsCounter, setStepsCounter] = useState(0);
  const [date, setDate] = useState<string | null>(null);
  const [hour, setHour] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  console.log("selected doctor", doctor);
  console.log("selected date", date);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("تم تأكيد البيانات بنجاح");
    const toastLoading = toast.loading("جاري حجز الموعد");
    await bookAppointment(null, {
      doctor,
      patient,
      date,
      hour,
    });
    setLoading(true);
    setTimeout(() => {
      toast.dismiss(toastLoading);
      toast.success("تم حجز الموعد بنجاح");
    }, 2000);
    setLoading(false);
  };

  const handleDoctorChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    const selectedDoctor = doctors.find(
      (doctor) => doctor?.name === value
    ) as PatientType;
    setDoctor(selectedDoctor);
  };

  return (
    <section className="min-h-screen lg:w-[80vw] w-[90vw] mx-auto flex flex-col gap-10 justify-center items-center py-20">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {stepsCounter === 0 && (
          <div className="flex flex-col justify-center items-center">
            <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold">
              احجز موعدك
            </h1>
            <p className="lg:text-lg md:text-base text-sm">
              خطوات بسيطة وواضحة
            </p>
            <button
              className="px-8 py-1 border-2 border-slate-400 font-semibold mt-5"
              onClick={() => {
                toast.dismiss();
                setStepsCounter(1);
                toast("اختر الطبيب", {
                  icon: "👨‍⚕️",
                  style: {
                    borderRadius: "10px",
                    background: "#fff",
                    color: "#000",
                  },
                  duration: 7000,
                });
              }}
            >
              ابدأ
            </button>
          </div>
        )}

        {stepsCounter === 1 && (
          <div className="flex flex-col justify-center items-center">
            <h2 className="lg:text-4xl text-2xl font-semibold mb-5">
              اختر الطبيب
            </h2>
            <select name="" id="" onChange={handleDoctorChange}>
              {doctors &&
                doctors.map((doctor: PatientType | null) => (
                  <option key={doctor?.id} value={doctor?.name}>
                    {doctor?.name}
                  </option>
                ))}
            </select>
            <button
              className="px-8 py-1 border-2 border-slate-400 font-semibold mt-5"
              disabled={loading}
              onClick={() => {
                toast.success("تم اختيار الطبيب");
                setLoading(true);
                setTimeout(() => {
                  toast.dismiss();
                  setStepsCounter(2);
                  toast("حدد الموعد", {
                    icon: "🕒",
                    style: {
                      borderRadius: "10px",
                      background: "#fff",
                      color: "#000",
                    },
                    duration: 7000,
                  });
                }, 2000);
                setLoading(false);
              }}
            >
              اختيار
            </button>
          </div>
        )}

        {stepsCounter === 2 && (
          <div className="flex flex-col justify-center items-center">
            <h2 className="lg:text-4xl text-2xl font-semibold mb-5">
              حدد الموعد
            </h2>
            <Calendar
              mode="single"
              disabled={(date) => date < new Date()}
              selected={date ? new Date(date) : new Date()}
              onSelect={(date) =>
                setDate(
                  date?.getFullYear() +
                    "-" +
                    date?.getMonth() +
                    "-" +
                    date?.getDate()
                )
              }
            />
            <button
              className="px-8 py-1 border-2 border-slate-400 font-semibold mt-5"
              disabled={loading}
              onClick={() => {
                toast.success(`تم اختيار الموعد`);
                setLoading(true);
                setTimeout(() => {
                  toast.dismiss();
                  setStepsCounter(3);
                  toast("اختر الساعة", {
                    icon: "🕒",
                    style: {
                      borderRadius: "10px",
                      background: "#fff",
                      color: "#000",
                    },
                    duration: 7000,
                  });
                }, 2000);
                setLoading(false);
              }}
            >
              اختيار
            </button>
          </div>
        )}
        {stepsCounter === 3 && (
          <div className="flex flex-col justify-center items-center gap-4">
            <h2>اختر الساعة</h2>
            <div className="flex flex-row justify-center items-center gap-4">
              <button
                className="px-8 py-1 border-2 border-slate-400 font-semibold"
                disabled={loading}
                onClick={() => {
                  toast.success("تم اختيار الساعة");
                  setHour("10:00");
                  setLoading(true);
                  setTimeout(() => {
                    toast.dismiss();
                    setStepsCounter(4);
                    toast("قم بادخال بيانات المريض", {
                      icon: "👋",
                      style: {
                        borderRadius: "10px",
                        background: "#fff",
                        color: "#000",
                      },
                      duration: 7000,
                    });
                  }, 2000);
                  setLoading(false);
                }}
              >
                10:00
              </button>
              <button
                className="px-8 py-1 border-2 border-slate-400 font-semibold"
                onClick={() => {
                  toast.success("تم اختيار الساعة");
                  setHour("11:00");
                  setTimeout(() => {
                    toast.dismiss();
                    setStepsCounter(4);
                    toast("قم بادخال بيانات المريض", {
                      icon: "👋",
                      style: {
                        borderRadius: "10px",
                        background: "#fff",
                        color: "#000",
                      },
                      duration: 7000,
                    });
                  }, 2000);
                }}
              >
                11:00
              </button>
              <button
                className="px-8 py-1 border-2 border-slate-400 font-semibold"
                onClick={() => {
                  toast.success("تم اختيار الساعة");
                  setHour("12:00");
                  setTimeout(() => {
                    toast.dismiss();
                    setStepsCounter(4);
                    toast("قم بادخال بيانات المريض", {
                      icon: "👋",
                      style: {
                        borderRadius: "10px",
                        background: "#fff",
                        color: "#000",
                      },
                      duration: 7000,
                    });
                  }, 2000);
                }}
              >
                12:00
              </button>
            </div>
          </div>
        )}
        {stepsCounter === 4 && (
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
      </div>
    </section>
  );
};

export default BookAppointment;
