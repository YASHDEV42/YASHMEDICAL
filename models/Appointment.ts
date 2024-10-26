import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dentist: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: String, required: true },
    hour: { type: String, required: true },
    status: {
      type: String,
      enum: ["مجدول", "مؤكد", "مكتمل", "ملغي", "لم يحضر"],
      required: true,
      default: "مجدول",
    },
    isNew: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
