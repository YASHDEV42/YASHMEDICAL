"use client";
import { bookAppointment } from "@/actions/appointment";
import { Calendar } from "@/components/ui/calendar";
import { AppointmentType } from "@/types/Appointment";
import { PatientType } from "@/types/User";
import { ArrowBigLeft } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BookAppointment = ({
  patientDetails,
  doctors,
  appointments,
}: {
  patientDetails: PatientType;
  doctors: PatientType[];
  appointments: AppointmentType[];
}) => {
  const [doctor, setDoctor] = useState<PatientType | null>(doctors[0] || null);
  const [stepsCounter, setStepsCounter] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("تم تأكيد البيانات بنجاح");
    const toastLoading = toast.loading("جاري حجز الموعد");
    console.log(patientDetails);

    if (!doctor || !patientDetails || !date || !hour) return;
    await bookAppointment(null, {
      doctor: doctor as PatientType,
      patient: patientDetails as PatientType,
      date: date as Date,
      hour: hour as string,
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
    <section className="min-h-screen lg:w-[80vw] w-[90vw] mx-auto flex flex-col gap-10 justify-center items-center py-20 ">
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
            <select
              name=""
              id=""
              onChange={handleDoctorChange}
              className="text-right"
            >
              {doctors &&
                doctors.map((doctor: PatientType | null) => (
                  <option key={doctor?._id} value={doctor?.name}>
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
              selected={date}
              onSelect={setDate}
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
              {["10:00", "11:00", "12:00"].map((time) => {
                // Normalize the selected date to "DD/MM/YYYY" format to match your stored appointment format
                const selectedDate = date?.toLocaleDateString("en-GB"); // This formats as 'DD/MM/YYYY'
                console.log("Selected Date:", selectedDate);

                // Check if the appointment hour and doctor match
                const isBooked = appointments.some((appointment) => {
                  // Normalize hour comparison (handles both '10:00' and full Date string formats)
                  const appointmentHour = appointment.hour.includes("GMT") // If it's a full date string, extract time
                    ? new Date(appointment.hour).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : appointment.hour;

                  // Check if the doctor ID matches the currently selected doctor
                  const isSameDoctor = appointment.dentist._id === doctor?._id;

                  // Log for debugging
                  console.log(
                    "Appointment Date:",
                    appointment.date,
                    "Hour:",
                    appointmentHour,
                    "Doctor ID:",
                    appointment.dentist,
                    "Selected Doctor ID:",
                    doctor?._id
                  );

                  return (
                    appointment.date === selectedDate &&
                    appointmentHour === time &&
                    isSameDoctor
                  );
                });

                return (
                  <button
                    key={time}
                    className="px-8 py-1 border-2 border-slate-400 font-semibold"
                    disabled={isBooked || loading}
                    onClick={() => {
                      if (!isBooked) {
                        toast.success("تم اختيار الساعة");
                        setHour(time);
                        setLoading(true);
                        setTimeout(() => {
                          toast.dismiss();
                          setStepsCounter(4);
                          toast("تاكيد الحجز", {
                            icon: "✅",
                            style: {
                              borderRadius: "10px",
                              background: "#fff",
                              color: "#000",
                            },
                            duration: 7000,
                          });
                        }, 2000);
                        setLoading(false);
                      }
                    }}
                  >
                    {time} {isBooked ? "(محجوزة)" : ""}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {stepsCounter === 4 && (
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="lg:text-6xl md:text-4xl text-2xl font-semibold">
              تاكيد الحجز
            </h2>
            <p className="lg:text-lg md:text-base text-sm mb-5">
              الرجاء التأكد من البيانات
            </p>
            <div className="flex flex-col gap-2">
              <p>المريض: {patientDetails?.name}</p>
              <p>الطبيب: {doctor?.name}</p>
              <p>الموعد: {date?.toLocaleDateString()}</p>
              <p>الساعة: {hour}</p>
            </div>
            <form
              className="w-full flex justify-center items-center"
              onSubmit={handleSubmit}
            >
              <button
                className="px-8 py-1 border-2 border-slate-400 font-semibold mt-5"
                type="submit"
              >
                تأكيد
              </button>
            </form>
          </div>
        )}
        {stepsCounter > 1 && (
          <span
            onClick={() => setStepsCounter(stepsCounter - 1)}
            className="cursor-pointer flex flex-row items-center gap-2 justify-center mt-5"
          >
            <ArrowBigLeft />
            السابق
          </span>
        )}
      </div>
    </section>
  );
};

export default BookAppointment;
