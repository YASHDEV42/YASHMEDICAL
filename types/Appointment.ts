import { PatientType } from "./User";

enum Status {
  "مجدولة",
  "مؤكدة",
  "مكتملة",
  "ملغاة",
  "معاد جدولتها",
  "لم يحضر",
  "قيد التنفيذ",
}
export type AppointmentType = {
  _id: string;
  dentist: PatientType;
  patient: PatientType;
  date: string;
  hour: string;
  status: Status;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
};
