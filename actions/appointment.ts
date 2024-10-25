"use server";
import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
import User from "@/models/User";
import { PatientType } from "@/types/User";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface FormData {
  doctor: PatientType;
  patient: PatientType;
  date: Date; // ISO string for date
  hour: string; // Time as a string
}

function generateRandomPassword(length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}
const formatDate = (isoDate: Date) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const bookAppointment = async (prevState: unknown, formData: FormData) => {
  console.log(formData);

  try {
    await connectDB();
    const doctor = await User.findOne({ email: formData.doctor.email });
    console.log("server side doctor", doctor);

    const existingPatient = await User.findOne(formData.patient);
    if (!doctor) {
      return { error: "Doctor not found" };
    }
    let newPatient;
    const password = generateRandomPassword();
    if (!existingPatient) {
      const patient = {
        ssn: formData.patient.ssn,
        name: formData.patient.name,
        email: formData.patient.email,
        phoneNumber: formData.patient.phoneNumber,
        role: "patient",
        password,
        dateOfBirth: formData.patient.dateOfBirth,
      } as PatientType;
      newPatient = await User.create(patient);
    }
    const formattedDate = formatDate(formData.date);
    const appointment = {
      dentist: doctor._id,
      patient: newPatient?._id || existingPatient._id,
      date: formattedDate,
      hour: formData.hour,
    };
    await Appointment.create(appointment);
    redirect("/patient");
  } catch (error) {
    console.log(error);
  }
};
export { bookAppointment };
