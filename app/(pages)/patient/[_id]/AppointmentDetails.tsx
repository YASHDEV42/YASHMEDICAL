import { AppointmentType } from "@/types/Appointment";
import { PatientType } from "@/types/User";
import { AlertCircle } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AppointmentDetails = ({
  user,
  appointment,
}: {
  user: PatientType;
  appointment: AppointmentType;
}) => {
  console.log("user", user);
  console.log("appointment", appointment);

  return (
    <section className="lg:w-[80vw] w-[90vw] mx-auto h-screen flex flex-col justify-center items-center text-lg">
      <div className="flex flex-col w-full justify-center items-center gap-2 lg:gap-4">
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold">
          الاسم: {user.name}
        </h2>
        <Dialog>
          <DialogTrigger className="text-lg lg:text-2xl md:text-xl flex flex-row gap-2 justify-center items-center  underline">
            <AlertCircle />
            حالة الموعد : {appointment.status}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl pr-5">
                ما معنى حالة موعدك ؟
              </DialogTitle>
              <DialogDescription className="text-right">
                <p className="font-semibold text-lg">
                  <strong>مكتملة</strong>: تم إنهاء الموعد
                </p>
                <p className="font-semibold text-lg">
                  <strong>مجدول</strong>: لم يتم تأكيد الموعد بعد
                </p>
                <p className="font-semibold text-lg">
                  <strong>مؤكد</strong>: تم تأكيد الموعد من قبل الطبيب
                </p>
                <p className="font-semibold text-lg">
                  <strong>ملغي</strong>: تم إلغاء الموعد من قبل الطبيب
                </p>
                <p className="font-semibold text-lg">
                  <strong>لم يحضر</strong>: لم يتم حضور الموعد من قبل المريض
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {/* <p> {user.email} : البريد الالكتروني</p>
        <p> {user.phoneNumber} : رقم الهاتف</p>
        <p> رقم الهوية : {user.ssn}</p>
        <p>
          {" "}
          العمر:{" "}
          {new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()}
        </p> */}
      </div>
      <div className="flex flex-col gap-1 lg:gap-2 mt-2 lg:mt-4">
        <p className="text-lg lg:text-2xl md:text-xl">
          تاريخ الحجز: {appointment.date}
        </p>
        <p className="text-lg lg:text-2xl md:text-xl">
          الوقت: {appointment.hour}
        </p>
        <p className="text-lg lg:text-2xl md:text-xl">
          {/* to do: put a link to the doctor page with the doctor id */}
          الدكتور: <span className="underline">{appointment.dentist.name}</span>
        </p>
      </div>
    </section>
  );
};

export default AppointmentDetails;
