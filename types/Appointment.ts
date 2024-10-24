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
  dentist: string;
  patient: string;
  date: string;
  hour: string;
  status: Status;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
};
