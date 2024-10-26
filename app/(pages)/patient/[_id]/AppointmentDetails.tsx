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
      <div>
        <p className=" text-2xl font-semibold">الاسم: {user.name}</p>
        <p>
          حالة الموعد : {appointment.status} <AlertCircle />
        </p>
        <Dialog>
          <DialogTrigger>ما معنى حالة موعدك ؟</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-right pr-5">
                ما معنى حالة موعدك ؟
              </DialogTitle>
              <DialogDescription className="text-right">
                <p>
                  <strong>مؤكد</strong>: تم تأكيد الموعد من قبل الطبيب
                </p>
                <p>
                  <strong>ملغي</strong>: تم إلغاء الموعد من قبل المريض
                </p>
                <p>
                  <strong>مؤجل</strong>: تم تأجيل الموعد من قبل الطبيب
                </p>

                <p>
                  <strong>مجدول</strong>: لم يتم تأكيد الموعد بعد
                </p>

                <p>
                  <strong>مكتملة</strong>: تم إنهاء الموعد
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <p> {user.email} : البريد الالكتروني</p>
        <p> {user.phoneNumber} : رقم الهاتف</p>
        <p> رقم الهوية : {user.ssn}</p>
        <p>
          {" "}
          العمر:{" "}
          {new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()}
        </p>
      </div>
      <div>
        <p>تاريخ الحجز: {appointment.date}</p>
        <p>الوقت: {appointment.hour}</p>
        <p>الدكتور: {appointment.dentist.name}</p>
      </div>
    </section>
  );
};

export default AppointmentDetails;
